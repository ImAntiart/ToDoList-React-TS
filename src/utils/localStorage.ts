import { Todo } from "../components/TodoItem";
const TODOS_KEY = 'todos-app';

type StoredTodo = Omit<Todo, 'createdAt'> & {
  createdAt: string; // Сериализованная дата
};

/* 
TODOS_KEY - уникальный ключ для хранения данных

StoredTodo - специальный тип для хранения:
Omit<Todo, 'createdAt'> - берёт все поля из Todo, кроме createdAt
Добавляет createdAt как строку (дата сериализуется в ISO-формате)
 */
// Сохраняем задачи
export const saveTodos = (todos: Todo[]): void => {
  const data: StoredTodo[] = todos.map(todo => ({
    ...todo,
    createdAt: todo.createdAt.toISOString() // Преобразуем Date в строку
  }));
  localStorage.setItem(TODOS_KEY, JSON.stringify(data));
};

/* 
Шаги выполнения:
Принимает массив задач (Todo[])
void — это защита от случайных возвратов значений + явное указание на "функцию-действие".
Преобразует каждую задачу:
Копирует все свойства (...todo)
Заменяет Date на строку (toISOString())

Сохраняет в localStorage:
JSON.stringify - преобразует объект в строку
setItem - записывает данные по ключу TODOS_KEY
 */

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

/* 
Шаги выполнения:
Пытается получить данные по ключу TODOS_KEY
Если данных нет - возвращает пустой массив

Если данные есть:
JSON.parse - преобразует строку в объект

Преобразует каждую задачу:
Копирует все свойства
Восстанавливает Date из строки
При ошибках (битые данные) - возвращает пустой массив

Защитные механизмы:
Проверка if (!data)
Блок try/catch
Автовосстановление даты
 */