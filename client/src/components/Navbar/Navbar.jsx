import React, { useEffect, useState } from 'react';
import { GiChefToque, GiForkKnifeSpoon } from "react-icons/gi";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiBook,
  FiStar,
  FiPhone,
  FiShoppingCart,
  FiKey,
  FiLogOut,
  FiPackage,
} from 'react-icons/fi';
import { useCart } from '../../CartContext/CartContext';
import Login from '../Login/Login';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const [showLoginModel, setShowLoginModel] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('loginData'))
  );

  useEffect(() => {
    setShowLoginModel(location.pathname === '/login');
    setIsAuthenticated(Boolean(localStorage.getItem('loginData')));
  }, [location.pathname]);

  const handleLoginSuccess = () => {
    localStorage.setItem('loginData', JSON.stringify({ loggedIn: true }));
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setIsAuthenticated(false);
  };

  const renderDesktopAuthButton = () => {
    return isAuthenticated ? (
      <button
        onClick={handleLogout}
        className='px-3 lg:px-4 py-1.5 lg:py-2 bg-gradient-to-br from-amber-500 to-amber-700 text-[#2D1B0E] rounded-2xl font-bold hover:shadow-lg hover:shadow-amber-600/40 transition-all transform hover:scale-[1.02] border-2 border-amber-600/20 flex items-center space-x-2 shadow-md shadow-amber-900/20 text-sm'
      >
        <FiLogOut className='text-lg' />
        <span className='text-shadow'>Logout</span>
      </button>
    ) : (
      <button
        onClick={() => navigate('/login')}
        className='px-3 lg:px-4 py-1.5 lg:py-2 bg-gradient-to-br from-amber-500 to-amber-700 text-[#2D1B0E] rounded-2xl font-bold hover:shadow-lg hover:shadow-amber-600/40 transition-all transform hover:scale-[1.02] border-2 border-amber-600/20 flex items-center space-x-2 shadow-md shadow-amber-900/20 text-sm'
      >
        <FiKey className='text-lg' />
        <span className='text-shadow'>Login</span>
      </button>
    );
  };

  const renderMobileAuthButton = () => {
    return isAuthenticated ? (
      <button
        onClick={handleLogout}
        className='w-full px-4 py-3 bg-gradient-to-br from-amber-500 to-amber-700 text-[#2D1B0E] rounded-xl font-semibold flex items-center justify-center space-x-2 text-sm'
      >
        <FiLogOut />
        <span>Logout</span>
      </button>
    ) : (
      <button
        onClick={() => {
          navigate('/login');
          setIsOpen(false);
        }}
        className='w-full px-4 py-3 bg-gradient-to-br from-amber-500 to-amber-700 text-[#2D1B0E] rounded-xl font-semibold flex items-center justify-center space-x-2 text-sm'
      >
        <FiKey />
        <span>Login</span>
      </button>
    );
  };

  const navLinks = [
    { name: 'Home', to: '/', icon: <FiHome /> },
    { name: 'Menu', to: '/menu', icon: <FiBook /> },
    { name: 'About', to: '/about', icon: <FiStar /> },
    { name: 'Contact', to: '/contact', icon: <FiPhone /> },
    ...(isAuthenticated ? [
      {name: 'MyOrders', to:'/myorder', icon: <FiPackage />}
    ] : [])
  ];

  return (
    <nav className='overflow-x-auto bg-[#2D1B0E] border-b-8 border-amber-900/30 shadow-amber-900/30 sticky top-0 z-50 shadow-[0_25px_50px_-12px] font-vibes'>
      <div className='absolute -top-3 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4'>
        <div className='h-[6px] bg-gradient-to-r from-transparent via-amber-600/50 to-transparent shadow-[0_0_20px] shadow-amber-500/30'>
          <div className='flex justify-between px-6'>
            <GiForkKnifeSpoon className='text-amber-500/40 -mt-4 -ml-2 rotate-45' size={32} />
            <GiForkKnifeSpoon className='text-amber-500/40 -mt-4 -mr-2 -rotate-45' size={32} />
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 relative'>
        <div className='flex justify-between items-center h-16 md:h-20 lg:h-24'>
          <div className='flex items-center space-x-2'>
            <GiChefToque className='text-3xl md:text-4xl lg:text-5xl text-amber-500 transition-all hover:rotate-12 hover:text-amber-400 hover:drop-shadow-[0_0_15px] hover:drop-shadow-amber-500/50' />
            <div className='ml-2'>
              <NavLink
                to='/'
                className='text-xl md:text-2xl lg:text-4xl bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent font-monsieur tracking-wider'
              >
                Ridhima Gifts & 
                Shiristi Sweets
              </NavLink>
              <div className='h-[3px] bg-gradient-to-r from-amber-600/30 via-amber-400/50 to-amber-600/30 w-full mt-1 shadow-[0_2px_5px] shadow-amber-500/20'></div>
            </div>
          </div>

          <div className='hidden md:flex items-center space-x-4'>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `group px-4 py-2 text-sm md:text-base flex items-center gap-2 rounded-3xl transition-all duration-300 border-2 ${
                    isActive
                      ? 'border-amber-600/50 bg-amber-900/20 shadow-inner shadow-amber-500/20'
                      : 'border-amber-900/30 hover:border-amber-600/50'
                  }`
                }
              >
                <span className='text-amber-500 group-hover:text-amber-300'>{link.icon}</span>
                <span className='text-amber-100 group-hover:text-amber-300 relative'>
                  {link.name}
                  <span className='absolute -bottom-1 left-0 w-0 h-[2px] bg-amber-400 transition-all group-hover:w-full' />
                </span>
              </NavLink>
            ))}
            <NavLink to='/cart' className='relative p-2 border-2 border-amber-900/30 hover:border-amber-600/50 text-amber-100 hover:bg-amber-900/20 shadow-md hover:shadow-lg hover:shadow-amber-500/30 rounded-xl'>
              <FiShoppingCart className='text-lg' />
              {totalItems > 0 && (
                <span className='absolute -top-2 -right-2 bg-amber-600 text-amber-100 text-xs w-5 rounded-full flex items-center justify-center'>
                  {totalItems}
                </span>
              )}
            </NavLink>
            {renderDesktopAuthButton()}
          </div>

          <div className='md:hidden flex items-center'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-amber-500 hover:text-amber-300 p-2 border-2 border-amber-900/30 hover:border-amber-600/50 rounded-xl shadow-md hover:shadow-lg hover:shadow-amber-500/30'
            >
              <div className='space-y-2'>
                <span className={`block w-6 h-[2px] bg-current transition-all ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block w-6 h-[2px] bg-current ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-[2px] bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className='md:hidden bg-[#2D1B0E] border-t-4 border-amber-900/40 shadow-lg shadow-amber-900/30 w-full'>
          <div className='px-4 py-4 space-y-2'>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 text-sm rounded-xl border-2 ${
                    isActive
                      ? 'bg-amber-600/30 text-amber-400 border-amber-600/50'
                      : 'text-amber-100 border-amber-900/30 hover:bg-amber-600/20'
                  }`
                }
              >
                <span className='mr-3 text-amber-500'>{link.icon}</span>
                {link.name}
              </NavLink>
            ))}
            <div className='pt-4 border-t-2 border-amber-900/30 space-y-2'>
              <NavLink to='/cart' onClick={() => setIsOpen(false)} className='flex items-center justify-center gap-2 text-sm text-amber-100 border-2 border-amber-900/30 hover:border-amber-500/50 px-4 py-3 rounded-xl'>
                <FiShoppingCart className='text-lg' />
                Cart {totalItems > 0 && (
                  <span className='bg-amber-600 text-amber-100 text-xs w-5 rounded-full flex items-center justify-center'>
                    {totalItems}
                  </span>
                )}
              </NavLink>
              {renderMobileAuthButton()}
            </div>
          </div>
        </div>
      )}

      {showLoginModel && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4'>
          <div className='bg-gradient-to-br from-[#2D1B0E] to-[#4a372a] rounded-xl p-6 w-full max-w-[480px] border-4 border-amber-700/30 shadow-[0_0_30px] shadow-amber-500/30 relative'>
            <button onClick={() => navigate('/')} className='absolute top-2 right-2 text-amber-500 hover:text-amber-300 text-2xl'>
              &times;
            </button>
            <h2 className='text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-4 text-center'>
              Ridhima Gifts & Shiristi Sweets
            </h2>
            <Login onLoginSuccess={handleLoginSuccess} onClose={() => navigate('/')} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;