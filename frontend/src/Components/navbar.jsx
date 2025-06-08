import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = ({setShowLogin}) => {
  const navigate=useNavigate();
  const [token,setToken]=useState(true);

  const sumbitBtn=()=>{
    setShowLogin(true);
  };

  return (

    <div className='flex items-center justify-between border-b-2 pb-3 bg-sky-200 md:px-20 lg:px-20  px-2 w-full text-sm border-b-gray-400'>

      <img src={assets.logo} alt="" className="w-28 lg:w-32 cursor-pointer" onClick={()=>navigate('/')}/>
      
      <ul className='flex items-start md:gap-8 lg:gap-8 gap-3  md:font-medium text-xs'>
        <NavLink to='/'><li className='text-base mt-5 md:block lg:block hidden'>Home</li><hr className='border-none outline-none h-0.5 bg-gray-400 m-auto hidden'/></NavLink>
        <NavLink to='/doctor'><li className='text-base mt-5' >Doctors</li><hr className='border-none outline-none h-0.5 bg-gray-400 m-auto hidden'/></NavLink>
        <NavLink to='/about'><li className='text-base mt-5 ' >About</li><hr className='border-none outline-none h-0.5 bg-gray-400 m-auto hidden'/></NavLink>
        <NavLink to='/contact'><li className='text-base mt-5 ' >Contact</li><hr className='border-none outline-none h-0.5 bg-gray-400 m-auto hidden'/></NavLink>
      </ul>

      <div className='flex items-center gap-4'>
        {
        token ? 
          <div className='flex items-center gap-2 group relative cursor-pointer mt-5'>
             <img src={assets.profile_pic} alt="" className='w-8 rounded-full'/>
             <img src={assets.dropdown_icon} alt="" className='w-2.5'/>

             <div className='absolute top-0 right-0 pt-14 text-base font-medium z-20 text-gray-600 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p className='cursor-pointer hover:text-black' onClick={()=>navigate("/profile")}>My Profile</p>
                <p className='cursor-pointer hover:text-black' onClick={()=>navigate("/myAppoimanet")}>My Appointments</p>
                <p className='cursor-pointer hover:text-black' onClick={()=>setToken(false)}>Logout</p>
              </div>
             </div>

            </div>

          : <button className='text-sm bg-blue-500 px-3 py-2 mt-5 rounded-full text-gray-100 font-semibold' onClick={sumbitBtn}>Create</button>
        }

      </div>

    </div>
    
    
  )
}

export default Navbar