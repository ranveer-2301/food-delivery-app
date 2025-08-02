import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import Menu from './pages/Menu/Menu.jsx';
import Cart from './pages/Cart/Cart.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage.jsx';
import MyOrderPage from './pages/MyOrderPage/MyOrderPage.jsx';
import VerifyPaymentPage from './pages/VerifyPaymentPage/VerifyPaymentPage.jsx'

const App = () => {
  <div></div>
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/menu' element={<Menu />} />

      <Route path='/login' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />

      {/* PAYMENT VERIFICATION */}
      <Route path='/myorder/verify' element={< VerifyPaymentPage />} />

      <Route path='/cart' element={
        <PrivateRoute>
          <Cart /> 
        </PrivateRoute> } />
        <Route path='/checkout' element={ <PrivateRoute><CheckoutPage /></PrivateRoute> } />
        <Route path='/myorder' element={ <PrivateRoute><MyOrderPage /></PrivateRoute> } />
    </Routes>
  )
}

export default App