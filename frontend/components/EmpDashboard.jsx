import React, { useState, useEffect } from 'react';
import EmpOverView from './EmpOverView';
import EmpSideNav from './EmpSideNav';

import { fetchWithAuth } from '@/utils/api';

const EmpDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [nav, setNav] = useState("new");
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await fetchWithAuth('/tasks');
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, []);

  const updateStatus = async (id, newStatus) => {
  try {
    const updatedTask = await fetchWithAuth(`/tasks/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus })
    });

    setTasks(tasks.map(task =>
      task._id === id ? updatedTask : task
    ));
    
    if (selectedTask && selectedTask._id === id) {
      setSelectedTask(updatedTask);
    }
  } catch (error) {
    alert(error.message);
  }
};

  const filteredTasks = tasks.filter(task => task.status === nav);

  if (loading) {
    return <div className="p-4">Loading tasks...</div>;
  }
  return (
    <div className="flex">
    

      <div className="p-4 flex-1">
        <EmpOverView />

       <div className='md:ml-11'>
        {!selectedTask && (
          <div className="flex gap-4 mb-6">
            <button onClick={() => setNav("new")} className="px-3 py-1 bg-blue-500 text-white rounded">New Tasks</button>
            <button onClick={() => setNav("active")} className="px-3 py-1 bg-yellow-500 text-white rounded">Active Tasks</button>
            <button onClick={() => setNav("completed")} className="px-3 py-1 bg-green-500 text-white rounded">Completed Tasks</button>
            <button onClick={() => setNav("failed")} className="px-3 py-1 bg-red-500 text-white rounded">Failed Tasks</button>
          </div>
        )}

        
        {selectedTask ? (
  <div className="p-6 border rounded shadow-lg bg-white">
    <button onClick={() => setSelectedTask(null)} className="mb-4 text-blue-600 underline">← Back to Tasks</button>
    <h2 className="text-2xl font-semibold mb-2">{selectedTask.title}</h2>
    <p className="mb-2 text-gray-700">{selectedTask.description}</p>
    <div className="flex gap-5 text-sm mb-4">
      <p><i className="bi bi-calendar pr-2"></i>{new Date(selectedTask.createdAt).toLocaleDateString()}</p>
      <p><i className="bi bi-tag pr-2"></i>{selectedTask.category}</p>
      <p><i className="bi bi-clock"></i> {new Date(selectedTask.dueDate).toLocaleDateString()}</p>
    </div>
    {selectedTask.status === "new" && (
      <div className="flex gap-2">
        <button onClick={() => updateStatus(selectedTask._id, "active")} className="bg-green-500 px-3 py-1 text-white rounded"><i className="bi bi-check2-circle p-2"></i>Accept</button>
        <button onClick={() => updateStatus(selectedTask._id, "failed")} className="bg-red-500 px-3 py-1 text-white rounded"><i className="bi bi-x-circle p-2"></i>Reject</button>
      </div>
    )}
    {selectedTask.status === "active" && (
      <div className="flex gap-2">
        <button onClick={() => updateStatus(selectedTask._id, "completed")} className="bg-green-500 px-3 py-1 text-white rounded"><i className="bi bi-check2-circle p-2"></i>Mark as Completed</button>
        <button onClick={() => updateStatus(selectedTask._id, "failed")} className="bg-red-500 px-3 py-1 text-white rounded"><i className="bi bi-x-circle p-2"></i>Mark as Failed</button>
      </div>
    )}
  </div>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {filteredTasks.length === 0 ? (
      <p>No tasks in this category.</p>
    ) : (
      filteredTasks.map(task => (
        <div
          key={task._id}
          onClick={() => setSelectedTask({
            ...task,
            id: task._id,
            desc: task.description,
            duedate: new Date(task.dueDate).toLocaleDateString(),
            assigneddate: new Date(task.createdAt).toLocaleDateString(),
            domain: task.category
          })}
          className="p-4 border rounded shadow cursor-pointer hover:bg-gray-100"
        >
          <div className="flex justify-between mb-2">
            <h2 className="text-lg font-semibold">{task.title}</h2>
            <span className="text-sm capitalize bg-violet-400 rounded h-5 w-16 text-center text-gray-800">
              {task.status}
            </span>
          </div>
          <p className="mb-2 text-gray-700">
            {task.description ? (task.description.length > 60 ? task.description.slice(0, 60) + "..." : task.description) : "No description"}
          </p>
          <div className="text-sm text-gray-600">
            <p><i className="bi bi-calendar pr-2"></i>{new Date(task.createdAt).toLocaleDateString() || "Not assigned"}</p>
            <p><i className="bi bi-tag pr-2"></i>{task.category || "No category"}</p>
            <p><i className="bi bi-clock"></i> {new Date(task.dueDate).toLocaleDateString() || "No due date"}</p>
          </div>
        </div>
      ))
    )}
  </div>
)}
      </div>
    </div>
</div>
  );
};

export default EmpDashboard;
