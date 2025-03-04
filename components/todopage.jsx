import React, { useState } from 'react';
import { Trash2, CheckCircle, Edit2 } from 'lucide-react';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (task.trim()) {
      if (editIndex !== null) {
        const updatedTasks = tasks.map((t, i) => (i === editIndex ? { ...t, text: task } : t));
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, { text: task, completed: false }]);
      }
      setTask('');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const newTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 shadow-lg rounded-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-5 text-gray-700">Todo List</h1>
      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          placeholder="Add a task..." 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        <button 
          onClick={addTask} 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>
      {tasks.map((t, index) => (
        <div key={index} className={`mb-2 p-3 border rounded-md flex justify-between items-center ${t.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
          <div className="flex items-center gap-2">
            <button onClick={() => toggleComplete(index)} className="text-green-500 hover:text-green-700">
              <CheckCircle size={20} />
            </button>
            <span className={t.completed ? 'line-through text-gray-500' : 'text-gray-700'}>{t.text}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => editTask(index)} className="text-blue-500 hover:text-blue-700">
              <Edit2 size={20} />
            </button>
            <button onClick={() => deleteTask(index)} className="text-red-500 hover:text-red-700">
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;