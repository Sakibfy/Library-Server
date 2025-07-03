import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import Book from '../book/book.model';
import Borrow from './borrow.model';

// ✅ POST /api/borrow/:bookId
export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const { quantity, dueDate } = req.body;

    const existingBook = await Book.findById(bookId);
    if (!existingBook) {
       res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    const borrowed = await Borrow.create({ book: bookId, quantity, dueDate });

    sendResponse(res, {
      success: true,
      message: 'Book borrowed successfully',
      data: borrowed,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

// ✅ GET /api/borrow/summary/all
export const getBorrowSummary = async (_req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
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

    sendResponse(res, {
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get borrow summary',
      error,
    });
  }
};
