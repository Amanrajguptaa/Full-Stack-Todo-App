import todoModel from "../models/todo.model.js";

const addTodo = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const userId = req.user.id; 

        const newTodo = new todoModel({
            user: [userId],
            title,
            description,
            tag,
        });

        await newTodo.save();
        res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create todo', error: error.message });
    }
};


const getTodos = async (req, res) => {
    try {
        const userId = req.user.id;

        const todos = await todoModel.find({ user: userId });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch todos', error: error.message });
    }
};


const getTodoById=async(req,res)=>{
    try {
        const{id}= req.params;
        const todo = await todoModel.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch todo', error: error.message});
    }
}


const updateTodo = async (req, res) => {
    try {
        const { id } = req.params; 
        const userId = req.user.id;
        const updateData = req.body;

        const updatedTodo = await todoModel.findOneAndUpdate(
            { _id: id, user: userId },
            updateData,
            { new: true } 
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found or not authorized' });
        }

        res.status(200).json({ message: 'Todo updated successfully', todo: updatedTodo });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update todo', error: error.message });
    }
};



const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params; 
        const userId = req.user.id;

        const deletedTodo = await todoModel.findOneAndDelete({ _id: id, user: userId });

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found or not authorized' });
        }

        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete todo', error: error.message });
    }
};




export{addTodo,getTodos,updateTodo,deleteTodo,getTodoById}