
import { Router } from 'express';
import { borrowBook, getBorrowSummary } from './borrow.controller';


const router = Router();

router.post('/borrow', borrowBook);
router.get('/borrow', getBorrowSummary);

export default router;

