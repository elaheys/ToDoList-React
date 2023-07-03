import React, { useState,useEffect } from 'react';

//style
import styles from './TodoApp.module.css';

//icon
import plus from './assets/plus.svg';

//component
import TodoList from './TodoList';

const TodoApp = () => {

  const [text,setText] = useState('');
  const [todos,setTodos] = useState([]);
  const [status,setStatus] = useState('all');
  const [filtertodo,setFilerTodo] = useState([]);
  const [error,setError] = useState('');
  
  useEffect(() => {
    getLocalTodo();
    },[]);
    
    useEffect(() => {
      filterHandler();
      saveLocalTodo();
      },[status,todos]); 

  const filterHandler = () => {
    switch (status){
      case "completed" :
        setFilerTodo(todos.filter(todo => todo.completed === true));
        break;
      case "uncompleted" :
        setFilerTodo(todos.filter(todo => todo.completed === false));
        break;
      default :
        setFilerTodo(todos);
        break;
           
    }
  }


  const changeHandler = (event) =>{
      setText(event.target.value);
  }

  const submitHandler = (event) => {
      event.preventDefault();
      if(text){
        setTodos([
        ...todos,
        {text:text, completed:false, id:Date.now()}
      ])
      setText('');
      setError('');

      } else{
        setError('Please Enter a Task');
      }
      
      
  }

  const statusHandler = (event) => {
    setStatus(event.target.value);
  }

  const saveLocalTodo = () => {
    if(todos.length > 0 ){
      window.localStorage.setItem('todos', JSON.stringify(todos))
    }
  }
  
    const getLocalTodo = () =>{
    if(window.localStorage.getItem('todos') === null){
      window.localStorage.setItem('todos' ,JSON.stringify([]));

      }else{
          let localtodo = JSON.parse(window.localStorage.getItem("todos"));
          setTodos(localtodo)
      }
    }

    const removeLocalTodo = () => {
     if(todos.length === 1 ){
      window.localStorage.removeItem('todos')
     }
  }


    return (
        <div>
        <header>
           <h1>Todo List</h1>
        </header>
        <form className={styles.form}>
          <div className={styles.input}>
          <input type="text" className={styles.todoInput} onChange={changeHandler} value={text}/>
              <button className={styles.todoButton} type="submit" onClick={submitHandler}>
                <img src={plus} alt='plus' style={{width:'25px'}}/>
              </button>
          </div>
    <div className={styles.select}>
      <select className={styles.todos} onChange={statusHandler} value={status}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
     </div>
      </form>
      <span>{error}</span>
        <TodoList todos={todos} setTodos={setTodos} filtertodo={filtertodo} removeLocalTodo={removeLocalTodo}/>
        </div>
    );
};

export default TodoApp;