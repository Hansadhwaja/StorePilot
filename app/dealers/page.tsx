import AddDealer from "@/components/Dealers/AddDealer";
import AllDealers from "@/components/Dealers/AllDealers";
import React from "react";

const Dealer = () => {
  return (
    <div>
      <div className="flex justify-between mx-6">
        <h1 className="text-xl font-bold">Dealers</h1>
        <AddDealer />
      </div>
      <AllDealers />
    </div>
  );
};

export default Dealer;
