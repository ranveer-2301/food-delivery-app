import React, { useEffect, useState } from 'react';
import { layoutClasses, tableClasses } from '../assets/dummyadmin';
import axios from 'axios';
import { FiUser, FiBox, FiClock, FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';

const iconMap = {
  pending: <FiClock />,
  paid: <FiCheckCircle />,
  failed: <FiXCircle />,
  processing: <FiLoader />,
  delivered: <FiCheckCircle />,
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const paymentMethodDetails = {
    cod: { label: 'Cash on Delivery', class: 'bg-yellow-500 text-black' },
    card: { label: 'Card Payment', class: 'bg-green-500 text-white' },
    default: { label: 'Unknown', class: 'bg-gray-400 text-white' },
  };

  const statusStyles = {
    pending: {
      label: 'Pending',
      color: 'text-yellow-400',
      bg: 'bg-yellow-100',
      icon: 'pending',
    },
    paid: {
      label: 'Paid',
      color: 'text-green-500',
      bg: 'bg-green-100',
      icon: 'paid',
    },
    failed: {
      label: 'Failed',
      color: 'text-red-500',
      bg: 'bg-red-100',
      icon: 'failed',
    },
    processing: {
      label: 'Processing',
      color: 'text-blue-500',
      bg: 'bg-blue-100',
      icon: 'processing',
    },
    delivered: {
      label: 'Delivered',
      color: 'text-green-700',
      bg: 'bg-green-200',
      icon: 'delivered',
    },
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/getall', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        });

        const formatted = response.data.map(order => ({
          ...order,
          address: order.address ?? order.shippingAddress?.address ?? '',
          city: order.city ?? order.shippingAddress?.city ?? '',
          zipCode: order.zipCode ?? order.shippingAddress?.zipCode ?? '',
          phone: order.phone ?? '',
          items: order.items?.map(e => ({
            _id: e._id,
            item: e.item,
            quantity: e.quantity,
          })) || [],
          createdAt: new Date(order.createdAt).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        }));

        setOrders(formatted);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/getall/${orderId}`, { status: newStatus });
      setOrders(prev =>
        prev.map(o => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status');
    }
  };

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className={layoutClasses.page}>
      <div className="mx-auto max-w-7xl">
        <div className={layoutClasses.card}>
          <h2 className={layoutClasses.heading}>Order Management</h2>
          <div className={tableClasses.wrapper}>
            <table className={tableClasses.table}>
              <thead className={tableClasses.headerRow}>
                <tr>
                  {['Order ID', 'Customer', 'Address', 'Items', 'Total Items', 'Price', 'Payment', 'Status'].map(h => (
                    <th key={h} className={tableClasses.headerCell}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  const totalItems = order.items.reduce((s, i) => s + i.quantity, 0);
                  const totalPrice = order.total ?? order.items.reduce((s, i) => s + i.item.price * i.quantity, 0);
                  const payMethod = paymentMethodDetails[order.paymentMethod?.toLowerCase()] || paymentMethodDetails.default;
                  const payStatusStyle = statusStyles[order.paymentStatus] || statusStyles.processing;
                  const orderStatusStyle = statusStyles[order.status] || statusStyles.processing;

                  return (
                    <tr key={order._id} className={tableClasses.row}>
                      <td className={`${tableClasses.cellBase} font-mono text-sm text-amber-100`}>
                        #{order._id.slice(-8)}
                      </td>

                      <td className={tableClasses.cellBase}>
                        <div className="flex items-center gap-2">
                          <FiUser className="text-amber-400" />
                          {/* USER DATA INFO */}
                          <div>
                            <p className="text-amber-100">
                              {order.user?.name || order.firstName + ' ' + order.lastName}
                            </p>
                            <p className="text-sm text-amber-400/60">
                              {order.user?.phone || order.phone}
                            </p>
                            <p className="text-amber-100">
                              {order.user?.email || order.email}
                            </p>
                          </div>
                        </div>
                      </td>
                    {/* Address Section */}
                      <td className={tableClasses.cellBase}>
                        <div className="text-amber-100/80 text-sm max-w-[200px]">
                          {order.address}, {order.city} - {order.zipCode}
                        </div>
                      </td>

                      <td className={tableClasses.cellBase}>
                        <div className="space-y-1 max-h-52 overflow-auto">
                          {order.items.map((itm, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-2 rounded-lg">
                              <img
                                src={`${itm.item.imageUrl}`}
                                alt={itm.item.name}
                                className="w-10 h-10 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <span className="text-amber-100/80 text-sm block truncate">
                                  {itm.item.name}
                                </span>
                                <div className="flex items-center gap-2 text-xs text-amber-400/60">
                                  <span>•</span>
                                  <span>X{itm.quantity}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className={`${tableClasses.cellBase} text-center`}>
                        <div className="flex items-center justify-center gap-1">
                          <FiBox className="text-amber-400" />
                          <span className="text-amber-300 text-lg">{totalItems}</span>
                        </div>
                      </td>

                      <td className={`${tableClasses.cellBase} text-amber-300 text-lg`}>
                        ₹{totalPrice.toFixed(2)}
                      </td>

                      <td className={tableClasses.cellBase}>
                        <div className="flex flex-col gap-2">
                          <div className={`${payMethod.class} px-3 py-1.5 rounded-lg border text-sm`}>
                            {payMethod.label}
                          </div>
                          <div className={`flex items-center gap-2 text-sm ${payStatusStyle.color}`}>
                            {iconMap[payStatusStyle.icon]}
                            <span>{payStatusStyle.label}</span>
                          </div>
                        </div>
                      </td>

                      <td className={tableClasses.cellBase}>
                        <div className="flex items-center gap-2">
                          <span className={`${orderStatusStyle.color} text-xl`}>
                            {iconMap[orderStatusStyle.icon]}
                          </span>
                          <select
                            value={order.status}
                            onChange={e => handleStatusChange(order._id, e.target.value)}
                            className={`px-4 py-2 rounded-lg ${orderStatusStyle.bg} ${orderStatusStyle.color} border border-amber-500/20 text-sm cursor-pointer`}
                          >
                            {Object.entries(statusStyles).map(([key, sty]) => (
                              <option value={key} key={key}>
                                {sty.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-12 text-amber-100/60 text-xl">No orders found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;