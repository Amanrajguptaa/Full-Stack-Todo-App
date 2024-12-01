import express from "express"
import authMiddleware from '../middlewares/auth.middleware.js'
import { addTodo, getTodos , updateTodo , deleteTodo,getTodoById } from "../controllers/todo.controller.js";


const todoRouter = express.Router();

todoRouter.post('/add-todo',authMiddleware,addTodo)
todoRouter.get('/get-todo',authMiddleware,getTodos)
todoRouter.get('/get-todo/:id',authMiddleware,getTodoById)
todoRouter.put('/update-todo/:id',authMiddleware,updateTodo)
todoRouter.delete('/delete-todo/:id',authMiddleware,deleteTodo)

export default todoRouter;