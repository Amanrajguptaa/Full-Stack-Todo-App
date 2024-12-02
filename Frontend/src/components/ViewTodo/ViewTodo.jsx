import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewTodo = () => {
  const backendUrl = "http://localhost:8000";

  const token = localStorage.getItem("token");

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    tag: "Normal",
  });
  const [showTodo, setShowTodo] = useState([]);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!todo.title || !todo.description) {
      setError("Title and Description are required.");
      return;
    }

    try {
      await axios.put(`${backendUrl}/api/todo/update-todo/${currentTodoId}`, todo, {
        headers: { token },
      });

      setTodo({ title: "", description: "", tag: "Normal" });
      setError("");
      setIsEditing(false);
      await getTodos();
    } catch (error) {
      console.error(error);
      setError("Failed to update todo. Please try again.");
    }
  };

  const getTodos = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/todo/get-todo`, {
        headers: { token },
      });
      setShowTodo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodoById = async (id) => {
    try {
      const response = await axios.get(`${backendUrl}/api/todo/get-todo/${id}`, {
        headers: { token },
      });
      setTodo(response.data);
      setCurrentTodoId(id);
      setIsEditing(true); // Show the modal
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/todo/delete-todo/${id}`, {
        headers: { token },
      });
      setShowTodo((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setIsEditing(false);
    setTodo({ title: "", description: "", tag: "Normal" });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Manage Your Todos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {showTodo?.map((item) => (
          <div
            key={item._id}
            className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold text-gray-700">{item.title}</h2>
            <p className="text-gray-500 mt-2">{item.description}</p>
            <span
              className={`inline-block mt-4 px-3 py-1 text-sm rounded-full ${
                item.tag === "Urgent"
                  ? "bg-red-100 text-red-600"
                  : item.tag === "Normal"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {item.tag}
            </span>
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => getTodoById(item._id)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Editing */}
      {isEditing && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeModal}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Todo</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={todo.title}
                    onChange={(e) =>
                      setTodo({ ...todo, title: e.target.value })
                    }
                    placeholder="Enter a Title for your Todo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={todo.description}
                    onChange={(e) =>
                      setTodo({ ...todo, description: e.target.value })
                    }
                    placeholder="Enter a Description for your Todo"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="tag"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tag
                  </label>
                  <select
                    name="tag"
                    id="tag"
                    value={todo.tag}
                    onChange={(e) =>
                      setTodo({ ...todo, tag: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="Normal">Normal</option>
                    <option value="Less Important">Less Important</option>
                  </select>
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="ml-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewTodo;
