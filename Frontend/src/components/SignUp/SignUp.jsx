import React, { useState } from 'react';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
const SignUp = () => {
    const backendUrl="http://localhost:8000"

    const navigate=useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[image,setImage]=useState(null);
    const [formData,setFormData] = useState({
        name: '',
        email: '',
        password: '',
        image:null
    });
    

    const handleFormSubmit=async(e)=>{
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('email', email);
        formDataToSend.append('password', password);
        formDataToSend.append('image', image);

        try {
            const response =await axios.post(`${backendUrl}/api/user/register`,formDataToSend)
            console.log(response);
            console.log(response.data);
            setEmail('')
            setPassword('')
            setName('')
            setImage(null);
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className="flex items-center justify-center min-h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-orange-600 to-orange-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
        <form onSubmit={(e)=>handleFormSubmit(e)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" value={name} name="name" placeholder="Enter your Name" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setName(e.target.value)} />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={email}  placeholder="Enter your Email" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setEmail(e.target.value)}/>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password} 
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your Password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Photo
            </label>
            <input
              type="file"
              name="image"
              onChange={(e)=>setImage(e.target.files[0])}
              className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              accept="image/*"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className='mt-2'>Already have an Account?<Link to={'/login'}><span className='text-blue-500'> Login</span></Link></p>
      </div>
    </div>
  );
};

export default SignUp;
