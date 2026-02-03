// require("dotenv").config();
const express = require("express");
const app = express();
const port = 8000;
const todoRoute = require("./routes/todo.route");
const cores = require("cors");

app.use(express.json());
app.use(cores());

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.use(todoRoute)

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
