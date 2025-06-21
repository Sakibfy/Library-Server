import { Schema, model } from 'mongoose';
import Book from '../book/book.model';


const borrowSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book', required: true},
  quantity: { type: Number, required: true, min: 1 },
  dueDate: { type: Date, required: true },
}, { timestamps: true });

// 🧠 Static method to reduce copies
borrowSchema.statics.borrowBook = async function (bookId, quantity) {
  const book = await Book.findById(bookId);
  if (!book || book.copies < quantity) {
    throw new Error('Not enough copies available');
  }
  book.copies -= quantity;
  book.available = book.copies > 0;
  await book.save();
};

 const Borrow = model('Borrow', borrowSchema);
export default Borrow;
