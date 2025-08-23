import React from "react";
import { GoCreditCard, GoPlus } from "react-icons/go";
import { FcSimCardChip } from "react-icons/fc";
import { RiVisaLine, RiMastercardLine } from "react-icons/ri";

export default function Cards() {
  const cards = [
    {
      cardName: "Mr BTC",
      cardNumber: "1234 5678 9012 3456",
      cardExpiryDate: "12/26",
      card: "Visa",
      cardCVV: "123",
      colors: "text-zinc-100 bg-gradient-to-br from-zinc-900 via-zinc-600 to-zinc-900",
      Icon: RiVisaLine,
    },
    {
      cardName: "Jane Smith",
      cardNumber: "9876 5432 1098 7654",
      cardExpiryDate: "08/24",
      card: "Mastercard",
      cardCVV: "456",
      colors: "text-white bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600",
      Icon: RiMastercardLine,
    },
    {
      cardName: "Peter Jones",
      cardNumber: "1111 2222 3333 4444",
      cardExpiryDate: "05/27",
      card: "Visa",
      cardCVV: "789",
      colors: "text-stone-100 bg-gradient-to-br from-stone-700 to-stone-800",
      Icon: RiVisaLine,
    },
  ];

  return (
    <div className="py-4 bg-foreground overflow-hidden rounded-3xl flex flex-col gap-6">
      <div className="px-4 flex items-center justify-between gap-2">
        <span className="text-zinc-900 flex items-center justify-center gap-3">
          <span className="w-10 aspect-square rounded-full flex items-center justify-center border border-zinc-200">
            <GoCreditCard size={20} />
          </span>
          <span className="text-xl font-semibold">Directors Card</span>
        </span>

        <button className="h-10 rounded-full bg-zinc-100 flex items-center justify-center gap-2 pl-3 pr-4">
          <GoPlus size={20} />
          <span className="font-semibold">BTC</span>
        </button>
      </div>

      <div className="flex-1 flex">
        <ul className="flex-1 px-4 flex-1 grid grid-cols-[repeat(3,_80%)] gap-3">
          {cards.map(({ cardName, cardNumber, cardExpiryDate, colors, Icon }) => (
            <li key={cardNumber} className="flex-1 flex">
              <button className={`${colors} flex-1 text-left flex-1 flex flex-col justify-between p-3 rounded-2xl`}>
                <div className="flex items-center justify-between">
                  <FcSimCardChip size={40} />
                  <Icon size={32} />
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-2xl font-semibold">{cardNumber}</span>
                  <div className="flex gap-4 justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm opacity-60 font-semibold uppercase">Card holder name</span>
                      <span className="text-lg font-semibold">{cardName}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm opacity-60 font-semibold uppercase">Expiry date</span>
                      <span className="text-lg font-semibold">{cardExpiryDate}</span>
                    </div>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
