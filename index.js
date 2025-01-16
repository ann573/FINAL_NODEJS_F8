import express from "express";
import connectDB from "./src/config/db.js";
import routes from "./src/routes/index.js";
import  dotenv  from 'dotenv';

dotenv.config()

const {PORT} = process.env

const app = express();

app.use(express.json());


connectDB();

app.use("/", routes);

app.listen(PORT, () => {
  console.log("Server is running on port 8888");
});
