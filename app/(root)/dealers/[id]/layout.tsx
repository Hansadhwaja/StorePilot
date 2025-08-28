import BadgeStatus from "@/components/BadgeStatus";
import DealerAction from "@/components/Dealers/DealerAction";
import DealerTabs from "@/components/Dealers/DealerTabs";
import { getDealerById } from "@/lib/actions/dealerActions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const DealerDetailsLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const dealer = await getDealerById(id);
  return (
    <div className="md:p-6 lg:p-10 max-w-7xl mx-auto mb-18">
      <Link
        href={`/dealers`}
        className="text-blue-600 text-xs mb-2 lg:text-sm hover:underline flex items-center gap-1 w-fit"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dealers
      </Link>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 lg:gap-6 border-b pb-2 md:pb-4 lg:pb-6">
        <div className="space-y-3">
          <h1 className=" text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            {dealer.name}
          </h1>
          <p className="text-muted-foreground text-xs md:text-sm lg:text-base">
            Manage purchases, payments and balances for this dealer
          </p>
        </div>
        <div className="flex justify-between items-end flex-1">
          <BadgeStatus status={dealer.status} />
          <DealerAction {...dealer} />
        </div>
      </div>
      <DealerTabs dealerId={id} />
      {children}
    </div>
  );
};

export default DealerDetailsLayout;
