// src/utils/localStorage.ts

import { Todo } from "../components/TodoItem";

// Ключ для localStorage
const TODOS_KEY = 'todos-app';

// Тип для сохраненных задач (без методов Date)
type StoredTodo = Omit<Todo, 'createdAt'> & {
  createdAt: string; // Сериализованная дата
};

// Сохраняем задачи
export const saveTodos = (todos: Todo[]): void => {
  const data: StoredTodo[] = todos.map(todo => ({
    ...todo,
    createdAt: todo.createdAt.toISOString() // Преобразуем Date в строку
  }));
  localStorage.setItem(TODOS_KEY, JSON.stringify(data));
};

// Загружаем задачи
export const loadTodos = (): Todo[] => {
  const data = localStorage.getItem(TODOS_KEY);
  if (!data) return [];

  try {
    const parsed: StoredTodo[] = JSON.parse(data);
    return parsed.map(todo => ({
      ...todo,
      createdAt: new Date(todo.createdAt) // Восстанавливаем Date
    }));
  } catch {
    return []; // Если данные битые
  }
};