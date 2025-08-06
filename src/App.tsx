import { useState } from 'react'
import "./App.css";
import { Todo } from './components/TodoItem';
import { AddTodo } from './components/AddTodo';


function App() {

  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date(),
    };

    setTodos([...todos, newTodo]);
  }



  return (
    <>
      <header className="header">
        <h1>Список задач</h1>
      </header>
      <main className="main">
        <aside className="wood-column left"></aside>
        <aside className="wood-column right"></aside>

        <AddTodo onAdd={handleAddTodo} />

        <div className="board">
          {/* Здесь будут задачи */}
        </div>
      </main>

      <footer className="footer">
        <p>Разработчик Antiart, aka Ромашев Алексей Дмитриевич</p>
      </footer>
    </>
  );
}

export default App;


/* {id: 1, text: "Помыть посуду", completed: false, createdAt: new Date()} */