import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import LoginPage from "./pages/Login";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import RecentActivity from "./components/RecentActivity";
import Balance from "./components/Balance";
import Vendors from "./components/Vendors";
import OrderDetail from "./pages/Productdetails/Details";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);
  const token = localStorage.getItem("auth");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) {
          setIsLoginPage(true);
          return;
        }

        const res = await axios.get("https://btcbackend-e7yt.onrender.com/login/me/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });


        await axios.post("https://btcbackend-e7yt.onrender.com/login/checktoken", {
          UserEmail: res.data.user.Email,
          token: token,
        });

        setIsLoginPage(false);
      } catch (error) {
        if (error.response) {
          console.error(error.response.data.message || "Unauthorized");
        } else {
          toast.error("Network error");
        }
        localStorage.removeItem("auth");
        setIsLoginPage(true);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <div className="min-h-screen bg-background font-raleway text-zinc-900">
      <Toaster position="top-center" />
      {isLoginPage ? (
        <LoginPage />
      ) : (
        <>
          <Header onMenu={() => setSidebarOpen(true)} />
          <div className="flex">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="flex-1 p-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
               <Route path="/orders" element={<RecentActivity/>}/>
               <Route path="/products" element={<Balance/>}/>
               <Route path="/vendors" element={<Vendors/>}/>
               <Route path="/order/:id" element={<OrderDetail/>}/>
              </Routes>
            </main>
          </div>
        </>
      )}
    </div>
  );
}
