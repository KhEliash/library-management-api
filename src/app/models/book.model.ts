import mongoose, { Model, model } from "mongoose";
import { IBook, IBookMethods } from "../interfaces/book.interface";
const { Schema } = mongoose;

const bookSchema = new Schema<IBook, Model<IBook, {}, IBookMethods>>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

// instance
bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
};

const Book = model<IBook, Model<IBook, {}, IBookMethods>>("Book", bookSchema);
export default Book;
