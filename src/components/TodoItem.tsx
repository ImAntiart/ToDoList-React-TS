import './TodoItem.css'

interface TodoItemProps {
  text: string
}

function TodoItem({ text }: TodoItemProps) {
  return (
    <div className="todo-item">
      {/* Будем добавлять эффект булавки позже */}
      <p>{text}</p>
    </div>
  )
}

export default TodoItem