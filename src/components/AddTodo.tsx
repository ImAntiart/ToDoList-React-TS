import { useState } from 'react';

type AddTodoProps = {
  onAdd: (text: string) => void; // Функция, которую передаст App.tsx
};


export const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = () => {
    if (inputText.trim()) {
      onAdd(inputText); // Передаем текст в App.tsx
      setInputText(''); // Очищаем input
    }
  };

  return (
        <div className="input-area">
          <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Новая задача..." />
          <button onClick={handleSubmit} >Добавить</button>
        </div>
  );
};