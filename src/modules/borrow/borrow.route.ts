import { Router } from 'express';
import {  borrowBook, getBorrowSummary } from './borrow.controller';

const router = Router();

router.post('/:bookId', borrowBook);   
router.get('/summary/all', getBorrowSummary); 

export default router;


