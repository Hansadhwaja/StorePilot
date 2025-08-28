"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import SummaryCards from "./SummaryCards";
import DealerPurchaseChart from "./DealerPurchaseChart";
import { getDashboardSummary } from "@/lib/actions/dashboardActions";
import { SummaryType } from "@/types";
import { monthNames } from "@/constants";
import Loader from "../Loader";
import RevenueProfitChart from "./RevenueProfitChart";

const DashBoard = () => {
  const now = new Date();
  const initialMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;
  const [month, setMonth] = useState(initialMonth);

  const [summary, setSummary] = useState<SummaryType | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const data = await getDashboardSummary(month);
      setSummary(data);
    };
    fetchSummary();
  }, [month]);

  return (
    <div className="space-y-6">
      <DashboardHeader
        month={month}
        setMonth={setMonth}
        monthNames={monthNames}
      />

      {summary ? (
        <>
          <SummaryCards summary={summary} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DealerPurchaseChart month={month} />
            <RevenueProfitChart month={month} />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DashBoard;
