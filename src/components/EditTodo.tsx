import { useState } from 'react';
import { Todo } from './TodoItem'; 


type EditTodoProps = {
    todo: Todo;  
    onSave: (id: number, newText: string, completed: boolean) => void; 
    onCancel: () => void;  
};

export const EditTodo = ({ todo, onSave, onCancel}: EditTodoProps) => {
    const [editedText, setEditedText] = useState(todo.text);
    const [error, setError] = useState(''); 

    const handleSave = () => {
        if (!editedText.trim()) { // Проверяем, не пустое ли поле
            setError('Текст задачи не может быть пустым!');
            return; // Прерываем сохранение
        }
        setError(''); // Очищаем ошибку, если всё в порядке
        onSave(todo.id, editedText, todo.completed); 
    };

    return (
        <div className={`todo-item edit-mode`}>
            <input
                minLength={1}
                placeholder='Ваш текст...'
                type="text"
                value={editedText}
                onChange={(e) => {
                    setEditedText(e.target.value);
                    setError(''); 
                }}
                className={`edit-todo-input ${error ? 'error' : ''}`} 
                autoFocus
            />

            {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
            
            <div className="completedStatus">
                {todo.completed ? "Выполнено" : "Не выполнено"}
            </div>
            
            <div>Дата: {todo.createdAt.toLocaleDateString('ru-RU')}</div>
            
            <div className="edit-actions">
                <button 
                    onClick={handleSave}
                    className="edit-button"
                >
                    Сохранить
                </button>
                <button
                    title='отмена'
                    onClick={onCancel}
                    className="delete-button"
                >
                </button>
            </div>
        </div>
    );
};