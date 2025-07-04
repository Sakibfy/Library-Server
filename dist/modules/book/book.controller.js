"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getSingleBook = exports.getAllBooks = exports.createBook = void 0;
const sendResponse_1 = __importDefault(require("./../../utils/sendResponse"));
const book_model_1 = __importDefault(require("./book.model"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.default.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create book',
            error: err,
        });
    }
});
exports.createBook = createBook;
// ✅ 2. Get All Books with filtering, sorting, limiting
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
        const sortOrder = sort === 'asc' ? 1 : -1;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const books = yield book_model_1.default.find(query)
            .sort({ [sortBy]: sortOrder })
            .limit(Number(limit));
        (0, sendResponse_1.default)(res, {
            success: true,
            message: 'Books retrieved successfully',
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get books',
            error,
        });
    }
});
exports.getAllBooks = getAllBooks;
// ✅ 3. Get Single Book by ID
// book.controller.ts
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params; // ✅ Make sure it's bookId
    const book = yield book_model_1.default.findById(bookId);
    if (!book) {
        res.status(404).json({
            success: false,
            message: 'Book not found',
        });
    }
    res.status(200).json({
        success: true,
        message: 'Book retrieved successfully',
        data: book,
    });
});
exports.getSingleBook = getSingleBook;
// ✅ 4. Update Book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const updated = yield book_model_1.default.findByIdAndUpdate(bookId, req.body, {
        new: true,
        runValidators: true,
    });
    if (!updated) {
        res.status(404).json({
            success: false,
            message: 'Book not found to update',
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Book updated successfully',
        data: updated,
    });
});
exports.updateBook = updateBook;
// ✅ 5. Delete Book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const deleted = yield book_model_1.default.findByIdAndDelete(bookId);
    if (!deleted) {
        res.status(404).json({
            success: false,
            message: 'Book not found to delete',
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Book deleted successfully',
        data: null,
    });
});
exports.deleteBook = deleteBook;
