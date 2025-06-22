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
const mongoose_1 = require("mongoose");
const book_model_1 = __importDefault(require("../book/book.model"));
// 📚 Borrow Schema
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    dueDate: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
// 🧠 Static method to reduce book copies
borrowSchema.statics.borrowBook = function (bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.default.findById(bookId);
        if (!book || book.copies < quantity) {
            throw new Error('Not enough copies available');
        }
        book.copies -= quantity;
        book.available = book.copies > 0;
        yield book.save();
    });
};
// 📦 Create and export model
const Borrow = (0, mongoose_1.model)('Borrow', borrowSchema);
exports.default = Borrow;
