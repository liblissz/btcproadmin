import React, { useEffect, useState } from "react";
import { GoArrowUp } from "react-icons/go";
import { BiTransferAlt } from "react-icons/bi";
import { MdMoreVert } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

export default function Balance() {
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
    
  const date = new Date()
   const year = date.getFullYear()
   const day = date.getDate()
   const month = date.getMonth()

  const totalBudget = orders.reduce((sum, p) => sum + (p.totalAmount || 0), 0);
 const averageBudget = orders.length ? (totalBudget / orders.length).toFixed(2) : 0;

  const [allProduct, setallProduct ] = useState([])

   
  const [searchvalue, setsearchvalue] = useState("")


    useEffect(()=>{
      const fetchuser = async ()=>{
        try {
          setloading(true)
              const dataall = await axios.get("https://btcbackend-e7yt.onrender.com/drugs");

        setallProduct(dataall.data)
        } catch (error) {
          console.error(error);
          
        }finally{
          setloading(false)
        }
    
      }

fetchuser();
    }, [])
    const [isActive, setisActive] = useState(true)

   const balancesheet = async () => {
    try {
      setloading(true);
      await axios.get("https://btcbackend-e7yt.onrender.com/balancesheet");
      toast.success("Balance sheet generated successfully!");
    } catch (error) {
      toast.error("Failed to generate balance sheet");
      console.error(error);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="p-4 bg-foreground rounded-3xl">
      <div className="flex justify-between items-start gap-6">
        <div className="flex flex-col">
          <span className="text-sm text-zinc-500">Total Amount From Sales</span>
          <span className="mt-3 text-3xl font-semibold text-zinc-900">{loading? "loading": totalBudget}FCFA </span>
          <div className="mt-2 flex items-center gap-1 text-sm text-zinc-500">
            <span className="rounded-full px-2 bg-green-50 text-green-400 inline-flex items-center gap-0.5">
              <GoArrowUp size={14} />
              <span className="">{day + "/" + month +  "/"+ year}</span>
            </span>
            <span className="">this last month</span>
          </div>
        </div>

        <button className="h-10 rounded-md border border-gray-300 pl-2 pr-2 py-0.5 flex gap-2 items-center justify-center text-zinc-600">
          <img src="/undraw_starting-work_ifnt.svg" className="w-6 aspect-square rounded-full" alt=" flag" />
          <span className="text-sm font-semibold">CMR</span>
        </button>
      </div>

      <div className="mt-4 flex gap-3">

        <button onClick={balancesheet} className="flex-1 h-[44px] px-4 flex gap-3 items-center justify-center rounded-full bg-zinc-900 text-zinc-100">
          <BiTransferAlt size={20} />
          <span className="text-base font-semibold">{loading ? "loading...": "balancesheet"}</span>
        </button>


        <button className="flex-1 h-[44px] px-4 flex gap-3 items-center justify-center rounded-full bg-zinc-100 text-zinc-800">
          <BiTransferAlt size={20} />
          <span className="text-base font-semibold">orders</span>
        </button>

      </div>

      <div className="mt-6 rounded-2xl p-3 flex flex-col gap-3 bg-zinc-100">
        <div className="flex items-center gap-1 text-sm text-zinc-500">
          <span className="text-zinc-900">Drugs</span>
          <span className="">|</span>
          <span className="">Total Drugs In stock = {allProduct.length}</span>
        </div>
        <div class="flex flex-col space-y-2">
  <input 
    type="text" 
    id="inputField" 
    class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
    placeholder="Search*"
    value={searchvalue}
    onChange={(e)=> setsearchvalue(e.target.value)}
  />
</div>
        <ul className="grid grid-cols-2 gap-2" style={{overflow: "auto", height: "160px"}}>
          {
           
            allProduct
       .filter((val) => 
      val.Name.toLowerCase().includes(searchvalue.toLowerCase())
    )
            .map((item, index) => (
            <li className="relative bg-foreground rounded-xl p-2" key={index}>
              <div className="flex item-center justify-between gap-2">
                <span className="flex items-center gap-1">
                  <img src={item.Picture} alt="Country flag" className="w-6 aspect-square rounded-full" />
                  <span className="text-sm text-zinc-800">{item.Name}</span>
                </span>
                <button className="w-6 aspect-square rounded-full hover:bg-zinc-100 text-zinc-800 flex items-center justify-center">
                  <MdMoreVert size={16} />
                </button>
              </div>

              <div className="mt-3 flex flex-col">
                <span className="text-xl font-semibold text-zinc-800">{item.SalePrice}frs</span>
                <span className="text-[.6rem] text-zinc-500">{`Limit is ${item.Category}${item.Category} a month`}</span>
              </div>
              <span className={`${isActive ? "text-green-400" : "text-red-500"} mt-1 text-sm font-semibold`}>{isActive ? "Active" : "Inactive"}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
