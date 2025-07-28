import React, { useEffect, useState } from 'react';
// import { cardData, additionalData } from '../../assets/drive-download-20250620T152333Z-1-001/dummydata';
import { useCart } from '../../CartContext/CartContext';
import { FaStar, FaHeart, FaRupeeSign, FaPlus, FaFire } from 'react-icons/fa';
import { HiMinus, HiPlus } from 'react-icons/hi';
import FloatingParticle from '../FloatingParticle/FloatingParticle';
import axios from 'axios';

const SpecialOffer = () => {
  const [showAll, setShowAll] = useState(false);
  // const initialData = [...cardData, ...additionalData];
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
  const [initialData, setInitialData] = useState([]);
  // const[Quantity, setQuantity] = useState(null)

  const fetchMenus = async() => {
      try {
        const res = await axios.get("http://localhost:5000/api/items");
        console.log("res", res);
        setInitialData(res.data)
      } catch (error) {
       console.log("error", error) 
      }
    }
    
    useEffect(() => {
      fetchMenus();
    }, [])


  return (
    <div className='bg-gradient-to-b from-[#1a1212] to-[#2a1e1e] text-white py-16 px-4 font-[Poppins] relative overflow-hidden'>
      <div className='max-w-7xl mx-auto'>
        {/* HEADER */}
        <div className='text-center mb-14'>
          <h1 className='text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent font-[Playfair_Display] italic'>
            Today's <span className='text-stroke-gold'>Special</span> Offers
          </h1>
          <p className='text-lg text-gray-300 max-w-3xl mx-auto tracking-wide leading-relaxed'>
            Savor the extraordinary with our culinary masterpieces crafted to perfection.
          </p>
        </div>

        {/* PRODUCT CARDS */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {(showAll ? initialData : initialData.slice(0, 4)).map((item, index) => {
            const cartItem = cartItems.find(ci => ci.item._id === item._id);
            const quantity = cartItem ? cartItem.quantity : 0;
            // setQuantity(quantity);
            console.log("cartItem", cartItem)
            return (
              <div
                key={`${item.id}-${index}`}
                className='relative group bg-[#4b3b3b] rounded-3xl overflow-hidden shadow-2xl transform hover:-translate-y-4 transition-all duration-500 hover:shadow-red-900/40 border-2 border-transparent hover:border-amber-500/20'
              >
                {/* IMAGE */}
                <div className='relative h-72 overflow-hidden'>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className='w-full h-full object-cover brightness-90 group-hover:brightness-110 transition-all duration-500'
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

                {/* CONTENT */}
                <div className='p-4 relative z-10'>
                  <h3 className='text-xl font-semibold text-amber-300'>{item.title}</h3>
                  <p className='text-sm text-gray-300 mt-2'>{item.description}</p>
                  <div className='mt-3 text-lg font-bold text-white flex items-center gap-1'>
                    <FaRupeeSign /> {item.price}
                  </div>

                  {cartItem ? (
                    <div className='flex items-center gap-3 mt-4'>
                      <button
                        onClick={() => quantity > 1 ? updateQuantity(item._id, quantity - 1) : removeFromCart(item._id)}
                        className='w-8 h-8 rounded-full  bg-amber-900 flex items-center justify-center hover:bg-amber-800/50 transition-all duration-200 active:scale-95'
                      >
                        <HiMinus 
                         
                        className='w-4 h-4 text-amber-100' />
                      </button>
                      <span className='w-8 text-center text-amber-100 font-cinzel'>
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, quantity + 1)}
                        className='w-8 h-8 rounded-full bg-amber-900 flex items-center justify-center hover:bg-amber-800/50 transition-all duration-200 active:scale-95'
                      >
                        <HiPlus className='w-4 h-4 text-amber-100' />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item, 1)}
                      className='relative mt-4 px-4 py-2 bg-amber-500 text-[#2D1B0E] font-semibold rounded-md hover:scale-105 transition-transform flex items-center gap-2'
                    >
                      <div className='absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300' />
                      <FaPlus className='text-lg relative z-10' />
                      <span className='relative z-10'>Add</span>
                    </button>
                  )}
                </div>

                {/* Border and Particle Overlay */}
                <div className='absolute inset-0 rounded-3xl pointer-events-none border-2 border-transparent group-hover:border-amber-500/30 transition-all duration-500' />
                <div className='absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none'>
                  <FloatingParticle />
                </div>
              </div>
            );
          })}
        </div>

        {/* TOGGLE BUTTON */}
        <div className='mt-12 flex justify-center'>
          <button
            onClick={() => setShowAll(prev => !prev)}
            className='relative flex items-center gap-3 bg-gradient-to-r from-red-700 to-amber-700
                      text-white px-8 py-4 rounded-2xl font-bold text-lg uppercase tracking-wider
                      hover:gap-4 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20
                      transition-all duration-300 group border-2 border-amber-400 overflow-hidden'>
            
            <div className='absolute inset-0 bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/10 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
            <FaFire className='text-xl animate-pulse relative z-10' />
            <span className='relative z-10'>
              {showAll ? 'Show Less' : 'Show More'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;