import { Schema, model, Types, Model } from 'mongoose';
import Book from '../book/book.model';

// 📘 Interface for Borrow Document
interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

// 🔧 Interface for Static Method
interface IBorrowModel extends Model<IBorrow> {
  borrowBook(bookId: string, quantity: number): Promise<void>;
}

// 📚 Borrow Schema
const borrowSchema = new Schema<IBorrow>({
  book: {
    type: Schema.Types.ObjectId,
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
borrowSchema.statics.borrowBook = async function (
  bookId: string,
  quantity: number
): Promise<void> {
  const book = await Book.findById(bookId);
  if (!book || book.copies < quantity) {
    throw new Error('Not enough copies available');
  }
  book.copies -= quantity;
  book.available = book.copies > 0;
  await book.save();
};

// 📦 Create and export model
const Borrow = model<IBorrow, IBorrowModel>('Borrow', borrowSchema);
export default Borrow;

