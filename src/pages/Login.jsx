import React, { useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';


function Login() {
  const [username,setUsername]=useState('');
  const[password,setPassword]=useState('');
  const{dispatch}=useStateContext();
  // console.log(username,password);

  const handleLogin = async () => {
    let result = await fetch("http://localhost:5000/api/admin/login", {
        method: 'post',
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    }); 
    result = await result.json();
    console.warn(result.message)
    console.warn(result.token)
    if (result.token) {
        // localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', JSON.stringify(result.token));
        dispatch({ type: 'LOGIN_SUCCESS' });
    } else {
        alert("Please enter connect details")
    }
}
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image" />
      </div>
      <div className="md:w-1/3 max-w-sm">
        
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Login Admin</p>
        </div>
        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
         type="text"
         placeholder="Username"
         value={username}
         onChange={(e)=>setUsername(e.target.value)}
          />
        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
         type="password" 
         placeholder="Password"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
          />
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a>
        </div>
        <div className="text-center md:text-left">
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit"
          onClick={handleLogin}
          >Login</button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Do not have an account? <a className="text-red-600 hover:underline hover:underline-offset-4" href="#">Register</a>
        </div>
      </div>
    </section>
  );
}

export default Login;