import { useState } from "react";

type AddTodoProps = {
  onAdd: (text: string) => void; 
  onFilterChange: (filter: 'all' | 'completed' | 'active') => void;
};

export const AddTodo = ({ onAdd, onFilterChange }: AddTodoProps) => {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!inputText.trim()) {
      setError("Поле не может быть пустым");
      return;
    }
    onAdd(inputText);
    setInputText("");
    setError("");
  };

  return (
    <div className="input-area">
      <input
        type="text"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          setError('');
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Новая задача..."
        className={error ? 'error-border' : ''}
      />
       {error && <div className="error-text">{error}</div>}
      <button onClick={handleSubmit}>Добавить</button>

       <div className="filter-controls">
        <label>Фильтр:</label>
        <select
          onChange={(e) => 
            onFilterChange(e.target.value as 'all' | 'completed' | 'active')
          }
          aria-label="Фильтр задач"
        >
          <option value="all">Все</option>
          <option value="completed">Выполненные</option>
          <option value="active">Не выполненные</option>
        </select>
      </div>
    </div>
  );
};
