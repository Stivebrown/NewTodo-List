import React,{useState} from 'react'
import PropTypes from 'prop-types';


const TaskForm = ({onAdd}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error,setError] = useState('');

    const  handleSubmit = (e) => {
        e.preventDefault();
        if(!title.trim()){
            setError("Title is required")
            return
        }
        onAdd({title, description, status: "pending"})
        setTitle('')
        setDescription('')
        setError('')
    };

  return (
    <div>
        <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md"
      aria-labelledby="task-form"
    >
      <h2 id="task-form" className="text-xl font-semibold mb-4">
        Add New Task
      </h2>
      {error && <p className="text-red-500 mb-4" role="alert">{error}</p>}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Task title"
          aria-required="true"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Task description"
          rows="4"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        aria-label="Add task"
      >
        Add Task
      </button>
    </form>
        {/* <form className="bg-gray-300 p-4 rounded shadow-md flex gap-4">
            <input type="text" className="bg-dark-300 w-full p-2 rounded-sm" placeholder='Add a new task...'  />
            <button className="bg-purple-700 text-white py-2 px-4 rounded" onClick={() => {}}>add task</button>
        </form> */}
    </div>
  )
}

TaskForm.propTypes = {
    onAdd: PropTypes.func.isRequired
};

export default TaskForm;