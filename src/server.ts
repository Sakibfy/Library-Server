import express from "express"
import cors from "cors"
import  config  from "./config";
import mongoose from "mongoose";
import routers from "./routes/indeex";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routers)

app.get("/", (req, res) =>{
  res.send({ success: true, message: "iam here"})
})



async function server() {
  try {
    await mongoose.connect(config.DATABASE_URL!)
    console.log('Database connected');
  } catch (error) {
    console.error('error');
  }
 }

 app.listen(config.PORT, () => {
  console.log(`server is runing 5000`);
 })



server();