import React from 'react'
import Navbar from './components/Navbar'
import Lists from './components/Lists'
import Order from './components/Order'
import { Routes, Route } from 'react-router-dom';
import AddItems from './components/AddItems';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar /> 
      <Routes>
        <Route path='/' element={<AddItems />} />
        <Route path='/List' element={<Lists />} />
        <Route path='/orders' element={<Order />} />
      </Routes>
    </>
  )
}

export default App