import { Todo, TodoItem } from './TodoItem';

type TodoListProps = {
  todos: Todo[];
  onSave: (id: number, text: string) => void;
  onDelete: (id: number) => void;
}


/* export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <div className='board'>
      {todos.map((todo) => (
        <div key={todo.id} className='todo-item'>
          <h2>{todo.text}</h2>
          <div>Выполнено:{todo.completed ? 'Да' : 'Нет'}</div>
          <div>Дата: {formatDate(todo.createdAt)}</div>
        </div>
    ))}
    </div>
  );
}; */

export const TodoList = ({ todos, onSave, onDelete }: TodoListProps) => {
  return (
    <div className="board">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onSave={onSave}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};