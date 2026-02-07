const bookService = require('../services/bookService');
const { success } = require('../utils/responseHandler');

const getBooks = async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks();
    success(res, books, 'Books fetched successfully');
  } catch (err) {
    next(err);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    success(res, book, 'Book fetched successfully');
  } catch (err) {
    next(err);
  }
};

const createBook = async (req, res, next) => {
  try {
    const book = await bookService.createBook(req.body);
    success(res, book, 'Book created successfully', 201);
  } catch (err) {
    next(err);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const updatedBook = await bookService.updateBook(req.params.id, req.body);
    success(res, updatedBook, 'Book updated successfully');
  } catch (err) {
    next(err);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    await bookService.deleteBook(req.params.id);
    success(res, null, 'Book removed successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
