// index.js
import express  from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import morgan from "morgan";
import blogRouter from "./src/routes/blogRoutes.js";
import authRouter from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/userRoutes.js";

const app = express();
dotenv.config();


// middleware
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/', userRouter); 
app.use('/', authRouter); 
app.use('/', blogRouter);





const port = process.env.PORT || 3000;
const dbURL = process.env.MONGODB_CONNECTION_URL;
console.log(dbURL);

// connect db
const connect = (url)=>{
    mongoose.connect(url)
    .then(() => console.log("DB Connected suceesfully!"))
    .catch((err)=>{
      console.log("Error connecting to DB", err.message);
    })
}
connect(dbURL)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});