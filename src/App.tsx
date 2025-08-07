import { useState, useEffect } from "react";
import "./App.css";
import { Todo } from "./components/TodoItem";
import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList";
import { loadTodos, saveTodos } from "./utils/localStorage";

function App() {
  // Загружаем задачи из localStorage при инициализации

  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());

  // Сохраняем задачи при каждом изменении
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  /* 
  { 
    id: 1, 
    text: "Помыть посуду", 
    completed: false, 
    createdAt: new Date() 
  }
 */

  /*   
useState<Todo[]>
Типизирует состояние как массив объектов, соответствующих интерфейсу Todo (из TodoItem.tsx).
Начальное значение — массив с одной задачей (демо-данные).
 */

  const handleAddTodo = (text: string) => {
    if (!text.trim()) return; // Игнорируем пустые задачи

    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos(prev => [...prev, newTodo]);
  };

  /* 
Параметр text: string
Гарантирует, что в функцию передадут только строку (защита от null/undefined/числа).

id: Date.now()
Генерирует уникальный ID (в миллисекундах с 1970 года).

Спреад-оператор (...todos)
Создает новый массив, добавляя newTodo в конец (иммутабельное обновление).
 */

  const handleSaveTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <header className="header">
        <h1>Список задач</h1>
      </header>
      <main className="main">
        <aside className="wood-column left"></aside>
        <aside className="wood-column right"></aside>

        <AddTodo onAdd={handleAddTodo} />
        <TodoList
          todos={todos}
          onSave={handleSaveTodo}
          onDelete={handleDeleteTodo}
        />
      </main>

      <footer className="footer">
        <p>Разработчик Antiart, aka Ромашев Алексей Дмитриевич</p>
      </footer>
    </>
  );
}

export default App;
