import React from 'react'
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import AddTodo from './components/AddTodo/AddTodo'
import { Route, Routes } from 'react-router-dom'
import ViewTodo from './components/ViewTodo/ViewTodo'

const App = () => {
  const token =localStorage.getItem('token')
  return (
    <div>
      <Routes>
      <Route path="/" element={token ? <AddTodo /> : <SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-todo" element={<AddTodo />} />
        <Route path="/todos" element={<ViewTodo/>} />
      </Routes>
    </div>
  )
}

export default App
