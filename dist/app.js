"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// books routes
app.use("/api", books_controller_1.booksRoutes);
// borrow routes
app.use("/api", borrow_controller_1.borrowRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to the app");
});
exports.default = app;
