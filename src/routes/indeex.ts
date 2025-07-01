import { Router } from "express";
import borrowRoute from "../modules/borrow/borrow.route";
import bookRoute from "../modules/book/book.route";




const routers = Router();

routers.use('/api/books', bookRoute);
routers.use('/api/borrow', borrowRoute);

export default routers;

