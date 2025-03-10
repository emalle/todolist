import { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, } from 'ag-grid-community';
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


ModuleRegistry.registerModules([AllCommunityModule]);

type Todo = {
    description: string;
    priority: string;
    date: string;
}

function TodoList() {
    const [todo, setTodo] = useState<Todo>({
        description: '',
        priority: '',
        date: ''
    })

    const [todos, setTodos] = useState<Todo[]>([]);
    const gridRef = useRef<AgGridReact>(null);

    const [colDefs] = useState<ColDef[]>([
        { field: "description", filter: true, floatingFilter: true },
        {
            field: "priority",
            filter: true,
            floatingFilter: true,
            cellStyle: (params) =>
                params.value === "High" ? { color: "red" } : { color: "black" },
        },
        { field: "date", filter: true, floatingFilter: true },

    ])

    const handleAdd = () => {
        if (!todo.description) {
            alert("Enter some values first");
        }
        else {
            setTodos([todo, ...todos]);
            setTodo({ description: '', priority: '', date: '' })
        }
    };
    const handleDelete = () => {
        const selectedNodes = gridRef.current?.api.getSelectedNodes();
        const selectedData = selectedNodes?.map((node) => node.data);
        setTodos(todos.filter((todo) => !selectedData?.includes(todo)));
    };
    const handleDateChange = (date: Date | null) => {
        if (date) {
            setTodo({ ...todo, date: date.toISOString().split("T")[0] });
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack mt={2} direction="row" spacing={2} justifyContent="center" alignItems="center">
                <TextField
                    label="Description"
                    onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                    value={todo.description}
                />
                <TextField
                    label="Priority"
                    onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
                    value={todo.priority}
                />
                <DatePicker
                    label="Date"
                    value={todo.date ? new Date(todo.date) : null}
                    onChange={handleDateChange}
                    slotProps={{ textField: { fullWidth: true } }}

                />
                <Button onClick={handleAdd}>Add</Button>
                <Button color="error" onClick={handleDelete}>Delete</Button>
            </Stack>
            <div className="ag-theme-material" style={{ width: 745, height: 500 }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={todos}
                    columnDefs={colDefs}
                    rowSelection="single"
                />
            </div>
        </LocalizationProvider>
    );
}

export default TodoList;