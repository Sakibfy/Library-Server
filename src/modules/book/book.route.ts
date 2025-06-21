import { Router } from 'express';
import { createBook, deleteBook, getAllBooks, getSingleBook, updateBook } from './book.controller';




const router = Router();

router.post('/books', createBook);
router.get('/books', getAllBooks);
router.get('/books/:id', getSingleBook);      
router.put('/books/:id', updateBook);          
router.delete('/books/:id', deleteBook);       


export default router;


