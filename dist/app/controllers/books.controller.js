"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = __importDefault(require("../models/book.model"));
exports.booksRoutes = express_1.default.Router();
// book create
exports.booksRoutes.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const book = yield book_model_1.default.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Failed to Create books", error });
    }
}));
// books get
exports.booksRoutes.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query.filter ? { genre: req.query.filter } : {};
        const sortBy = req.query.sortBy || "createdAt";
        const sort = req.query.sort === "asc" ? 1 : -1;
        const limit = parseInt(req.query.limit) || 10;
        const books = yield book_model_1.default.find(filter)
            .sort({ [sortBy]: sort })
            .limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Failed to retrieve books", error });
    }
}));
// books get by id
exports.booksRoutes.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const books = yield book_model_1.default.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Failed to retrieve book", error });
    }
}));
// update book
exports.booksRoutes.patch("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const books = yield book_model_1.default.findByIdAndUpdate(bookId, req.body, { new: true });
        res.status(200).json({
            success: true,
            message: "Books updated successfully",
            data: books,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Failed to update book", error });
    }
}));
// delete book
exports.booksRoutes.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const books = yield book_model_1.default.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Books deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Failed to deleted book", error });
    }
}));
