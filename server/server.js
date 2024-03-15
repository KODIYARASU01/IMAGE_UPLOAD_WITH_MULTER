import express from "express";
import mongoose from "mongoose";
import ImageRoute from "./Routes/image.route.js";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from 'cors';
dotenv.config();

let app = express();

//Express middlewares:
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors())
let port = 3000;
let uri = process.env.MONGODB_URL;

//Home route:

app.use("/upload", ImageRoute);

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB Connected Sucessfully");
    //Server listening:
    app.listen(port, () => {
      console.log(`Server is listening http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
