if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
let MongoClient = require('mongodb').MongoClient;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'))
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then(console.log("Connected to Database"))
    .catch(error => console.error(error));

app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

app.listen(process.env.PORT || 3001, function() {
    console.log(`app listening on port ${process.env.PORT || 3001}`);
});