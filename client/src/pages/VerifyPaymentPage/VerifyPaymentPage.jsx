import React, { useEffect, useState } from 'react';
import { LuReplace } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../CartContext/CartContext'; 
import axios from 'axios';

const VerifyPaymentPage = () => {
  const { clearCart } = useCart();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [statusMsg, setStatusMsg] = useState('Verifying Payment...');

  const token = localStorage.getItem('authToken');
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(search);
      const success = params.get('success');
      const session_id = params.get('session_id');

      if (success !== 'true' || !session_id) {
        if (success === 'false') {
          navigate('/checkout', { replace: true });
          return;
        }
        setStatusMsg('Payment failed but order placed for completion.');
        return;
      }

      try {
        await axios.get(backendUrl+'/orders/confirm', {
          params: { session_id },
          headers: authHeaders
        });
        clearCart();
        navigate('/myorder', { replace: true });
      } catch (err) {
        console.error('Confirmation error:', err);
        setStatusMsg('There was an error confirming the order.');
        clearCart();
      }
    };

    verifyPayment();
  }, [search, clearCart, navigate]);

  return (
    <div className='min-h-screen flex items-center justify-center text-white'>
      <p>{statusMsg}</p>
    </div>
  );
};

export default VerifyPaymentPage;