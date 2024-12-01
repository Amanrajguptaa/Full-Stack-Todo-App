import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover.jsx";

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

  const handleFormSubmit = async (e, id) => {
    e.preventDefault();

    if (!todo.title || !todo.description) {
      setError("Title and Description are required.");
      return;
    }

    try {
      const response = await axios.put(
        `${backendUrl}/api/todo/update-todo/${id}`,
        todo,
        {
          headers: { token },
        }
      );

      console.log(response.data);
      setTodo({ title: "", description: "", tag: "Normal" });
      setError("");
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

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      {showTodo?.map((item) => (
        <div key={item._id} className="flex gap-10 border border-black max-w-xs">
          <h1>{item.title}</h1>
          <Popover>
            <PopoverTrigger onClick={() => getTodoById(item._id)}>Open</PopoverTrigger>
            <PopoverContent>
              <form onSubmit={(e) => handleFormSubmit(e, item._id)}>
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
                    onChange={(e) => setTodo({ ...todo, title: e.target.value })}
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
                    onChange={(e) => setTodo({ ...todo, tag: e.target.value })}
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
                </div>
              </form>
            </PopoverContent>
          </Popover>
          <button onClick={() => deleteTodo(item._id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default ViewTodo;
