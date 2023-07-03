import React from 'react';

//styles
import styles from './Todo.module.css';

//icons
import trash from './assets/trash.svg'
import check from './assets/check.svg'


const Todo = ({text,todo,todos,setTodos,removeLocalTodo}) => {

    const deletHandler = () => {
        setTodos(todos.filter(el => el.id !== todo.id));
        removeLocalTodo();
        }

    const checkHandler = () => {
        setTodos(todos.map((item)=> {
            if(item.id === todo.id){
                return{...item,completed: !item.completed} 
            }
            return item
    })        
)}         
        
         

    return (
            <div className={styles.todo}>
                <li className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>{text}</li>
                <div className={styles.buttons}>
                     <button className={styles.completeBtn} onClick={checkHandler}>
                        <img src={check} alt='check' />
                    </button>
                    <button className={styles.trashBtn} onClick={deletHandler}>
                        <img src={trash} alt='trash'/>
                    </button>
                </div>
            </div>
        
    );
};

export default Todo;