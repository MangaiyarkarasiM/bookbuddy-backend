var express = require('express');
var router = express.Router();
const books = require('../controller/books.controller');
const { authVerify } = require("../auth");

//To get the all books
router.get('/', authVerify, books.findAll);

//To get the book with book Id
router.get('/:id', authVerify,  books.findById);

//To create a new book 
router.post('/add', books.create);

//To edit the book with id
router.put('/:id', authVerify, books.updateBookWithId);

//To delete the book with id
router.delete('/:id', authVerify, books.deleteBookWithId);

module.exports = router;

