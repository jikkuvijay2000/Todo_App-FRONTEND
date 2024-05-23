import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../services/baseurl';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if(!username||!password)
      {
        toast.error("Try typing something!")
        return;
      }
    try {
      await axios.post(`${BASE_URL}/api/register`, {
        username,
        password,
      });
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className='container-fluid d-flex justify-content-center align-items-center mt-5'>
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Form onSubmit={handleRegister}>
          <h1 className='text-center'>
            <b>
              <i className="fa-solid fa-check"></i> TODO
            </b>
          </h1>
          <input 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className='form w-100 mt-5' 
            type='text' 
            placeholder='Username' 
          />
          <input 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className='form w-100 mt-4' 
            type='password' 
            placeholder='Password' 
          />
          <button type='submit' className='btn btn-dark mt-4 w-100'>Register Now</button>
          <p className='mt-3 text-center'>Already have an account?</p>
          
          <Link to='/' className='btn btn-success mt-1 w-100 text-center'>Go to Login</Link>
        </Form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default Register;
