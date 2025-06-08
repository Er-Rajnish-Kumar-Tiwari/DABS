import React, { useState } from 'react'
import { assets } from '../assets/assets';

const Profile = () => {

  const [userData, setUserData] = useState({

    "Name": "Rajnish Kumar Tiwari",
    "Email": "tanish281202@gmail.com",
    "Phone": "+91-95729-73654",
    "Image": assets.profile_pic,

    "Address": {
      "line1": "Maricha Saran"
    },

    "Gender": "Male",
    "Birthday": "20-05-2006"

  });

  const [isEdit, setIsEdit] = useState(false);


  return (

    <div className='flex flex-col gap-3 max-w-lg text-sm m-10'>

      <img src={userData.Image} alt="" className='w-36 rounded'/>

      {
        isEdit ? <input type='text' value={userData.Name} onChange={e => setUserData(pre => ({ ...pre, Name: e.target.value }))} className='bg-gray-300 text-3xl font-medium max-w-80 mt-2 p-1 rounded'/> : <p className='text-3xl font-medium text-gray-900 mt-2'>{userData.Name}</p>
      }
      <hr className='h-[1px] bg-zinc-800 border-none' />

      <div>
        <p className='text-neutral-500 underline font-bold'>CONTACT INFORMATION</p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-900'>

          <p className='font-medium'>Email : </p>
          <p className='text-blue-500'>{userData.Email}</p>

          <p className='font-medium'>Phone : </p>
          {isEdit ? <input type="text" value={userData.Phone} onChange={e => setUserData(pre => ({ ...pre, Phone: e.target.value }))} className='bg-gray-300 max-w-52 p-1 rounded'/> : <p className='text-blue-500'>{userData.Phone}</p>}

          <p className='font-medium'>Address : </p>
          {isEdit
            ? <p>
              <input type="text" value={userData.Address.line1} onChange={e => setUserData(pre => ({ ...pre, Address: { ...pre.Address, line1: e.target.value } }))} className='bg-gray-300 max-w-52 p-1 rounded'/>
            </p> :
            <p>
              {userData.Address.line1}
            </p>
          }

        </div>

      </div>

      <div>
        <p className='text-neutral-500 underline font-bold'>BASIC INFORMATION</p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-900'>
          
          <p className='font-medium'>Gender : </p>
          {isEdit ? <select value={userData.Gender} onChange={e => setUserData(pre => ({ ...pre, Gender: e.target.value }))}  className='bg-gray-300 max-w-52 p-1 rounded'>
            <option value="Male"> Male </option>
            <option className='Female'>Female</option>
          </select> :
            <p>{userData.Gender}</p>}

          <p className='font-medium'>Birthday : </p>
          {isEdit ? <input type="date" value={userData.Birthday} onChange={e => setUserData(pre => ({ ...pre, Birthday: e.target.value }))}  className='bg-gray-300 max-w-52 p-1 rounded'/> : <p>{userData.Birthday}</p>}

        </div>

      </div>

      <div className='mt-5'>
        { isEdit? <button onClick={()=>setIsEdit(false)} className='px-8 border border-blue-500 block py-2 rounded-lg max-w-60 text-center  outline-none bg-indigo-200 hover:bg-indigo-500'>Save information</button> :
        <button onClick={()=>setIsEdit(true)} className='px-8 border border-blue-500 block py-1 rounded-lg max-w-28 text-center  outline-none bg-indigo-200 hover:bg-indigo-500 hover:scale-110 transition-all '>Edit</button> }
      </div>

    </div>

  )
}

export default Profile