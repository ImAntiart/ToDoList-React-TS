import { useState } from 'react'
import "./App.css";
/* import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList' */

function App() {

/*   const [todos, setTodos] = useState<string[]>([])

  const handleAddTodo = (text: string) => {
    setTodos([...todos, text])
  } */


  return (
    <>
      <header className="header">
        <h1>Список задач</h1>
      </header>
      <main className="main">
        <aside className="wood-column left"></aside>
        <aside className="wood-column right"></aside>

        <div className="input-area">
          <input type="text" placeholder="Новая задача..." />
          <button>Добавить</button>
        </div>

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
