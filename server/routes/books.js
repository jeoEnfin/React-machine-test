const express = require('express');

const {
    getBooks,
    createBook,
    deleteBook,
    updateBook,
    getBook
} = require('../controllers/bookController');

const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/').post(getBooks);
router.route('/add').post(createBook);
router.route('/:id').delete(deleteBook).patch(updateBook);
router.route('/:id').get(getBook);

module.exports = router;