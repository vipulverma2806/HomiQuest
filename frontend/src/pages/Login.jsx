import React, { useContext, useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { authDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { userDataContext } from '../Context/UserContext';
import { toast } from 'react-toastify';

function Login() {
    let [show,setShow] = useState(false)
    let {serverUrl} = useContext(authDataContext)
    let {userData,setUserData} = useContext(userDataContext)
    let [email,setEmail]= useState("")
    let [password,setPassword]= useState("")
    let {loading,setLoading}= useContext(authDataContext)
    let navigate = useNavigate()
     const handleLogin = async (e) => {
        setLoading(true)
            try {
                e.preventDefault()
                let result = await axios.post(serverUrl + "/api/auth/login",{
                    email,
                    password
    
                },{withCredentials:true})
                setLoading(false)
                setUserData(result.data)
                navigate("/")
                console.log(result)
                 toast.success("Login Successfully")
            } catch (error) {
                setLoading(false)
                console.log(error)
                toast.error(error.response.data.message)

            }
            
        }
  return (
     <div className='w-[100vw] h-[100vh] flex items-center justify-center relative'>
        <div className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center' onClick={()=>navigate("/")}><FaArrowLeftLong className='w-[25px] h-[25px] text-[white]' /></div>
            <form action="" className='max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px]' onSubmit={handleLogin}>
                <h1 className='text-[30px] text-[black]'>Welcome to Airbnb</h1>
                <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
              <label htmlFor="email" className='text-[20px]'>Email</label>
              <input type="text" id='email' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
              </div> 
              <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] relative  '>
              <label htmlFor="password" className='text-[20px]' >Password</label>
              <input type={show?"text":"password"} id='password' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] ' required onChange={(e)=>setPassword(e.target.value)} value={password} />
              {!show && <IoMdEye className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer' onClick={()=>setShow(prev =>!prev)}/>}
              {show && <IoMdEyeOff className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer' onClick={()=>setShow(prev =>!prev)}/>}
              </div>
              <button className='px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg ' disabled={loading}>{loading?"Loading...":"Login"}</button>
              <p className='text-[18px]'>Create new account <span className='text-[19px] text-[red] cursor-pointer' onClick={()=>navigate("/SignUP")}>SignUp</span>
              </p>
            </form>
         
        </div>
  )
}

export default Login
