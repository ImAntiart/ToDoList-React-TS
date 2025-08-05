import { useState } from 'react'

interface AddTodoProps {
  onAddTodo: (text: string) => void
}

function AddTodo({ onAddTodo }: AddTodoProps) {
  const [inputValue, setInputValue] = useState('')

  const handleAddTodo = () => {
    const trimmed = inputValue.trim()
    if (trimmed) {
      onAddTodo(trimmed)
      setInputValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  return (
    <div className="input-area">
      <input
        type="text"
        placeholder="Новая задача..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAddTodo}>Добавить</button>
    </div>
  )
}

export default AddTodo