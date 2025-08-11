import { useState, useEffect } from "react";
import "./App.css";
import { Todo } from "./components/TodoItem";
import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList";
import { loadTodos, saveTodos } from "./utils/localStorage";
import { ThemeProvider } from "./components/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  
  // Обновленная функция фильтрации
  const getFilteredTodos = () => {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return todos.filter(todo => {
      // Фильтр по статусу (старая логика)
      const statusMatch = 
        filter === 'all' || 
        (filter === 'completed' && todo.completed) || 
        (filter === 'active' && !todo.completed);
      
      // Новая логика фильтрации по дате
      const dateMatch = 
        dateFilter === 'all' ||
        (dateFilter === 'today' && todo.createdAt >= startOfDay) ||
        (dateFilter === 'week' && todo.createdAt >= startOfWeek) ||
        (dateFilter === 'month' && todo.createdAt >= startOfMonth);
      
      return statusMatch && dateMatch;
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
        onDateFilterChange={setDateFilter}
        />
        <TodoList
          todos={getFilteredTodos()} 
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
