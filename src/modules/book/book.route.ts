import { Router } from 'express';
import { createBook, deleteBook, getAllBooks, getSingleBook, updateBook } from './book.controller';





const router = Router();

router.post('/', createBook);
router.get('/:id', getSingleBook);      
router.put('/:id', updateBook);          
router.delete('/:id', deleteBook);       
router.get('/', getAllBooks);

export default router;


