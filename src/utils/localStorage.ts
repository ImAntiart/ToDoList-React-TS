import { Todo } from "../components/TodoItem";
const TODOS_KEY = 'todos-app';

type StoredTodo = Omit<Todo, 'createdAt'> & {
  createdAt: string; // Сериализованная дата
};

export const saveTodos = (todos: Todo[]): void => {
  const data: StoredTodo[] = todos.map(todo => ({
    ...todo,
    createdAt: todo.createdAt.toISOString() 
  }));
  localStorage.setItem(TODOS_KEY, JSON.stringify(data));
};

export const loadTodos = (): Todo[] => {
  const data = localStorage.getItem(TODOS_KEY);
  if (!data) return [];

  try {
    const parsed: StoredTodo[] = JSON.parse(data);
    return parsed.map(todo => ({
      ...todo,
      createdAt: new Date(todo.createdAt) 
    }));
  } catch {
    return []; 
  }
};

