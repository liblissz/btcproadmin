import React from "react";

export default function Spending() {
  return (
    <div className="p-4 bg-foreground rounded-3xl flex flex-col gap-6">
      <h2 className="text-lg font-semibold text-zinc-900">Monthly spending limit</h2>
      <div className="flex flex-col gap-2">
        <span className="relative block progress-bar h-4 rounded-full bg-zinc-100 after:absolute after:top-0 after:left-0 after:w-1/2 after:h-full after:rounded-full after:bg-main" />
        <p className="text-base text-zinc-500">
          <span className="text-zinc-900 font-semibold">₦40,319.02</span>
          <span> spent out of </span>
          <span className="text-zinc-900 font-semibold"> ₦80,838.03</span>
        </p>
      </div>
    </div>
  );
}
