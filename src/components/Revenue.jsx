import React, { useEffect, useState } from "react";
import { HiOutlineWallet } from "react-icons/hi2";
import { IoPricetagsOutline } from "react-icons/io5";
import { LiaCoinsSolid } from "react-icons/lia";
import { TbMoneybag } from "react-icons/tb";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import toast from "react-hot-toast";
import axios from "axios";

export default function Revenue() {

   const [loading, setloading] = useState(false);
    const [orders, setorders] = useState([]);
  
    useEffect(() => {
      const fetchall = async () => {
        try {
          const allorders = await axios.get("https://btcbackend-e7yt.onrender.com/allorders");
          setorders(allorders.data);
        } catch (error) {
          toast.error("Failed to fetch orders");
          console.log(error);
        }
      };
      fetchall();
    }, []);
    const totalBudget = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const averageBudget = orders.length ? (totalBudget / orders.length).toFixed(2) : 0;

const percentage = orders.length ? ((averageBudget / totalBudget) * 100).toFixed(1) : 0;
const Totalincome = (totalBudget * (5 / 100)).toFixed(1);
const  Totalrevenue = (totalBudget * (7 / 100)).toFixed(1);
  const items = [
    { title: "Average Online Budget", Icon: HiOutlineWallet, currency: "frs", amount: averageBudget, percentage: percentage, trend: "" },
    { title: "Percentage of Sales", Icon: IoPricetagsOutline, currency: "%", amount: percentage, percentage: percentage, trend: "" },
    { title: "Total income", Icon: LiaCoinsSolid, currency: "frs", amount: Totalincome, percentage: percentage, trend: "up" },
    { title: "Total revenue", Icon: TbMoneybag, currency: "frs", amount: Totalrevenue, percentage: percentage, trend: "up" },
  ];

  return (
    <div className="p-4 bg-foreground rounded-3xl grid grid-cols-2 grid-rows-2 gap-3" style={{height: "480px"}}>
      {items.map(({ title, amount, Icon, currency, percentage, trend }, index) => (
        <div key={title} className={`${index === 0 ? "bg-main text-zinc-100 before:bg-zinc-100" : "bg-zinc-50 text-zinc-800"} relative flex flex-col justify-between gap-4 p-3 rounded-2xl before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:aspect-square before:rounded-full before:blur-[56px] before:opacity-50`}>
          <div className="relative flex items-center justify-between gap-3">
            <span className="text-sm font-semibold opacity-80">{title}</span>
            <span className={`${index === 0 ? "bg-zinc-100/20" : "bg-zinc-200/50"} flex items-center justify-center w-8 aspect-square rounded-full`}>
              <Icon size={20} />
            </span>
          </div>
          <div className="relative flex flex-col gap-2">
            <span className="text-3xl font-semibold"> {loading? "loading..": amount + currency}</span>
            <div className="text-sm font-semibold flex items-center gap-1">
              <span className={`${index === 0 ? "bg-zinc-100/20" : trend === "up" ? "bg-green-100 text-green-400" : "bg-red-100 text-red-500"} px-2 rounded-full flex items-center justify-center gap-0.5`}>
                {trend === "up" ? <GoArrowUp size={16} /> : <GoArrowDown size={16} />}
                <span>{percentage}%</span>
              </span>
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
