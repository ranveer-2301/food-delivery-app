import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import Menu from './pages/Menu/Menu.jsx';
import Cart from './pages/Cart/Cart.jsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Home />} />
    </Routes>
  )
}

export default App