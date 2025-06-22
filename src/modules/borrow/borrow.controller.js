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
exports.getBorrowSummary = exports.borrowBook = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const book_model_1 = __importDefault(require("../book/book.model"));
const borrow_model_1 = __importDefault(require("./borrow.model"));
// ✅ 1. Borrow a Book Controller
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        const existingBook = yield book_model_1.default.findById(book);
        if (!existingBook || existingBook.copies < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Not enough copies available',
            });
        }
        existingBook.copies -= quantity;
        if (existingBook.copies === 0) {
            existingBook.available = false;
        }
        yield existingBook.save();
        const borrowed = yield borrow_model_1.default.create({
            book,
            quantity,
            dueDate,
        });
        (0, sendResponse_1.default)(res, {
            success: true,
            message: 'Book borrowed successfully',
            data: borrowed,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong while borrowing the book',
            error,
        });
    }
});
exports.borrowBook = borrowBook;
// ✅ 2. Get Borrow Summary (Aggregation)
const getBorrowSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.default.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' },
                },
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'book',
                },
            },
            {
                $unwind: '$book',
            },
            {
                $project: {
                    book: {
                        title: '$book.title',
                        isbn: '$book.isbn',
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        (0, sendResponse_1.default)(res, {
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get borrow summary',
            error,
        });
    }
});
exports.getBorrowSummary = getBorrowSummary;
