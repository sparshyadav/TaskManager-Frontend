import React, { useContext, useState } from 'react'
import Authlayout from '../../components/layouts/Authlayout'
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import Input from '../../components/Inputs/Input';
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';

function SignUp() {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState(null);

  const navigate=useNavigate();
  const {updatedUser}=useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl="";

    if (!fullName) {
      setError("Please Enter Full Name");
      return;
    }

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
      if(profilePic){
        const imageUploadRes=await uploadImage(profilePic);
        profileImageUrl=imageUploadRes.imageUrl || "";
      }
      const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        profileImageUrl,
        email, password, adminInviteToken
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
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='tex-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-sx text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below.</p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label='Full Name'
              placeholder="John"
              type='text'
            />
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
            <Input
              value={adminInviteToken}
              onChange={({ target }) => setAdminInviteToken(target.value)}
              label="Admin Invite Token"
              placeholder="6 Digit Code"
              type="text"
            />
          </div>

          {error && <p className='text-red-500 text-sx pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>SIGNUP</button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an Account? {" "}
            <Link className="font-medium text-primary underline" to='/login'>
              Login
            </Link>
          </p>

        </form>
      </div>
    </Authlayout>
  )
}

export default SignUp
