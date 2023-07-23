const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./router/adminRouter");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(userRouter);

mongoose
  .connect("mongodb+srv://prashant:prashant@cluster0.i4s5nnp.mongodb.net/CRUD")
  .then((result) => {
    console.log("connnected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app.listen(3000);
