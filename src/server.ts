import express from "express"
import cors from "cors"
import  config  from "./config";
import mongoose from "mongoose";
import router from "./modules/book/book.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router)

app.get("/", (req, res) =>{
  res.send({ success: true, message: "iam here"})
})


async function server() {
  try {

  // console.log(config);

    await mongoose.connect(config.DATABASE_URL!)
    console.log('Database connected');
  } catch (error) {
    console.error('xxxx');
  }
 }

 app.listen(config.PORT, () => {
  console.log(`server is runing 5000`);
 })



server();