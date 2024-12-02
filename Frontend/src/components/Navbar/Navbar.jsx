import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const Navbar = () => {
  const navigate = useNavigate(); 
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const storedImg = JSON.parse(localStorage.getItem("userImg"));
      setUser(storedImg);
    }
  }, [token]);
  useEffect(() => {
    if (token && window.location.pathname === "/login") {
      navigate("/add-todo");
    }
  }, [token, navigate]);

  const handleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("userImg");
    navigate("/login");
  }

  return (
    <nav className="bg-[#111] text-white py-4 px-6 sm:px-12 flex justify-between items-center">
      <Link to={"/"}>
        <div className="text-3xl font-extrabold font-horizon text-white">
          Tasker
        </div>
      </Link>

      <div className="flex items-center gap-6">
        {token ? (
          <div className="flex items-center gap-4">
            {user?.image ? (
              <Popover>
            <PopoverTrigger>
              <img
                src={user.image} 
                alt="User Profile"
                className="h-10 w-10 rounded-full"
              />
             </PopoverTrigger>
             <PopoverContent className="mt-5 ml-40"><button onClick={handleLogout}>Logout</button></PopoverContent>
             </Popover>

            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-300 text-white flex justify-center items-center">
                <span className="text-xl">{user?.name?.[0]}</span>
              </div>
            )}
          </div>
        ) : (
          <Link
            to={"/signup"}
            className="flex items-center gap-2 px-6 py-3 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition duration-300 transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 3a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h8z"></path>
              <path d="M12 12v6"></path>
              <path d="M9 15l3 3 3-3"></path>
            </svg>
            SignUp / Login
          </Link>
        )}

        {/* Link for 'Add Task' */}
        <Link
          to={"/add-todo"}
          className="flex items-center gap-2 px-6 py-3 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition duration-300 transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14m7-7H5"></path>
          </svg>
          Add Task
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
