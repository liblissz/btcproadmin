import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdFilterList, MdMoreHoriz } from "react-icons/md";
import { Link } from "react-router-dom";

export default function RecentActivity() {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search , setsearch] = useState("")
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://btcbackend-e7yt.onrender.com/allorders");
        console.log("Fetched:", response.data);
        setAllOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);



  return (
    <div className="col-span-2 row-span-2 p-4 bg-foreground rounded-3xl flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-900">Recent activities</h2>
        <div className="flex items-center gap-2">
          <div className="px-4 gap-2 h-12 rounded-xl border-2 border-zinc-200 flex items-center text-zinc-800">
            <span className="flex items-center justify-center">
              <BiSearch size={22} />
            </span>
            <input type="text" name="search" value={search} onChange={(e)=> setsearch(e.target.value)}  placeholder="Search" className="flex-1 outline-0 text-base placeholder:text-zinc-500" />
          </div>
          <button className="h-12 flex items-center justify-center gap-2 pl-4 pr-3 rounded-xl border-2 border-zinc-200 hover:bg-zinc-100">
            <span className="text-base font-semibold text-zinc-800">Filter</span>
            <MdFilterList size={20} />
          </button>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border-2 border-zinc-200 flex flex-col">
        <div className="grid grid-cols-[auto_1fr_2fr_1fr_1fr_2fr_auto] pr-3 gap-1 bg-zinc-100">
          <span className="w-12 h-14 flex items-center justify-center">
            <input type="checkbox" />
          </span>
          {["Order ID", "Status/Pin", "Price", "Status", "Date"].map((title) => (
            <span key={title} className="flex items-center justify-start text-zinc-500">{title}</span>
          ))}
          <span className="w-8 block" />
        </div>

        <ul className="flex flex-col">
          {loading && <p className="flex flex-col">loading...</p>}
          {allOrders
          .filter(item =>
         item.customer.name.toLowerCase().includes(search.toLowerCase()) 
          
          )
          .map((item, index) => (
            <li key={index} className="grid grid-cols-[auto_1fr_2fr_1fr_1fr_2fr_auto] pr-3 gap-1 text-zinc-800 hover:bg-zinc-50">
              <span className="w-12 h-14 flex items-center justify-center">
                <input type="checkbox" />
              </span>
              <span className="flex items-center justify-start">{index}</span>
              <span className="flex items-center justify-start gap-3">
                <span className="w-10 aspect-square rounded-full bg-zinc-100 flex items-center justify-center">
                  <p className="w-10 aspect-square rounded-full profile">{item.status.charAt(0)}</p>
                </span>
                <span className="font-semibold"> {item.confirmationPin}</span>
              </span>
              <span className="flex items-center font-semibold">{item.totalAmount}frs</span>
              <span className="text-sm flex items-center gap-1">
                <span className={`${item.status === "CONFIRMED" ? "bg-green-500" : item.status === "PENDING" ? "bg-red-500" : "bg-orange-400"} w-2 aspect-square rounded-full`} />
                <span>{item.status === "CONFIRMED" ? "CONFIRMED" : item.status === "PENDING" ? "PENDING" : "In progress"}</span>
              </span>
              <span className="flex items-center">
                {/* Correctly formatted date using toLocaleString */}
                {new Date(item.createdAt).toLocaleString("en-US", {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </span>
              <span className="flex items-center justify-center">
                <Link to={`/order/${item._id}`}>
                <span className="w-8 aspect-square rounded-full flex items-center justify-center hover:bg-zinc-100">
                  <MdMoreHoriz size={20} />
                </span>
           </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}