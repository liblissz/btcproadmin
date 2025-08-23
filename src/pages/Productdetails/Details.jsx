

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { confirmOrder, downloadReceipt } from './api';
import './order.css';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState('');


  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://btcbackend-e7yt.onrender.com/allorders/${id}`);
        setOrder(response.data);
        setPin(response.data.confirmationPin || '');
      } catch (error) {
        console.error('Error fetching order:', error);
        toast.error(error.response?.data?.message || 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  // Confirm and download receipt
  const validatePin = async (e) => {
    e.preventDefault();
    if (!order?._id) return toast.error("No order found.");

    setLoading(true);
    try {
      // Step 1: Confirm
      const { data: confirmData } = await confirmOrder(id, pin);
      toast.success(confirmData.message);

      // Step 2: Download receipt
      const res = await downloadReceipt(id);
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error confirming pin or downloading receipt:", err);
      toast.error(err.response?.data?.message || "Failed to confirm order or download receipt");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !order) return <p>Loading order details…</p>;
  if (!order) return <p>No order found.</p>;

  return (
    <div className="body">
      <div className="heder">
         <div className="seperate">
          <p><strong>Customer Name:</strong> {order.customer.name}</p>
          <p><strong>Address:</strong> {order.customer.address}</p>
        </div>
        <div className="seperate">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Number:</strong> {order.customer.number}</p>
         
        </div>
        <div className="seperate">
          <p><strong>Confirmation PIN:</strong> {order.confirmationPin}</p>
          <p><strong>Status:</strong> {order.status}</p>
        </div>
        <div className="seperate">
          <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Total Amount:</strong> {order.totalAmount} FCFA</p>
        </div>
       
      
      </div>

      <div className="fruit-basket">
        <section>
          <div className="banana-box">
            <div className="banana-row">
              {(order.items || []).map((item, index) => (
                <div key={index} className="banana">
                  <div className="mango">
                    <img src={item.Picture} alt={item.Name || 'Product'} />
                    <div className="grape">{index + 1}</div>
                    <div className="apple" />
                  </div>
                  <div className="orange">
                    <small>{item.Category || 'INFO'}</small>
                    <span>{item.Name || 'No name'}</span>
                    <h5>
                      {item.discount ? `${item.discount}%` : 'No Discount'} <b>{item.SalePrice} FCFA</b>
                    </h5>
                    <em>Qty: {item.quantity || 1}</em>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

    <form
  onSubmit={validatePin}
  className="w-full max-w-sm mx-auto p-4 bg-white rounded shadow flex"
  style={{display: "flex", flexDirection:
    "column"
  }}
>

  <div 
  className="mb-4 " >
    <input
      name="pin"

      type="text"
      placeholder="Confirmation Pin*"
      value={pin}
      onChange={(e) => setPin(e.target.value)}
      required
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    disabled
    />
  </div>
  <button
    type="submit"
    disabled={loading || !pin}
    className={`w-full py-2 px-4 rounded text-white font-semibold transition-colors ${
      loading || !pin ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
    }`}
  >
    {loading ? 'Sending...' : 'Print Reciept'}
  </button>
</form>

    </div>
  );
};

export default OrderDetail;

