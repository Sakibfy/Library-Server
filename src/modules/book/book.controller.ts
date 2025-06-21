import { Request, Response } from 'express';
import sendResponse from './../../utils/sendResponse';
import Book from './book.model';

export const createBook = async (req: Request, res: Response) => {
  const book = await Book.create(req.body);
  sendResponse(res, {
    success: true,
    message: 'Book created successfully',
    data: book,
  });
};



// ✅ 2. Get All Books with filtering, sorting, limiting
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;

    const sortOrder = sort === 'asc' ? 1 : -1;
    const query: any = {};

    if (filter) {
      query.genre = filter;
    }

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sortOrder })
      .limit(Number(limit));

    sendResponse(res, {
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get books',
      error,
    });
  }
};


// ✅ 3. Get Single Book by ID
export const getSingleBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found',
    });
  }

  sendResponse(res, {
    success: true,
    message: 'Book retrieved successfully',
    data: book,
  });
};

// ✅ 4. Update Book
export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await Book.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: 'Book not found to update',
    });
  }

  sendResponse(res, {
    success: true,
    message: 'Book updated successfully',
    data: updated,
  });
};

// ✅ 5. Delete Book
export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await Book.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: 'Book not found to delete',
    });
  }

  sendResponse(res, {
    success: true,
    message: 'Book deleted successfully',
    data: null,
  });
};
