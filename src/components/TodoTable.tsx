import { TodoTableProps } from '../types';

function TodoTable(props: TodoTableProps) {
    return (
        <><table>
            <thead>
                <tr>
                    <td>Description</td>
                    <td>Duedate</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                {props.todos.map((todo, index) => (
                    <tr key={index}>
                        <td>{todo.description}</td>
                        <td>{todo.duedate}</td>
                        <td>
                            <button onClick={() => props.handleDelete(index)}>Delete</button>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table></>
    )


}

export default TodoTable