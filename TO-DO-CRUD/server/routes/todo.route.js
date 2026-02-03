const express = require("express");
const todolist = require("./../controller/todo.controller");

const router = express.Router();

// post api
router.post("/todo-add", async (req, res) => {
  try {
    let data = await todolist.createtodo(req.body);
    res.status(200).send({ data: data, status: "success", msg: 200 });
  } catch (err) {
    res.status(500).send({
      status: 500,
      msg: err.message,
    });
  }
});

// get api
router.get("/todo-list", async (req, res) => {
  try {
    let data = await todolist.getTodoList();
    res.send({
      data: data,
      status: "success",
      msg: 200,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      msg: error.message,
    });
  }
});
// patch api
router.patch("/update-status/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let data = await todolist.updateStatus(id, body);
    console.log("data", data);
    res.status(200).send({
      status: 200,
      message: "Update successfull",
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      msg: err.message,
    });
  }
});

// delete api
router.delete("/delete-todo/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = await todolist.deletetodo(id);
    console.log("data", data);
    res.status(200).send({
      status: 200,
      message: "Successfull",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "unsuccessfull",
    });
  }
});

//TRUNCATE TABLE
router.delete("/todo-truncate", async (req, res) => {
  try {
    let data = await todolist.truncate();
    res.status(200).send({
      data: data,
      status: "succes",
      msg: 200,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      msg: error.message,
    });
  }
});
//EDIT TO DO
router.put("/todo-edit", async (req, res) => {
  try {
    let body = req.body;
    let data = await todolist.todoEdit(body);

    res.status(200).send({
      data: data,
      status: "succes",
      msg: 200,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      msg: error.message,
    });
  }
});

module.exports = router;
