import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../Context/appContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {

  const [isEdit, setIsEdit] = useState(false);
  const {profileData,setProfileData,getProfile,token}=useContext(AppContext);
  const [image,setImage]=useState(false);

  const updateUserData=async()=>{

    try {
      const formData=new FormData();
      formData.append("name",profileData.name);
      formData.append("phone",profileData.phone);
      formData.append("dob",profileData.dob);
      formData.append("gender",profileData.gender);
      formData.append("address",JSON.stringify(profileData.address));
      image && formData.append("image",image); // if we have image then change otherwise not change

      const response=await axios.post("https://dabs-backend.onrender.com/updataProfile",formData,{headers: { Authorization: `Bearer ${token}`}});
      if(response.data.Messege=="Profile updated successfully."){
        setIsEdit(false);
        await getProfile();
        setImage(false);
        toast.success("Profile updated successfully!");
      }
      else{
        toast.error(response.data.Messege);
      }
    } 
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  };

  return profileData &&(

    <div className='flex flex-col gap-3 max-w-lg text-sm m-10'>

      { isEdit 
        ? <label htmlFor="image">
          <div>
            <img src={image ? URL.createObjectURL(image) : profileData.image} alt="" className='w-36 rounded'/>
          </div>
          <input type="file" id="image" hidden onChange={(e)=>setImage(e.target.files[0])}/>
        </label>
        : <img src={profileData.image} alt="" className='w-36 rounded'/>
      }

      {
        isEdit ? <input type='text' value={profileData.name} onChange={e => setProfileData(pre => ({ ...pre, name: e.target.value }))} className='bg-gray-300 text-3xl font-medium max-w-80 mt-2 p-1 rounded'/> : <p className='text-3xl font-medium text-gray-900 mt-2'>{profileData.name}</p>
      }
      <hr className='h-[1px] bg-zinc-800 border-none' />

      <div>
        <p className='text-neutral-500 underline font-bold'>CONTACT INFORMATION</p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-900'>

          <p className='font-medium'>Email : </p>
          <p className='text-blue-500'>{profileData.email}</p>

          <p className='font-medium'>Phone : </p>
          {isEdit ? <input type="text" value={profileData.phone} onChange={e => setProfileData(pre => ({ ...pre, phone: e.target.value }))} className='bg-gray-300 max-w-52 p-1 rounded'/> : <p className='text-blue-500'>{profileData.phone}</p>}

          <p className='font-medium'>Address : </p>
          {isEdit
            ? <p>
              <input type="text" value={profileData.address.line1} onChange={e => setProfileData(pre => ({ ...pre, address: { ...pre.address, line1: e.target.value } }))} className='bg-gray-300 max-w-52 p-1 rounded'/>
            </p> :
            <p>
              {profileData.address.line1}
            </p>
          }

        </div>

      </div>

      <div>
        <p className='text-neutral-500 underline font-bold'>BASIC INFORMATION</p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-900'>
          
          <p className='font-medium'>Gender : </p>
          {isEdit ? <select value={profileData.gender} onChange={e => setProfileData(pre => ({ ...pre, gender: e.target.value }))}  className='bg-gray-300 max-w-52 p-1 rounded'>
            <option value="Male"> Male </option>
            <option className='Female'>Female</option>
          </select> :
            <p>{profileData.gender}</p>}

          <p className='font-medium'>Birthday : </p>
          {isEdit ? <input type="date" value={profileData.dob} onChange={e => setProfileData(pre => ({ ...pre, dob: e.target.value }))}  className='bg-gray-300 max-w-52 p-1 rounded'/> : <p>{profileData.dob}</p>}

        </div>

      </div>

      <div className='mt-5'>
        { isEdit? <button onClick={updateUserData} className='px-8 border border-blue-500 block py-2 rounded-lg max-w-60 text-center  outline-none bg-indigo-200 hover:bg-indigo-500'>Save information</button> :
        <button onClick={()=>setIsEdit(true)} className='px-8 border border-blue-500 block py-1 rounded-lg max-w-28 text-center  outline-none bg-indigo-200 hover:bg-indigo-500 hover:scale-110 transition-all '>Edit</button> }
      </div>

    </div>

  )
}

export default Profile