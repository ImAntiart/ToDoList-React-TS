import { useState } from "react";

type AddTodoProps = {
  onAdd: (text: string) => void; 
  onFilterChange: (filter: 'all' | 'completed' | 'active') => void;
  onDateFilterChange: (dateFilter: 'all' | 'today' | 'week' | 'month') => void;
};

export const AddTodo = ({ 
  onAdd, 
  onFilterChange,
  onDateFilterChange,
}: AddTodoProps) => {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!inputText.trim()) {
      setError("Поле не может быть пустым");
      return;
    }
    if (inputText.length > 50) {
      setError("Максимум 50 символов");
      return;
    }
    onAdd(inputText);
    setInputText("");
    setError("");
  };

  return (
    <div className="input-area">
      <input
        maxLength={50} // Браузерное ограничение
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
        <div className="filter-group">
          <label>Статус:</label>
          <select
          title="выберите критерий сортировки"
            onChange={(e) => onFilterChange(e.target.value as 'all' | 'completed' | 'active')}
          >
            <option value="all">Все</option>
            <option value="completed">Выполненные</option>
            <option value="active">Не выполненные</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Дата:</label>
          <select
          title="выберите критерий сортировки"
            onChange={(e) => onDateFilterChange(e.target.value as 'all' | 'today' | 'week' | 'month')}
          >
            <option value="all">Все даты</option>
            <option value="today">Сегодня</option>
            <option value="week">Эта неделя</option>
            <option value="month">Этот месяц</option>
          </select>
        </div>
      </div>
    </div>
  );
};
