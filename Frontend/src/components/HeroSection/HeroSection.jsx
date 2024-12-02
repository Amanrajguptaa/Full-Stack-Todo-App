import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      {/* First Section: Main Hero Section */}
      <section className="bg-[#111] text-white py-16 px-8 sm:px-12 ">
        <div className="text-center mt-24">
          <h1 className="text-3xl sm:text-6xl font-extrabold font-horizon text-white mb-6">
            Manage Your Tasks Like a Pro
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Stay on top of your goals with ease. Prioritize your tasks and boost
            your productivity.
          </p>

          <div className="flex justify-center gap-6 mb-12">
            <Link
              to={"/signup"}
              onClick={() => scrollTo(0, 0)}
              className="px-8 py-4 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition duration-300 transform hover:scale-105"
            >
              Start Managing Tasks
            </Link>
          </div>
        </div>
      </section>

      {/* Second Section: Task Overview */}
      <section className="relative bg-[#111] text-white pt-6 pb-12 px-8 sm:px-12 lg:px-16">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          {/* Left Section: Text Content */}
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Organize your work and life, finally.
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8">
              Simplify life for both you and your team with the world’s #1 task
              manager and to-do list app.
            </p>
            <div className="flex gap-6">
              <button className="bg-red-600 text-white py-3 px-6 rounded-full hover:bg-red-700 transition duration-300 transform hover:scale-105 shadow-lg">
                Start for Free
              </button>
            </div>
          </div>

          {/* Right Section: Task Preview */}
          <div className="w-full lg:w-1/2 flex justify-center items-center relative">
            <div className="w-full max-w-xs bg-[#1e1e1e] rounded-lg shadow-2xl p-6">
              <div className="text-sm text-gray-500 mb-3">My Projects</div>
              <div className="space-y-5">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-100 text-lg">
                    Do 30 minutes of yoga 🧘‍♀️
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-100 text-lg">
                    Dentist appointment 🦷
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-100 text-lg">Buy bread 🥖</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
