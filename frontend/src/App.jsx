import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/home'
import Doctor from './Pages/doctor'
import Appoimanet from './Pages/appoimanet'
import About from './Pages/about'
import Contact from './Pages/contact'
import Sign from './Pages/sign'
import MyAppoinment from './Pages/myAppoinment'
import Navbar from './Components/navbar'
import Footer from './Components/footer'
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer } from "react-toastify";
import Profile from './Pages/profile'

const App = () => {
  const [ShowLogin, setShowLogin] = useState(false);

  return (

    <>
    <Navbar setShowLogin={setShowLogin}/>
    {ShowLogin ? <Sign setShowLogin={setShowLogin} ShowLogin={ShowLogin}/> : <></>}
      <div className='mx-4 sm:max-[10%]'>

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/doctor' element={<Doctor />} />
          <Route path='/doctor/:speciality' element={<Doctor />} />
          <Route path='/appoimanet' element={<Appoimanet />} />
          <Route path='/appoimanet/:docId' element={<Appoimanet setShowLogin={setShowLogin}/>} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/sign' element={<Sign />} />
          <Route path='/myAppoimanet' element={<MyAppoinment />} />
          <Route path='/profile' element={<Profile />} />

        </Routes>
        <Footer/>
        <ToastContainer/>
      </div>

    </>
  )
}

export default App