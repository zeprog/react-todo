import React from 'react';
import { useState } from 'react';
import './AddTodo.css'

interface AddTodoProps {
  addTodo(title: string): void
}

const AddTodo:React.FC<AddTodoProps> = (props) => {
  const [title, setTitle] = useState<string>('')

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()

    if(title.trim()) {
      props.addTodo(title)
      setTitle('')
    }
  }

  return (
    <div className="container">
      <form className="todo__form" onSubmit={submitHandler}>
        <input type="text" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} placeholder="Например, купить хлеб"/>
        <button type="submit">Add todo</button>
      </form>
    </div>
  );
};

export default AddTodo;