import Balance from "./Balance";
import Revenue from "./Revenue";
// import Charts from "./Charts";
import Spending from "./Spending";
import RecentActivity from "./RecentActivity";
import Cards from "./Cards";
import axios from "axios";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import Charts from "./Charts";
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("auth") || sessionStorage.getItem("auth");

  useEffect(() => {
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get("https://btcbackend-e7yt.onrender.com/login/me/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
         const authenticattoken = await axios.post("https://btcbackend-e7yt.onrender.com/login/checktoken",
          {
        UserEmail: res.data.user.Email,
        token: token
          })
         if(authenticattoken.status == 400){
          toast.error(authenticattoken.data.message)
         }else if(authenticattoken.status == 401){
          toast.error(authenticattoken.data.message)
         }else  if(authenticattoken.status == 200){
         if (res.data.success) {
          setUser(res.data.user);
          } else {
          toast.error(res.data.message || "Failed to fetch user");
          }
         }

      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || "Error fetching user");
        } else {
          toast.error("Network error");
        }
        console.error("Fetch user error:", error);
      }
    };

    fetchUser();
  }, [token]);

  


  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl sm:text-4xl tracking-tight font-semibold text-zinc-900">Welcome , {user?.Name || "loading.."}</h2>
        <p className="text-base text-zinc-500">Stay on top of your tasks, monitor progress, and track status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1"><Balance /></div>
        <div className="col-span-1"><Revenue /></div>
        <div className="col-span-1"><Charts /></div>

        {/* <div className="col-span-1"><Spending /></div> */}

        {/* RecentActivity spans two columns on md, two columns on lg (so it gets larger) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2"><RecentActivity /></div>

        {/* Cards - stays one column on lg, but on md will sit next to RecentActivity */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1"><Cards /></div>
      </div>
    </div>
  );
}
