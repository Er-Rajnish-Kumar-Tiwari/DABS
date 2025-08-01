import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../Context/doctorContext';

const DoctorDashboard = () => {

  const {getDashboardData,dashBoardData, setDashBoardData,dtoken}=useContext(DoctorContext);

  useEffect(()=>{
    if(dtoken){
      getDashboardData();
    }
  },[dtoken]);

  return (
    <div>DoctorDashboard</div>
  )
}

export default DoctorDashboard;