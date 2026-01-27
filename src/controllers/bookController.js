const bookService = require('../services/bookService');
const { success } = require('../utils/responseHandler');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks();
    success(res, books, 'Books fetched successfully');
  } catch (err) {
    next(err);
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    if (book) {
      success(res, book, 'Book fetched successfully');
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Create a book
// @route   POST /api/books
// @access  Private
const createBook = async (req, res, next) => {
  try {
    const book = await bookService.createBook(req.body);
    success(res, book, 'Book created successfully', 201);
  } catch (err) {
    next(err);
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private
const updateBook = async (req, res, next) => {
  try {
    const updatedBook = await bookService.updateBook(req.params.id, req.body);

    if (updatedBook) {
      success(res, updatedBook, 'Book updated successfully');
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = async (req, res, next) => {
  try {
    const result = await bookService.deleteBook(req.params.id);

    if (result) {
      success(res, null, 'Book removed successfully');
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
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
