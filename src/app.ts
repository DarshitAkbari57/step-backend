import express from 'express';
const app = express();
const port = 5000;
// import db from "../models"
import routes from "../routes/route";
import bodyParser from "body-parser";
import cors from "cors";

app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "1000mb" }));
app.use(cors())

// const routers = express.Router();

// routers.use("/api", routes);

app.use("/api", routes);

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