import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let server: Server;
const PORT = 5000;
async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DBNAME}:${process.env.DBPASS}@cluster0.xzzvi9v.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("mongodb connected sucessfully");
    server = app.listen(PORT, () => {
      console.log(`App is listining on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
