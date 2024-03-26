const mongoose = require('mongoose');
const Book = require('../models/bookModel');

const getBooks = async (req, res) => {
    const data = req.body;
    console.log(data)
    try {
        const pageNumber = data.pageNumber;
        const limit = data.limit;
        const skip = (pageNumber - 1) * limit;
        let search = data.search;
        let query = {};

        query = {
            $and: [
                {
                    $or: [
                        { name: { $regex: search, $options: "i" } },
                        { description: { $regex: search, $options: "i" } },
                    ],
                },
                { user_id: req.user.id }
            ],
        };
        if (data.toDate !== "" && data.fromDate !== "") {
            console.log("from and date availabe", data.toDate, data.fromDate);
            let fromDate = new Date(data.fromDate);
            let toDate = new Date(data.toDate);
            query.publishDate = {
                $gte: fromDate,
                $lte: toDate,
            };
        }
      
         if (data.minPrice !== "" && data.maxPrice !== "") {
            query.price = {
                $gte: data.minPrice,
                $lte: data.maxPrice,
            };
        }
        const queryCount = await Book.countDocuments(query);
        const totalPages = Math.ceil(queryCount / limit);
        const result = await Book.find(query).skip(skip).limit(limit);

        res.status(200).json({ result: result, totalPage: totalPages });
    }
    catch (err) {
        console.log(err.message);
    }
}

const getBook = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(book);
};

const createBook = async (req, res) => {
    const { name, description, publishDate, image, price } = req.body;
    let emptyFields = [];
    if (!name) { emptyFields.push('name') }
    if (!description) { emptyFields.push('description') }
    if (!publishDate) { emptyFields.push('publishDate') }
    if (!image) { emptyFields.push('image') }
    if (!price) { emptyFields.push('price') }
    if (emptyFields.length > 0) {
        return res.status(400).json({ errors: 'Please fill in all fields', emptyFields })
    }
    try {
        const book = await Book.create({ name, description, publishDate, image, price, user_id: req.user.id });
        res.status(200).json(book);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteBook = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'id is not a valid' });
    }
    const book = await Book.findByIdAndDelete({ _id: id });
    if (!book) {
        return res.status(404).json({ error: 'No book found' });
    }
    res.status(200).json(book);
};

const updateBook = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'id is not a valid' });
    }
    const book = await Book.findOneAndUpdate({ _id: id }, { ...req.body });
    if (!book) {
        return res.status(404).json({ error: 'No book found' });
    }
    res.status(200).json(book);
};

module.exports = {
    getBooks,
    createBook,
    deleteBook,
    updateBook,
    getBook
}