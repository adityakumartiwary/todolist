import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function TodoList() {
  const [tasks, setTasks] = useState([]); // State to hold tasks
  const [task, setTask] = useState(''); // State for the input value
  const [dateTime, setDateTime] = useState(new Date()); // State for the selected date and time

  // Function to handle adding a task
  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, dateTime }]);
      setTask(''); // Clear input field
      setDateTime(new Date()); // Reset date-time picker
    }
  };

  // Function to delete a task by index
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  // Function to format date in Indian format (DD/MM/YYYY HH:MM AM/PM)
  const formatDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-IN', options).format(date);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>To-Do List</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
          style={styles.input}
        />
        <DatePicker
          selected={dateTime}
          onChange={(newDateTime) => setDateTime(newDateTime)}
          showTimeSelect
          dateFormat="Pp"
          style={styles.datePicker}
        />
        <button onClick={addTask} style={styles.addButton}>
          Add Task
        </button>
      </div>
      <ul style={styles.taskList}>
        {tasks.map((task, index) => (
          <li key={index} style={styles.taskCard}>
            <div style={styles.taskDetails}>
              <strong style={styles.taskText}>{task.text}</strong>
              <p style={styles.taskDate}>Due: {formatDate(task.dateTime)}</p>
            </div>
            <button onClick={() => deleteTask(index)} style={styles.deleteButton}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Inline CSS for enhanced styling
const styles = {
  container: {
    margin: '20px auto',
    padding: '20px',
    maxWidth: '600px',
    backgroundColor: 'beige',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
    fontFamily: "'Roboto', sans-serif",
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginRight: '10px',
  },
  datePicker: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginRight: '10px',
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  taskList: {
    listStyle: 'none',
    padding: 0,
    marginTop: '20px',
  },
  taskCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  taskDetails: {
    textAlign: 'left',
  },
  taskText: {
    fontSize: '1.2rem',
    margin: '0',
  },
  taskDate: {
    fontSize: '0.9rem',
    color: '#777',
    margin: '5px 0 0',
  },
  deleteButton: {
    padding: '8px 12px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#dc3545',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default TodoList;
