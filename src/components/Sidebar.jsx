import React from "react";
import { MdOutlineLightMode, MdOutlineDarkMode, MdMoreVert } from "react-icons/md";
import { BsGrid, BsEnvelope, BsClipboard2Pulse, BsGear } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { FaUsers } from "react-icons/fa";           
import { AiOutlineRobot } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineInventory2 } from "react-icons/md";
export default function Sidebar() {
    const links = [
  { icon: BsGrid, path: "/", name: "Dashboard" },
  { icon: IoCalendarOutline, path: "/orders", name: "Orders" },
  { icon: MdOutlineInventory2, path: "/products", name: "Products" },
  { icon: FaUsers, path: "/vendors", name: "Vendors" },
  { icon: AiOutlineRobot, path: "https://bc-ai.vercel.app/", name: "AI" },
];
    const location = useLocation();
  return (
    <aside className="sticky top-0 p-4 min-h-[calc(100vh_-_88px)] flex flex-col justify-between gap-20">
      <div className="flex flex-col gap-20" >
        <div className="p-1.5 flex flex-col gap-1.5 bg-foreground rounded-full" style={{background: "transparent"}}>
          {/* {[MdOutlineLightMode, MdOutlineDarkMode].map((Icon, index) => ( */}
            {/* <button key={index} className={`${index === 0 ? "bg-zinc-100" : "hover:bg-zinc-100"} w-10 aspect-square rounded-full flex items-center justify-center`}>
              <Icon size={20} />
            </button> */}
          {/* // ))} */}
        </div>

      <div className="p-1.5 flex flex-col gap-1.5 bg-foreground rounded-full">
      {links.map(({ icon: Icon, path, name }, index) => {
        const isActive = location.pathname === path;

        return (
          <Link key={index} to={path}>
            <button
              title={name}
              className={`w-10 aspect-square relative flex items-center justify-center rounded-full transition-all duration-200
                ${isActive 
                  ? "bg-zinc-900 text-zinc-100" 
                  : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"}
              `}
            >
              {/* Active glow */}
              {isActive && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-full aspect-square rounded-full bg-zinc-100 blur-[16px] opacity-50"></span>
              )}
              <Icon size={20} className="relative z-10" />
            </button>
          </Link>
        );
      })}
    </div>
      </div>

      <div className="p-1.5 flex flex-col gap-1.5 bg-foreground rounded-full">
        {[IoIosHelpCircleOutline].map((Icon, index) => (
          <button key={index} className="hover:bg-zinc-100 text-zinc-700 w-10 aspect-square relative flex items-center justify-center rounded-full">
            <Icon size={20} />
          </button>
        ))}
      </div>
    </aside>
  );
}
