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
// ✅ POST /api/borrow/:bookId
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const { quantity, dueDate } = req.body;
        const existingBook = yield book_model_1.default.findById(bookId);
        if (!existingBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }
        const borrowed = yield borrow_model_1.default.create({ book: bookId, quantity, dueDate });
        (0, sendResponse_1.default)(res, {
            success: true,
            message: 'Book borrowed successfully',
            data: borrowed,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
exports.borrowBook = borrowBook;
// ✅ GET /api/borrow/summary/all
const getBorrowSummary = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.default.aggregate([
            { $group: { _id: '$book', totalQuantity: { $sum: '$quantity' } } },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'book',
                },
            },
            { $unwind: '$book' },
            {
                $project: {
                    book: { title: '$book.title', isbn: '$book.isbn' },
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
