"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = require("../models/todo");
const TODOS = [];
exports.createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: 'Created the todo', createdTodo: newTodo });
};
exports.displayTodos = (req, res, next) => {
    res.status(200).json(TODOS);
};
exports.updateTodo = (req, res, next) => {
    const text = req.body.text;
    const id = req.params.id;
    const todoIndex = TODOS.findIndex((item) => item.id === id);
    TODOS[todoIndex] = { id: id, text: text };
    res.status(200).json({ message: "Updated todo", id: id });
};
exports.deleteTodo = (req, res, next) => {
    const id = req.params.id;
    const todoIndex = TODOS.findIndex((item) => item.id === id);
    TODOS.splice(todoIndex, 1);
    res.status(200).json({ message: "deleted todo", id: id });
};
