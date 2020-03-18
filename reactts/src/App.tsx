import React, { useState } from 'react';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { Todo } from './todo.model';

// React.FC forces us to use a 'function component' (i.e. one that returns JSX)
const App: React.FC = () => {
  // {id: 't1', text: 'Finish the course'}
  const [todos, setTodos] = useState<Todo[]>([]);

  const addToTodos = (todo: string) => {
    setTodos([
      ...todos,
      {
        id: Math.random().toString(),
        text: todo
      }
    ]);
  }

  const todoDeleteHandler = (todoId: string) => {
    const newTodos = todos.filter((todo) => todo.id !== todoId)
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <NewTodo addToTodos={addToTodos} />
      <TodoList items={todos} deleteTodo={todoDeleteHandler} />
    </div>
  );
}

export default App;
