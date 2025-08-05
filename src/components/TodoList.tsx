import TodoItem from './TodoItem'

interface TodoListProps {
  todos: string[]
}

function TodoList({ todos }: TodoListProps) {
  return (
    <div className="board">
      {todos.map((todo, index) => (
        <TodoItem key={index} text={todo} />
      ))}
    </div>
  )
}

export default TodoList