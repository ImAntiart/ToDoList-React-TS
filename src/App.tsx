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
    </ThemeProvider>
  );
}

export default App;
