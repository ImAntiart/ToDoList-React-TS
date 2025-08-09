import { useState } from 'react';
import { Todo } from './TodoItem'; // Убедитесь, что путь правильный

type EditTodoProps = {
    todo: Todo;  // Получаем объект задачи для редактирования
    onSave: (id: number, newText: string, completed: boolean) => void; // Колбэк для сохранения
    onCancel: () => void;  // Колбэк для отмены
};


export const EditTodo = ({ todo, onSave, onCancel}: EditTodoProps) => {
    const [editedText, setEditedText] = useState(todo.text); 

    const handleSave = () => {
        onSave(todo.id, editedText,  todo.completed); // Передаём новые данные родителю
    }


return (
        <div className='edit-todo'>
            <input 
            aria-label='да да, вот лабель отвали'
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            autoFocus
            />
            <div className="edit-actions">
                <button onClick={handleSave}>Сохранить</button>
                <button onClick={onCancel}>Отмена</button>
            </div>
        </div>
    );
};
