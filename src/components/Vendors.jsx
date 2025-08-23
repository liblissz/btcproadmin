import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GoArrowUp } from "react-icons/go";
import { BiTransferAlt } from "react-icons/bi";
import { MdMoreVert } from "react-icons/md";
const Vendors = () => {
    const [allProduct, setallProduct ] = useState([])
    
       const [loading, setloading] = useState(false);
         const [orders, setorders] = useState([]);
      const [searchvalue, setsearchvalue] = useState("")
    
     const [isActive, setisActive] = useState(true)
        useEffect(()=>{
          const fetchuser = async ()=>{
            try {
              setloading(true)
                  const dataall = await axios.get("https://btcbackend-e7yt.onrender.com/vendors");
    
            setallProduct(dataall.data)
            } catch (error) {
              console.error(error);
              
            }finally{
              setloading(false)
            }
        
          }
    
    fetchuser();
        }, [])
  return (
    <div>
      <ul className="grid grid-cols-2 gap-2" style={{overflow: "auto", height: "auto"}}>
                {
                 
                  allProduct
             .filter((val) => 
            val.Name.toLowerCase().includes(searchvalue.toLowerCase())
          )
                  .map((item, index) => (
                  <li className="relative bg-foreground rounded-xl p-2" key={index}>
                    <div className="flex item-center justify-between gap-2">
                      <span className="flex items-center gap-1">
                        <p className="w-10 aspect-square rounded-full profile">{item?.Name.charAt(0,1)}</p>
          
                        <span className="text-sm text-zinc-800">{item.Name}</span>
                      </span>
                      <button className="w-6 aspect-square rounded-full hover:bg-zinc-100 text-zinc-800 flex items-center justify-center">
                        <MdMoreVert size={16} />
                      </button>
                    </div>
      
                    <div className="mt-3 flex flex-col">
                      <span className="text-xl font-semibold text-zinc-800">{item.Contact}</span>
                      <span className="text-[.6rem] text-zinc-500">{`Locaton: ${item.Location} `}</span>
                    </div>
                    <span className={`${isActive ? "text-green-400" : "text-red-500"} mt-1 text-sm font-semibold`}>{isActive ? "Active" : "Inactive"}</span>
                  </li>
                ))}
              </ul>
    </div>
  )
}

export default Vendors
