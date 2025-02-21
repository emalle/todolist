import { useState } from "react";
import TodoTable from "./TodoTable";

type Todo = {
    description: string;
    duedate: string;
}

function TodoList() {
    const [todo, setTodo] = useState<Todo>({
        description: '',
        duedate: ''
    })
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleAdd = () => {
        if (!todo.description) {
            alert("Enter some values first");
        }
        else {
            setTodos([todo, ...todos]);
            setTodo({ description: '', duedate: '' })
        }
    };
    return (
        <>
            <input
                placeholder="Description"
                onChange={e => setTodo({ ...todo, description: e.target.value })}
                value={todo.description}
            />
            <input
                type="date"
                placeholder="Duedate"
                onChange={e => setTodo({ ...todo, duedate: e.target.value })}
                value={todo.duedate}
            />
            <button onClick={handleAdd}>Add</button>
            <TodoTable todos={todos} />
        </>

    );
}

export default TodoList;