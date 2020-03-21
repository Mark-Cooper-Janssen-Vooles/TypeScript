import { RequestHandler } from 'express';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as {text: string}).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({message: 'Created the todo', createdTodo: newTodo});
};

export const displayTodos: RequestHandler = (req, res, next) => {
  res.status(200).json(TODOS);
}

export const updateTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as {text: string}).text;
  const id = req.params.id;

  const todoIndex = TODOS.findIndex((item) => item.id === id);
  TODOS[todoIndex] = {id: id, text: text};
  res.status(200).json({message: "Updated todo", id: id});
}

export const deleteTodo: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  const todoIndex = TODOS.findIndex((item) => item.id === id);

  TODOS.splice(todoIndex, 1);

  res.status(200).json({message: "deleted todo", id: id});
}