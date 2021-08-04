import React, { useState } from 'react'
import {MdDelete, MdEdit, MdDone} from 'react-icons/md'
import { Todo } from '../interfaces';
import './TodoList.css'

type TodoListProps = {
  todo: Todo
  toggleTodo(id: number): void
  removeTodo(id: number): void
  editTodo(id: number, title: string): void,
  index: number
}

const TodoList: React.FC<TodoListProps> = ({todo, toggleTodo, removeTodo, editTodo, index}) => {
  const [edit, setEdit] = useState({editEnabled: false})
  const [title, setTitle] = useState<string>(todo.title)

  const classes = ['todo-item__label']

  if(todo.completed) {
    classes.push('done')
  }

  return (   
    <li className="todo-item" key={todo.id}>
      <label className={classes.join(' ')}>
        <input type="checkbox" className="todo-item__checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)}/>
        <strong>{index + 1}&nbsp;</strong>
        {edit.editEnabled ? 
          <form>
            <input type="text" value={title} className="todo-item__input" onChange={(e: React.ChangeEvent<HTMLInputElement>)  => setTitle(e.target.value)}/>
          </form> :
          <p onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}>{title}</p>
        }
      </label>
      {edit.editEnabled ? 
        <button className="todo-item__button" onClick={() => {editTodo(todo.id, title); setEdit({editEnabled: false})}}><MdDone /></button> : ''
      }
      <button className="todo-item__button" onClick={() => {editTodo(todo.id, title); setEdit({editEnabled: true})}}><MdEdit /></button>
      <button className="todo-item__button" onClick={() => removeTodo(todo.id)}><MdDelete /></button>
    </li>
  )
};

export default TodoList;