import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../Context/doctorContext';

const DoctorProfile = () => {

  const {profileData,dtoken,getProfile,setProfileData}=useContext(DoctorContext);

  useEffect(()=>{
    if(dtoken){
      getProfile();
    }
  },[dtoken]);

  return profileData && (
    <div>DoctorProfile</div>
  )
}

export default DoctorProfile;