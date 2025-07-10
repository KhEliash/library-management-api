import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/books.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";

const app: Application = express();

app.use(express.json());

// books routes
app.use("/api", booksRoutes);
// borrow routes
app.use("/api", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the app");
});

export default app;
