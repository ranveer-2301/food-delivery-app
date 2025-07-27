import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../../CartContext/CartContext';
import { FaPlus, FaRupeeSign, FaStar, FaHeart } from 'react-icons/fa';
import { HiPlus, HiMinus } from 'react-icons/hi';
import './OurHomeMenu.css';

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian', 'Desserts', 'Drinks'];

const OurHomeMenu = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
  const [menuData, setMenuData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(res => {
        const grouped = res.data.reduce((acc, item) => {
          acc[item.category] = acc[item.category] || [];
          acc[item.category].push(item);
          return acc;
        }, {});
        setMenuData(grouped);
      })
      .catch(console.error);
  }, []);

  // USE ID TO FIND AND UPADATE
  const getCartEntry = id => cartItems.find(ci => ci.item._id === id);
  const getQuantity = id => getCartEntry(id)?.quantity || 0;
  const displayItems = (menuData[activeCategory] || []).slice(0, 4);

  return (
    <div className="bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#362016] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200">
          <span className="font-dancingscript block text-5xl sm:text-6xl md:text-7xl mb-2">
            Our Exquisite Menu
          </span>
          <span className='block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-cinzel mt-4 text-amber-100/80'>
            A Symphony of Flavours
          </span>
        </h2>

        <div className='flex flex-wrap justify-center gap-4 mb-16'>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2 rounded-full border-2 transition-all duration-300 transform font-cinzel text-sm sm:text-lg tracking-widest backdrop-blur-sm
                ${activeCategory === cat ?
                  'bg-gradient-to-r from-amber-900/80 to-amber-700/80 border-amber-800 scale-105 shadow-amber-900/30'
                  : 'bg-amber-900/20 border-amber-800/30 text-amber-100/80 hover:bg-amber-800/40 hover:scale-95'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
          {displayItems.map((item) => {
            const qty = getQuantity(item._id);
            const cartEntry = getCartEntry(item._id);

            return (
              <div key={item._id} className='relative bg-amber-900/20 rounded-2xl overflow-hidden border border-amber-800/30 backdrop-blur-sm flex flex-col transition-all duration-500'>
                <div className='relative h-48 sm:h-56 md:h-60 flex items-center justify-center bg-black/10'>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className='max-h-full max-w-full object-contain transition-all duration-700'
                  />
                  <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90' />
                  <div className='absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full'>
                    <span className='flex items-center gap-2 text-amber-400'>
                      <FaStar className='text-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]' />
                      <span className='font-bold'>{item.rating}</span>
                    </span>
                    <span className='flex items-center gap-2 text-red-400'>
                      <FaHeart className='text-xl animate-heartbeat' />
                      <span className='font-bold'>{item.hearts}</span>
                    </span>
                  </div>
                </div>

                <div className='p-4 relative z-10'>
                  <h3 className='text-2xl font-dancingscript text-amber-300'>{item.name}</h3>
                  <p className='text-sm text-gray-300 mt-2'>{item.description}</p>
                  <div className='mt-3 text-lg font-bold text-white flex items-center gap-1'>
                    <FaRupeeSign /> {item.price}
                  </div>

                  {cartEntry ? (
                    <div className='flex items-center gap-3 mt-4'>
                      <button
                        onClick={() =>
                          qty > 1
                            ? updateQuantity(cartEntry._id, qty - 1)
                            : removeFromCart(cartEntry._id)
                        }
                        className='w-8 h-8 rounded-full bg-amber-900 flex items-center justify-center hover:bg-amber-800/50 transition-all duration-200 active:scale-95'
                      >
                        <HiMinus className='w-4 h-4 text-amber-100' />
                      </button>
                      <span className='w-8 text-center text-amber-100 font-cinzel'>
                        {qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(cartEntry._id, qty + 1)}
                        className='w-8 h-8 rounded-full bg-amber-900 flex items-center justify-center hover:bg-amber-800/50 transition-all duration-200 active:scale-95'
                      >
                        <HiPlus className='w-4 h-4 text-amber-100' />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        addToCart(item, 1)
                      }
                      className='relative mt-4 px-4 py-2 bg-amber-500 text-[#2D1B0E] font-semibold rounded-md hover:scale-105 transition-transform flex items-center gap-2'
                    >
                      <div className='absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300' />
                      <FaPlus className='text-lg relative z-10' />
                      <span className='relative z-10'>Add</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OurHomeMenu;