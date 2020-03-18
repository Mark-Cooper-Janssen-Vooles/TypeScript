import React from 'react';
import './TodoList.css';

interface TodoListProps {
  items: {id: string, text: string}[];
  deleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul>
      {props.items.map((todo) => {
        return (
          <li key={todo.id}>{todo.text}
            <button onClick={props.deleteTodo.bind(null, todo.id)}>Delete</button>
          </li>
        )
        })}
    </ul>
  );
}

export default TodoList;