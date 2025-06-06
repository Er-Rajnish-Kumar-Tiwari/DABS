import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/home'
import Doctor from './Pages/doctor'
import Appoimanet from './Pages/appoimanet'
import About from './Pages/about'
import Contact from './Pages/contact'
import Sign from './Pages/sign'
import Profile from './Pages/profile'
import MyAppoinment from './Pages/myAppoinment'
import Navbar from './Components/navbar'
import Footer from './Components/footer'

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
          <Route path='/doctor/:specility' element={<Doctor />} />
          <Route path='/appoimanet' element={<Appoimanet />} />
          <Route path='/appoimanet/:docId' element={<Appoimanet />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/sign' element={<Sign />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/myAppoimanet' element={<MyAppoinment />} />

        </Routes>
        <Footer/>
      </div>

    </>
  )
}

export default App