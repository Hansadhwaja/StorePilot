'use server';

import { Model as MongooseModel, Document } from "mongoose";
import connectToDatabase from "@/lib/db";
import Purchase from "../models/Purchase";
import Payment from "../models/Payment";
import { getSalesSummaryByMonth } from "./saleActions";
import { DealerPurchaseSummary } from "@/types";

interface AggregateResult {
  current: number;
  prev: number;
  change: number;
}

export async function getDashboardSummary(month?: string) {
  await connectToDatabase();

  const now = new Date();
  const currentMonth = month || now.toISOString().slice(0, 7);
  const [currentYearStr, currentMonthStr] = currentMonth.split("-");
  const currentYear = parseInt(currentYearStr);
  const currentMonthNum = parseInt(currentMonthStr);

  const prevMonthDate = new Date(currentYear, currentMonthNum - 2);
  const prevMonth = `${prevMonthDate.getFullYear()}-${(prevMonthDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
  const [prevYearStr, prevMonthStr] = prevMonth.split("-");
  const prevYear = parseInt(prevYearStr);
  const prevMonthNum = parseInt(prevMonthStr);

  const aggregateTotal = async (
    Model: MongooseModel<Document>,
    field: string
  ): Promise<AggregateResult> => {
    const current = await Model.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: `$${field}` }, currentYear] },
              { $eq: [{ $month: `$${field}` }, currentMonthNum] },
            ],
          },
        },
      },
      { $group: { _id: null, total: { $sum: "$" + (Model === Purchase ? "totalAmount" : "amount") } } },
    ]);

    const prev = await Model.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: `$${field}` }, prevYear] },
              { $eq: [{ $month: `$${field}` }, prevMonthNum] },
            ],
          },
        },
      },
      { $group: { _id: null, total: { $sum: "$" + (Model === Purchase ? "totalAmount" : "amount") } } },
    ]);

    return {
      current: current[0]?.total || 0,
      prev: prev[0]?.total || 0,
      change: prev[0]?.total ? ((current[0]?.total || 0) - prev[0]?.total) / prev[0].total * 100 : 0,
    };
  };

  const salesSummary = await getSalesSummaryByMonth(currentMonth);
  const prevSalesSummary = await getSalesSummaryByMonth(prevMonth);

  const revenue = {
    value: salesSummary.totalRevenue,
    change: prevSalesSummary.totalRevenue
      ? ((salesSummary.totalRevenue - prevSalesSummary.totalRevenue) / prevSalesSummary.totalRevenue) * 100
      : 0,
  };

  const profit = {
    value: salesSummary.totalProfit,
    change: prevSalesSummary.totalProfit
      ? ((salesSummary.totalProfit - prevSalesSummary.totalProfit) / prevSalesSummary.totalProfit) * 100
      : 0,
  };

  // Purchases & Payments
  const purchases = await aggregateTotal(Purchase, "purchaseDate");
  const paid = await aggregateTotal(Payment, "paidAt");

  // Due = Purchases - Paid
  const due = {
    value: purchases.current - paid.current,
    change: purchases.prev - paid.prev !== 0 ? ((purchases.current - paid.current - (purchases.prev - paid.prev)) / (purchases.prev - paid.prev)) * 100 : 0,
  };

  return {
    revenue,
    profit,
    purchases: { value: purchases.current, change: purchases.change },
    paid: { value: paid.current, change: paid.change },
    due,
  };
}

export async function getDealerPurchasesByDate(month?: string): Promise<DealerPurchaseSummary[]> {
  await connectToDatabase();

  const targetMonth = month || new Date().toISOString().slice(0, 7);

  const purchaseSummary = await Purchase.aggregate([
    {
      $addFields: {
        purchaseMonth: { $dateToString: { format: "%Y-%m", date: "$purchaseDate" } },
        purchaseDay: { $dateToString: { format: "%Y-%m-%d", date: "$purchaseDate" } },
      },
    },
    { $match: { purchaseMonth: targetMonth } },
    {
      $group: {
        _id: "$purchaseDay",
        totalPurchases: { $sum: "$totalAmount" },
      },
    },
    { $sort: { "_id": 1 } },
  ]);

  const paymentSummary = await Payment.aggregate([
    {
      $addFields: {
        paymentMonth: { $dateToString: { format: "%Y-%m", date: "$paidAt" } },
        paymentDay: { $dateToString: { format: "%Y-%m-%d", date: "$paidAt" } },
      },
    },
    { $match: { paymentMonth: targetMonth } },
    {
      $group: {
        _id: "$paymentDay",
        totalPaid: { $sum: "$amount" },
      },
    },
    { $sort: { "_id": 1 } },
  ]);

  const allDates = Array.from(new Set([...purchaseSummary.map(p => p._id), ...paymentSummary.map(p => p._id)])).sort();

  const result: DealerPurchaseSummary[] = allDates.map((date) => {
    const p = purchaseSummary.find((x) => x._id === date);
    const pay = paymentSummary.find((x) => x._id === date);
    return {
      date,
      totalPurchases: p?.totalPurchases || 0,
      totalPaid: pay?.totalPaid || 0,
    };
  });

  return result;
}