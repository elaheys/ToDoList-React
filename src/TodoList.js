import React from 'react';

//styles
import styles from './TodoList.module.css';

//component
import Todo from './Todo';

const TodoList = ({todos,setTodos,filtertodo,removeLocalTodo}) => {
    return (
        <div className={styles.container}>
            <ul className={styles.todoList}>

                {
                    filtertodo.map(todo => <Todo 
                        text={todo.text} 
                        key={todo.id}
                        todo={todo}
                        todos={todos}
                        setTodos={setTodos}
                        removeLocalTodo={removeLocalTodo}
                        />)
                }

            </ul>
        </div>
    );
};

export default TodoList;