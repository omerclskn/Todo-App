const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { json } = require("body-parser");
const { nanoid } = require("nanoid");
const serverless = require("serverless-http");

dotenv.config({ path: "./config.env" });

const app = express();

const router = express.Router();

app.use(cors());
app.use(json());

let todos = [
  {
    id: nanoid(),
    title: "todo 1",
    completed: true,
    editing: false,
  },
  {
    id: nanoid(),
    title: "todo 2",
    completed: false,
    editing: false,
  },
  {
    id: nanoid(),
    title: "todo 3",
    completed: false,
    editing: false,
  },
  {
    id: nanoid(),
    title: "todo 4",
    completed: false,
    editing: false,
  },
  {
    id: nanoid(),
    title: "todo 5",
    completed: false,
    editing: false,
  },
];

router.get("/todos", (req, res) => res.send(todos));

router.post("/todos", (req, res) => {
  const todo = {
    title: req.body.title,
    id: nanoid(),
    completed: false,
    editing: false,
  };
  todos.push(todo);
  return res.send(todo);
});

router.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  const completed = Boolean(req.body.completed);
  if (index > -1) {
    todos[index].completed = completed;
  }
  return res.send(todos[index]);
});

router.patch("/todos/updateTodo/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  const title = req.body.title;
  if (index > -1) {
    todos[index].title = title;
  }
  return res.send(todos[index]);
});

router.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    todos.splice(index, 1);
  }
  res.send(todos);
});

router.get("/todos/removeCompleted", (req, res) => {
  todos = todos.filter(({ completed }) => !completed);
  res.send(todos);
});

router.get("/todos/toggleAll", (req, res) => {
  todos = todos.map((item) => ({ ...item, completed: true }));
  res.send(todos);
});

router.get("/todos/untoggleAll", (req, res) => {
  todos = todos.map((item) => ({ ...item, completed: false }));
  res.send(todos);
});

app.use("/.netlify/functions/server", router);

module.exports.handler = serverless(app);