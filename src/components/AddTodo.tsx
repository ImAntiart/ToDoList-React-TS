import { useState } from "react";

type AddTodoProps = {
  onAdd: (text: string) => void; // Функция, которую передаст App.tsx
};

export const AddTodo = ({ onAdd }: AddTodoProps) => {
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

/* 
  const handleSubmit = () => {
    if (inputText.trim()) {
      onAdd(inputText); // Передаем текст в App.tsx
      setInputText(""); // Очищаем input
    }
  };
 */
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
    </div>
  );
};
