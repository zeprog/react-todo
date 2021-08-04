import React, {useState, useEffect} from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { Todo } from './interfaces';
import './App.css'

const App: React.FC = () => {
  let [todos, setTodos] = useState<Todo[]>([])

  useEffect( () => {
    setTodos(JSON.parse(localStorage.getItem('todos')!));
  }, [] );

  useEffect( () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos] );

  const addTodo = (title: string) => {
    let newTodo = {
      title: title,
      id: Date.now(),
      completed: false
    }
    setTodos(prev => [newTodo, ...prev])
  }

  const removeTodo = (id: number) => [
    setTodos(
      todos.filter(todo => todo.id !== id)
    )
  ]

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  function editTodo(id: number, title: string) {
    if(title) {
      let newTodos = todos.map( todo => todo.id === id ? {...todo, title} : todo );
      setTodos(newTodos);
    }
  }
  
  return (
    <div className="container">
      <div className="App">
        <h1 className="app__title">To do application</h1>
        <AddTodo addTodo={addTodo}/>
        <div className="container">
          <ul>
            {
              todos.length ? todos.map((todo, index) => {return (<TodoList todo={todo} key={todo.id} toggleTodo={toggleTodo} index={index} removeTodo={removeTodo} editTodo={editTodo}/>)
              }) : <p className="todo__no-todo">У вас нет ни одного дела!</p>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;