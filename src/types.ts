export type Todo = {
    description: string;
    duedate: string;
}

export type TodoTableProps = {
    todos: Todo[];
    handleDelete: (index: number) => void;
}

