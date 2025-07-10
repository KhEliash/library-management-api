import express, { Request, Response } from "express";
import Book from "../models/book.model";

export const booksRoutes = express.Router();
// book create
booksRoutes.post("/books", async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const book = await Book.create(body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to Create books", error });
  }
});
// books get
booksRoutes.get("/books", async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter ? { genre: req.query.filter } : {};
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sort = req.query.sort === "asc" ? 1 : -1;
    const limit = parseInt(req.query.limit as string) || 10;
    const books = await Book.find(filter)
      .sort({ [sortBy]: sort })
      .limit(limit);
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve books", error });
  }
});
// books get by id
booksRoutes.get("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const books = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: books,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve book", error });
  }
});
// update book
booksRoutes.patch("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const books = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
    res.status(200).json({
      success: true,
      message: "Books updated successfully",
      data: books,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update book", error });
  }
});
// delete book
booksRoutes.delete("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const books = await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Books deleted successfully",
      data: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to deleted book", error });
  }
});
