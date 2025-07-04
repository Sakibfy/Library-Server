"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    author: String,
    genre: String,
    isbn: String,
    description: String,
    copies: { type: Number, required: true },
    available: { type: Boolean, default: true },
});
const Book = mongoose_1.default.model('Book', bookSchema);
exports.default = Book;
