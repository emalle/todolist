import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial } from 'ag-grid-community';


ModuleRegistry.registerModules([AllCommunityModule]);

type Todo = {
    description: string;
    priority: string;
    duedate: string;
}

function TodoList() {
    const [todo, setTodo] = useState<Todo>({
        description: '',
        priority: '',
        duedate: ''
    })

    const [todos, setTodos] = useState<Todo[]>([]);

    const [colDefs] = useState<ColDef[]>([
        { field: "description", filter: true, floatingFilter: true },
        {
            field: "priority",
            filter: true,
            floatingFilter: true,
            cellStyle: (params) =>
                params.value === "High" ? { color: "red" } : { color: "black" },
        },
        { field: "duedate", filter: true, floatingFilter: true },

    ])

    const handleAdd = () => {
        if (!todo.description) {
            alert("Enter some values first");
        }
        else {
            setTodos([todo, ...todos]);
            setTodo({ description: '', priority: '', duedate: '' })
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
                placeholder="Priority"
                onChange={e => setTodo({ ...todo, priority: e.target.value })}
                value={todo.priority}
            />
            <input
                type="date"
                placeholder="Duedate"
                onChange={e => setTodo({ ...todo, duedate: e.target.value })}
                value={todo.duedate}
            />
            <button onClick={handleAdd}>Add</button>
            <div style={{ width: 700, height: 500 }}>
                <AgGridReact
                    rowData={todos}
                    columnDefs={colDefs}
                    animateRows={true}
                    theme={themeMaterial}
                />

            </div>

        </>

    );
}

export default TodoList;