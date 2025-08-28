import AddDealer from "@/components/Dealers/AddDealer";
import AllDealers from "@/components/Dealers/AllDealers";
import React from "react";

const Dealer = () => {
  return (
    <div className="space-y-6 min-h-screen mb-16">
      <div className="flex justify-between items-center sticky top-12 z-50 bg-background py-2 border-b">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold">Dealers</h1>
        <AddDealer />
      </div>
      <AllDealers />
    </div>
  );
};

export default Dealer;
