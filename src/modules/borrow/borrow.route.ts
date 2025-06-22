import { Router } from 'express';
import {  borrowBook, getBorrowSummary } from './borrow.controller';

const router = Router();

router.post('/', borrowBook);   
router.get('/', getBorrowSummary); 

export default router;


