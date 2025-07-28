import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useCart } from '../../CartContext/CartContext';
import { FaTrash, FaTimes } from 'react-icons/fa';


const CartPage = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="min-h-screen overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1a120b] to-[#3e2b1d]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 animate-fade-in-down">
          <span className="font-dancingscript block text-5xl sm:text-6xl md:text-7xl mb-2 bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent">
            Your Cart
          </span>
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center animate-fade-in">
            <p className="text-amber-100/80 text-xl mb-4">Your cart is empty</p>
            <Link
              to="/menu"
              className="transition-all duration-300 text-amber-100 inline-flex items-center gap-2 hover:gap-3 hover:bg-amber-800/58 bg-amber-900/40 px-6 py-2 rounded-full font-cinzel uppercase"
            >
              Browse All Items
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cartItems.map((item) => {
                console.log("item", item)
                return(
                <div
                  key={item._id} // Use cart item ID
                  className="group bg-amber-900/20 p-4 rounded-2xl border-4 border-dashed border-amber-500/30 backdrop-blur-sm flex flex-col items-center gap-4 transition-all duration-300 hover:border-solid hover:shadow-xl hover:shadow-amber-900/10 transform hover:-translate-y-1 animate-fade-in"
                >
                  <div
                    className="w-24 h-24 cursor-pointer relative overflow-hidden rounded-lg transition-transform duration-300"
                    onClick={() => setSelectedImage(item.item.imageUrl)} // nested
                  >
                    <img
                      src={item.item.imageUrl}
                      alt={item.item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="w-full text-center">
                    <h3 className="text-xl font-dancingscript text-amber-100">
                      {item.item.name}
                    </h3>
                    <p className="text-amber-100/80 font-cinzel mt-1">
                      ₹{item.item.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        item.quantity > 1 && updateQuantity(item.item._id, item.quantity - 1) 
                      }
                      className="px-3 py-1 bg-amber-800 text-white rounded hover:bg-amber-700"
                    >
                      −
                    </button>
                    <span className="text-lg font-semibold text-amber-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.item._id, item.quantity + 1)}
                      className="px-3 py-1 bg-amber-800 text-white rounded hover:bg-amber-700"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center justify-between w-full mt-4">
                    <button
                      onClick={() => removeFromCart(item.item._id)} // Use cart item ID
                      className="bg-amber-900/40 px-3 py-1 rounded-full font-cinzel text-xs uppercase transition-all duration-300 hover:bg-amber-800/50 flex items-center gap-1 active:scale-95"
                    >
                      <FaTrash className="w-4 h-4 text-amber-100" />
                      <span className="text-amber-100">Remove</span>
                    </button>
                    <p className="text-sm font-dancingscript text-amber-300">
                      ₹{item.item.price * item.quantity}
                    </p>
                  </div>
                </div>
                )
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-amber-800/30 animate-fade-in-up">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
                <Link
                  to="/menu"
                  className="bg-amber-900/40 px-8 py-3 rounded-full font-cinzel uppercase tracking-wider hover:bg-amber-800/50 transition-all duration-300 text-amber-100 inline-flex items-center gap-2 hover:gap-3 active:scale-95"
                >
                  Continue Shopping
                </Link>

                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-dancingscript text-amber-100">
                    Total: ₹{cartTotal}
                  </h2>
                  <Link to='/checkout' className="bg-amber-900/40 px-8 py-3 rounded-full font-cinzel uppercase tracking-wider hover:bg-amber-800/50 transition-all duration-300 text-amber-100 flex items-center gap-2 hover:gap-3 active:scale-95">
                    Checkout Now
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal for Image Preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full View"
              className="max-w-[90vw] max-h-[90vh] rounded-lg object-contain"
            />
            <Link
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-amber-900/80 text-white p-2 rounded-full hover:bg-amber-800 active:scale-90 transition duration-200"
            >
              <FaTimes className="w-6 h-6" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;