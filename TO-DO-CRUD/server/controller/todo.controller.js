const db = require("./../db");

async function getTodoList() {
  try {
    let readtodo = await db.query(`SELECT * FROM test2.todolist;`);
    console.log(readtodo);
    return readtodo[0];
  } catch (error) {
    console.log(error);
    throw error;
    // new Error("something wrong in create todo")
  }
}

async function createtodo(data) {
  try {
    console.log("Adding todo:", data);
    let taskname = data.taskname;
    let todoadd = await db.query(
      `INSERT INTO test2.todolist(taskname) value("${taskname}")`,
    );
    console.log(todoadd);
    return todoadd;
  } catch (error) {
    console.log(error);
    throw error;
    // new Error("something wrong in create todo")
  }
}

async function updateStatus(id, body) {
  try {
    let status = body?.status;
    if (!status) {
      throw new Error("status is required");
    }
    let up = await db.query(
      `update test2.todolist set status = "${status}" where id = ${id}`,
    );
    return up;
  } catch (err) {
    throw err;
  }
}

async function deletetodo(id) {
  try {
    let deletetodo = await db.query(
      `delete from test2.todolist where id = ${id}`,
    );
    return deletetodo;
  } catch (error) {
    throw error;
  }
}

async function truncate() {
  try {
    let truncate = await db.query(`TRUNCATE test2.todolist;`);
    return truncate;
  } catch (error) {
    console.log(error);
  }
}

async function todoEdit(body) {
  console.log(body);

  try {
    let edittodo = await db.query(
      `update test2.todolist set status ='${body.status}' where id = ${body.id}`,
    );
    return todoEdit;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createtodo: createtodo,
  getTodoList: getTodoList,
  updateStatus: updateStatus,
  deletetodo: deletetodo,
  truncate: truncate,
  todoEdit: todoEdit,
};
