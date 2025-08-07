import { useState } from 'react'
import { EditTodo } from "./EditTodo";

export interface Todo {
  id: number;          
  text: string;
  completed: boolean;
  createdAt: Date;     
}

type TodoItemProps = {
  todo: Todo;
  onSave: (id: number, newText: string) => void;
  onDelete: (id: number) => void;
};



export const TodoItem = ({todo, onSave, onDelete }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (date: Date) => {
  return date.toLocaleString('ru-RU', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
};

  if (isEditing) { 
    return (
      <EditTodo
        todo={todo}
        onSave={(id, newText) => {
          onSave(id, newText);
          setIsEditing(false);
      }}
      onCancel={() => setIsEditing(false)}
      />
    );
}

 return (
    <div className="todo-item">
      <h2>{todo.text}</h2>
      <div>Выполнено:{todo.completed ? 'Да' : 'Нет'}</div>
      <div>Дата: {formatDate(todo.createdAt)}</div>
      <div className="todo-actions">
        <button 
          onClick={() => setIsEditing(true)}
          className="edit-button"
          aria-label="Edit"
        >
          ✏️ Редактировать
        </button>
        <button 
          onClick={() => onDelete(todo.id)}
          className="delete-button"
          aria-label="Delete"
        >
          🗑️ Удалить
        </button>
      </div>
    </div>
  );
};