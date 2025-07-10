import express, { Request, Response } from "express";
import Borrow from "../models/borrow.model";
import Book from "../models/book.model";

export const borrowRoutes = express.Router();

// borrow book create
borrowRoutes.post(
  "/borrow",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { book, quantity, dueDate } = req.body;
      const foundBook = await Book.findById(book);

      if (!foundBook) {
        res.status(404).json({ success: false, message: "Book not found" });
        return;
      }

      if (foundBook.copies < quantity) {
        res
          .status(400)
          .json({ success: false, message: "Insufficient copies available" });
        return;
      }

      foundBook.copies -= quantity;
      foundBook.updateAvailability();
      await foundBook.save();

      const borrowRecord = await Borrow.create({ book, quantity, dueDate });
      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrowRecord,
      });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "Borrowing failed", error });
    }
  }
);

// Borrowed Books Summary (Using Aggregation)
borrowRoutes.get("/borrow", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch summary", error });
  }
});
