import React, { useEffect, useState } from "react";
import { SiFreepik } from "react-icons/si";
import { GoSearch, GoBell } from "react-icons/go";
import { LuCircleAlert } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa6";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";

export default function Header({ onMenu = () => {} }) {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("auth") ;
 const [active, setactive] =  useState(false)
  const location = useLocation();
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

        if (res.data.success) {
          setUser(res.data.user);
        } else {
          toast.error(res.data.message || "Failed to fetch user");
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
    <header className="bg-transparent">
      <nav className="p-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Hamburger for mobile */}
          <button
            onClick={onMenu}
            className="lg:hidden p-2 rounded-md hover:bg-zinc-100"
            aria-label="Open menu"
          >
            <HiOutlineMenuAlt3 size={20} />
          </button>

          <a
            href="#"
            className="p-1.5 pr-4 flex items-center gap-2 rounded-full bg-foreground"
          >
            <span className="relative flex items-center justify-center w-10 aspect-square rounded-full bg-main text-white before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:-translate-y-4 before:w-full before:aspect-square before:rounded-full before:bg-zinc-100 before:blur-[16px] before:opacity-60">
              <ion-icon name="bandage-outline"></ion-icon>
            </span>
            <span className="text-zinc-900 font-bold text-lg">
              BTC PHARMACY
            </span>
          </a>
        </div>
<ul className="hidden sm:flex bg-foreground rounded-full p-1.5 items-center gap-1.5">
  {[
    { name: "Overview", path: "/" },
    { name: "All Orders", path: "/orders" },
    { name: "Product List", path: "/products" },
    { name: "All Vendors", path: "/vendors" },
    { name: "Message AI", path: "https://bc-ai.vercel.app/" },
  ].map((link) => {
    const isActive = location.pathname === link.path;
    return (
      <li key={link.path}>
        <Link
          to={link.path}
          style={{ cursor: "pointer" }}
          className={
            isActive
              ? "bg-zinc-900 text-zinc-100 capitalize h-10 px-4 flex items-center justify-center rounded-full"
              : "text-zinc-400 capitalize h-10 px-4 flex items-center justify-center rounded-full"
          }
        >
          <span className="font-semibold text-sm">{link.name}</span>
        </Link>
      </li>
    );
  })}
</ul>

   
        <div className="flex items-center gap-4">
          <ul className="p-1.5 flex items-center gap-1.5 bg-foreground rounded-full">
    
              <li >
                <button
                  className={`${"before:bg-red-400 before:border-foreground" } relative w-10 aspect-square rounded-full hover:bg-zinc-100 flex items-center justify-center before:absolute before:top-2 before:left-2 before:w-3 before:aspect-square before:rounded-full before:border-2`}
                 onClick={()=>{
                  localStorage.removeItem("auth");
                  sessionStorage.removeItem("auth")
                  window.location.reload()
                 }}
                >
           <ion-icon name="log-out-outline"></ion-icon>
                </button>
              </li>
    
          </ul>

          <div>
            <button className="group text-left p-1.5 flex items-center gap-1.5 rounded-full bg-foreground hover:bg-zinc-900">
              <p className="w-10 aspect-square rounded-full profile">{user?.Name.charAt(0,1)}</p>
          
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-semibold text-zinc-800 group-hover:text-zinc-100">
                  {user?.Name || "Loading..."}
                </span>
                <span className="text-xs text-zinc-600 group-hover:text-zinc-400">
                  {user?.Email || ""}
                </span>
              </div>
              <span className="hidden sm:flex w-4 aspect-square rounded-full items-center justify-center text-zinc-800 group-hover:text-zinc-200">
                <FaAngleDown size={12} />
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
