import React from 'react'
import LoginPage from './Pages/login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Navbar } from 'react-bootstrap';


const App = () => {
  return (
    <div>
      <Navbar/>
        <LoginPage/>
        <ToastContainer />
    </div>
  )
}

export default App