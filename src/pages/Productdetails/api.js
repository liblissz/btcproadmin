import axios from 'axios';


// Pages/api.js
export function confirmOrder(orderId, pin) {
  return axios.post(`https://btcbackend-e7yt.onrender.com/order/updatestatus/${orderId}`, { pin });
}



export function downloadReceipt(orderId) {
  return axios.get(`https://btcbackend-e7yt.onrender.com/order/receipt/${orderId}`, { responseType: 'blob' }); 
}
