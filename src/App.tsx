import { useState, useEffect } from "react";
import "./App.css";
import { Todo } from "./components/TodoItem";
import { AddTodo } from "./components/AddTodo";
/* import { SortOrder } from "./components/AddTodo"; */
import { TodoList } from "./components/TodoList";
import { loadTodos, saveTodos } from "./utils/localStorage";
import { ThemeProvider } from "./components/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  
  // Обновленная функция фильтрации
  const getProcessedTodos = () => {
    // Фильтрация по статусу
    const filtered = todos.filter(todo => {
      return filter === 'all' || 
             (filter === 'completed' && todo.completed) || 
             (filter === 'active' && !todo.completed);
    });

    // Сортировка по дате
    return [...filtered].sort((a, b) => {
      return sortOrder === 'newest'
        ? b.createdAt.getTime() - a.createdAt.getTime()
        : a.createdAt.getTime() - b.createdAt.getTime();
    });
  };

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const handleAddTodo = (text: string) => {
    if (!text.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };


  const handleSaveTodo = (id: number, newText: string, completed: boolean) => {
  setTodos(
    todos.map(todo => 
      todo.id === id 
        ? { ...todo, text: newText, completed } 
        : todo
    )
  );
};

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <ThemeProvider>
      <ThemeToggle />
      <header className="header">
        <h1>Список задач</h1>
      </header>
      <main className="main">
        <aside className="wood-column left"></aside>
        <aside className="wood-column right"></aside>

      <AddTodo 
        onAdd={handleAddTodo}
        onFilterChange={setFilter}
        onSortChange={setSortOrder}
      />
      <TodoList
        todos={getProcessedTodos()}
        onSave={handleSaveTodo}
        onDelete={handleDeleteTodo}
      />
      </main>

      <footer className="footer">
        <p>Разработчик Antiart, aka Ромашев Алексей Дмитриевич</p>
      </footer>
    </ThemeProvider>
  );
}

export default App;
