"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 5000;
// import db from "../models"
const route_1 = __importDefault(require("../routes/route"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
app.use(body_parser_1.default.json({ limit: "1000mb" }));
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "1000mb" }));
app.use((0, cors_1.default)());
// const routers = express.Router();
// routers.use("/api", routes);
app.use("/api", route_1.default);
// app.post('/api/book',async (req, res) => {
//   await BookController.createBook(req.body)
//   res.send('Hello World! 123');
// });
// app.get('/api/book',async (req, res) => {
//  let response= await BookController.getBook()
//   return res.send(response);
// });
// app.get('/api/book/:id',async (req, res) => {
//   let response=await BookController.getAuthorById(req.params.id)
//   return res.send(response);
// });
// app.post('/api/author',async (req, res) => {
//   await AuthorController.createAuthor(req.body)
//   res.send('Hello World! 123');
// });
// app.get('/api/author',async (req, res) => {
//   let response=await AuthorController.getAuthor()
//   return res.send(response);
// });
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map