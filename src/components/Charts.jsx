import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,PieChart,Pie, Cell, Legend
} from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CF0', '#FF6699'];

export default function Charts() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const allOrders = await axios.get("https://btcbackend-e7yt.onrender.com/allorders");
        setOrders(allOrders.data);
      } catch (error) {
        toast.error("Failed to fetch orders");
        console.log(error);
      }
    };
    fetchAll();
  }, []);

  
  const formdata = orders.map(item => ({
    CustomerName: item.customer?.name || "Unknown",
    Amount: item.totalAmount
  }));


  return (
    <div className="p-4 bg-foreground rounded-3xl flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-zinc-800">Total Income</h2>
        <p className="text-sm text-zinc-500">View your income over a specific period of time</p>
      </div>
      <div className="flex-1 flex flex-col gap-3 bg-zinc-100 p-3 rounded-2xl">
        <div className="flex items-center justify-between gap-4">

              <ResponsiveContainer width="100%" height={350}>
        <BarChart data={formdata}>
          <XAxis dataKey="CustomerName" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Amount" fill="#a3342cff" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
  
        </div>
      </div>
    </div>
  );
}