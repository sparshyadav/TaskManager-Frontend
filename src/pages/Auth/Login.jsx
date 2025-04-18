import React, { useContext, useState } from 'react'
import Authlayout from '../../components/layouts/Authlayout'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { Link } from "react-router-dom";
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updatedUser} =useContext(UserContext); 

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please Enter a Valid Email Address");
      return;
    }

    if (!password) {
      setError("Please Enter the Password");
      return;
    }

    setError("");

    try{
      const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email, password
      });

      const {token, role}=response.data;

      if(token){
        localStorage.setItem("token", token);
        updatedUser(response.data);

        if(role==='admin'){
          navigate("/admin/dashboard");
        }
        else{
          navigate("/user/dashboard");
        }
      }
    }
    catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }
      else{
        setError("Something went Wrong. Please Try Again");
      }
    }
  }

  return (
    <Authlayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please Enter Your Details to Log In</p>
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className='text-red-500 text-sx pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>LOGIN</button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an Account? {" "}
            <Link className="font-medium text-primary underline" to='/signup'>
              SignUp
            </Link>
          </p>

        </form>
      </div>
    </Authlayout>
  )
}

export default Login
