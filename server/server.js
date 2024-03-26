require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const errorHandler = require('./middleware/errorHandler');
const app = express();

app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

app.use('/api/books', require('./routes/books'));
app.use('/', require('./routes/user'));
app.use(errorHandler);


mongoose.connect(process.env.MONG_URL)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('connected  to db & running on port ' ,process.env.PORT);
    });
})
.catch((err) => {
    console.log(err);
    
});