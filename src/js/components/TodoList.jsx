import React, { useState } from "react";
import "../../styles/index.css"; 

// Función para generar un color hexadecimal aleatorio
export const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const TodoList = () => {
    // Estado para la lista de tareas
    const [todos, setTodos] = useState([]);
    // Entrada controlada del formulario
    const [inputValue, setInputValue] = useState("");

    // formulario
    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (inputValue.trim() !== "") {
            const newTodo = {
                id: Date.now(), 
                label: inputValue.trim(),
                color: generateRandomColor(),
                completed: false,
            };
            // Agrega la nueva tarea al principio de la lista
            setTodos([newTodo, ...todos]);
            // Limpia el input después de agregar la tarea
            setInputValue("");
        }
    };

    // Eliminar Tarea
    const deleteTodo = (idToDelete) => {
        const updatedTodos = todos.filter((todo) => todo.id !== idToDelete);
        setTodos(updatedTodos);
    };

    // Marcar/Desmarcar una tarea
    const toggleCompleted = (idToToggle) => {
        setTodos(
            todos.map((todo) =>
                todo.id === idToToggle ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center todo-title mb-4">Todo List</h1>

            {/* Formulario para agregar tareas*/}
            <form onSubmit={handleSubmit} className="todo-form mb-3">
                <input
                    type="text"
                    className="form-control todo-input shadow-sm"
                    placeholder="¿Qué tienes que hacer hoy? (Presiona Enter)"
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                />
            </form>

            <div className="card shadow-lg todo-notebook">
                <ul className="list-group list-group-flush">
                    {todos.length === 0 ? (
                        // Mensaje cuando no hay tareas
                        <li className="list-group-item text-center fst-italic py-3 no-tasks">
                            No hay tareas, añadir tareas
                        </li>
                    ) : (
                        // Mapeo de la lista
                        todos.map((todo) => (
                            <li
                                key={todo.id}
                                className={`list-group-item d-flex justify-content-between align-items-center todo-item ${todo.completed ? 'completed' : ''}`}
                                style={{ borderLeft: `5px solid ${todo.color}` }} // Borde de color autogenerado
                            >
                                <span className="task-content" onClick={() => toggleCompleted(todo.id)}>
                                    {/* Icono de completado/pendiente */}
                                    <i 
                                        className={`me-3 ${todo.completed ? 'fas fa-check-circle text-success' : 'far fa-circle text-muted'}`}
                                        title={todo.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                                    ></i>
                                    {/* Etiqueta de la tarea */}
                                    {todo.label}
                                </span>
                                
                                {/* Ícono de eliminar */}
                                <span 
                                    className="delete-icon" 
                                    onClick={() => deleteTodo(todo.id)}
                                    title="Eliminar tarea"
                                >
                                    <i className="fas fa-trash-alt text-danger"></i>
                                </span>
                            </li>
                        ))
                    )}
                </ul>
                <div className="card-footer text-muted task-counter">
                    {todos.length} {todos.length === 1 ? 'tarea pendiente' : 'tareas pendientes'}
                </div>
            </div>
        </div>
    );
};

//export default TodoList;