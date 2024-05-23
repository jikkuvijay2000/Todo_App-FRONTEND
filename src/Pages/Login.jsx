import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useCookies} from 'react-cookie'

import { BASE_URL } from '../services/baseurl';
import { Bounce, ToastContainer, toast } from 'react-toastify';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookies,setCookies] = useCookies(["access_token"])
  const navigate = useNavigate();

  const handleRegister = async (e)=>
    {
      e.preventDefault();

      if(!username||!password)
        {
          toast.error("Try typing something!")
          return;
        }
      try
      {
        const response = await axios.post(`${BASE_URL}/api/login`,{
          username,
          password
        })

        setCookies("access_token",response.data.token);
        window.localStorage.setItem("userID",response.data.userID)
        toast.success(`Oh hey ${username} 🎉,How are you today?`)

        setTimeout(()=>
        {navigate('/home')          
        },2000);

      }catch(err)
      {
          console.log(err);
          toast.error("Have you registered?If not try registering as our member✨")
          setTimeout(()=>
            {navigate('/register')          
            },2000);
      }
    }

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
            className='form w-100 mt-5'
            type='text'
            placeholder='Username'
            value={username} 
            onChange={(e) => setUsername(e.target.value)}  />

          <input 
            className='form w-100 mt-4' 
            type='password' 
            placeholder='Password'
            value={password} 
            onChange={(e) => setPassword(e.target.value)}  />
          <button type='submit' className='btn btn-success  mt-4 w-100'>Log in</button>
          <p className='mt-3 text-center'>Don't have an account?</p>
          <Link to={'/register'} style={{textDecoration:'none' ,textAlign:"center"}} className=' btn btn-dark mt-1 w-100'>Register Now</Link>
        </Form>
      </div>  
      <ToastContainer
        position="top-center"
        autoClose={1000}
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

export default Login;
