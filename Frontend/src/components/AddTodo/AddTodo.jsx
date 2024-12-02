import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const backendUrl = "http://localhost:8000";

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [tag, setTag] = useState("Normal");
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Title and Description are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${backendUrl}/api/todo/add-todo`,
        { title, description, tag, dueDate, color },
        {
          headers: { token },
        }
      );

      console.log(response.data);

      // Reset the form
      setTitle("");
      setDescription("");
      setTag("Normal");
      setDueDate("");
      setColor("#ffffff");
      setError("");
      navigate("/todos");
    } catch (error) {
      console.error(error);
      setError("Failed to add todo. Please try again.");
    }
  };


  return (
    <div className="container bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-yellow-600 to-red-600 py-10 ">
      <h1 className="font-horizon text-center pb-10 text-4xl text-white">ADD YOUR TODO WORK</h1>
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-3xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Todo</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Urgent">Urgent</option>
            <option value="Normal">Normal</option>
            <option value="Less Important">Less Important</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Todo Color
          </label>
          <input
            type="color"
            id="dueDate"
            onChange={(e) => setColor(e.target.value)}
            value={color}
            name="dueDate"
            className="mx-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Add Todo
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddTodo;
