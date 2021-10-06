import { useState } from 'react'
import { FiTrash, FiCheckSquare } from 'react-icons/fi'

import '../styles/tasklist.scss'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (!newTaskTitle) {
      console.error('Task title cannot be empty');
      return;
    }

    const newTask: Task = {
      id: randomIntFromInterval(),
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    setTasks(tasks.map(mapTask => ({
      ...mapTask,
      isComplete: mapTask.id === id ? !mapTask.isComplete : mapTask.isComplete,
    })));
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter(filterTask => filterTask.id !== id));
  }

  const randomIntFromInterval = (min = 1, max = 1000): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}