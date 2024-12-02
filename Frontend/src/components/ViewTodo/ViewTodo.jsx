import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewTodo = () => {
  const backendUrl = "http://localhost:8000";
  const token = localStorage.getItem("token");

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    tag: "Normal",
    dueDate: "",
    color: "#ffffff",
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
    <div className="min-h-screen  bg-gradient-to-l from-orange-600 to-orange-500 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-20 text-white drop-shadow-lg font-horizon ">
        Your Todo Manager
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {showTodo?.map((item) => (
          // <div
          //   key={item._id}
          //   style={{ backgroundColor: item.color }}
          //   className="p-6 shadow-lg rounded-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          // >
          //   <h2 className="text-2xl font-semibold text-gray-800 mb-2">{item.title}</h2>
          //   <p className="text-gray-600 mb-4">{item.description}</p>
          //   <p className="text-sm text-gray-500">Due: {item.dueDate.split("T")[0]}</p>
          //   <span
          //     className={`inline-block mt-4 px-3 py-1 text-sm font-semibold rounded-full ${
          //       item.tag === "Urgent"
          //         ? "bg-red-100 text-red-600"
          //         : item.tag === "Normal"
          //         ? "bg-yellow-100 text-yellow-600"
          //         : "bg-green-100 text-green-600"
          //     }`}
          //   >
          //     {item.tag}
          //   </span>
          //   <div className="mt-6 flex justify-between items-center">
          //     <button
          //       onClick={() => getTodoById(item._id)}
          //       className="text-indigo-500 hover:text-indigo-600 font-medium"
          //     >
          //       Edit
          //     </button>
          //     <button
          //       onClick={() => deleteTodo(item._id)}
          //       className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
          //     >
          //       Delete
          //     </button>
          //   </div>
          // </div>
          <div
  key={item._id}
  style={{ backgroundColor: item.color }}
  className="p-6 shadow-xl rounded-2xl border border-gray-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
>
  {/* Header Section */}
  <div className="flex justify-between items-start">
    <h2 className="font-bold font-mathilde text-5xl text-gray-800">{item.title}</h2>
    <span
      className={`inline-block px-3 py-1 text-sm font-bold rounded-full ${
        item.tag === "Urgent"
          ? "bg-red-100 text-red-600"
          : item.tag === "Normal"
          ? "bg-yellow-100 text-yellow-600"
          : "bg-green-100 text-green-600"
      }`}
    >
      {item.tag}
    </span>
  </div>

  {/* Description */}
  <p className="text-gray-600 mt-4 mb-6  font-mathilde text-5xl leading-none">{item.description}</p>

  <div className="flex items-center text-sm text-gray-500 mb-4 font-bold">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 9V3.75m7.5 5.25V3.75m-11.25 9.75h15m-15 6h15M6 21h12a2.25 2.25 0 002.25-2.25V8.25A2.25 2.25 0 0018 6H6A2.25 2.25 0 003.75 8.25v10.5A2.25 2.25 0 006 21z"
      />
    </svg>
    Due: {item.dueDate.split("T")[0]}
  </div>

  <div className="mt-6 flex justify-between items-center">
    <button
      onClick={() => getTodoById(item._id)}
      className="flex items-center text-indigo-500 hover:text-indigo-600 font-medium transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 19.5L7.5 10.5m9 9v-6.75m0 6.75h-6.75"
        />
      </svg>
      Edit
    </button>
    <button
      onClick={() => deleteTodo(item._id)}
      className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 9.75v6.75m4.5-6.75v6.75m1.125-12h-7.5a.375.375 0 00-.375.375V6h8.25V3.375a.375.375 0 00-.375-.375zm.375 2.25v12.75A2.25 2.25 0 0113.875 21H10.125A2.25 2.25 0 017.875 18.375V5.625h8.25z"
        />
      </svg>
      Delete
    </button>
  </div>
</div>

        ))}
      </div>

      {isEditing && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeModal}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-xl">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Todo</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={todo.title}
                    onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                    placeholder="Enter a Title"
                    className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={todo.description}
                    onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                    placeholder="Enter a Description"
                    rows="4"
                    className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="tag" className="block text-sm font-medium text-gray-700">
                    Tag
                  </label>
                  <select
                    id="tag"
                    name="tag"
                    value={todo.tag}
                    onChange={(e) => setTodo({ ...todo, tag: e.target.value })}
                    className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="Normal">Normal</option>
                    <option value="Less Important">Less Important</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={todo.dueDate}
                    onChange={(e) => setTodo({ ...todo, dueDate: e.target.value })}
                    className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                    Todo Color
                  </label>
                  <input
                    type="color"
                    id="color"
                    value={todo.color}
                    onChange={(e) => setTodo({ ...todo, color: e.target.value })}
                    className="w-16 h-8 border rounded-lg"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  >
                    Update
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
