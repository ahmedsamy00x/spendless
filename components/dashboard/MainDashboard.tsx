"use client";

import React from "react";
import DashboardStatsCard from "./DashboardStatsCard";
import PieChartComponent from "./PieChart";
import { useGetSubscriptions } from "@/services/api";
import DashboardLoader from "../DashboardLoader";

const MainDashboard = () => {
  const { data, isLoading, error } = useGetSubscriptions({});

  const totalMonthlySpend = data?.data
    ?.filter((subscription) => subscription.frequency === "monthly")
    .reduce((acc, subscription) => acc + subscription.cost, 0);
  // const totalAnnualSpend = data?.data
  //   ?.filter((subscription) => subscription.frequency === "annual")
  //   .reduce((acc, subscription) => acc + subscription.cost, 0);

  const totalUpcomingRenewals =
    data?.data?.filter(
      (subscription) =>
        subscription.renewal_date &&
        new Date(subscription.renewal_date) < new Date()
    ).length || 0;
  const totalAverageMonthlyCost =
    data?.data?.reduce((acc, subscription) => acc + subscription.cost, 0) /
    (data?.data?.length || 0);

  if (isLoading) return <DashboardLoader />;
  if (!data) return <div>No data</div>;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="font-montserrat text-3xl font-bold">
          Welcome back, John Doe
        </h1>
        <p className="text-base font-normal">
          Here&apos;s a quick overview of your subscription health.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardStatsCard
          title="Total Monthly Spend"
          value={totalMonthlySpend}
          subtitle="Total number of subscriptions"
          isPrice
        />
        <DashboardStatsCard
          title="Upcoming Renewals"
          value={totalUpcomingRenewals}
          subtitle="Due in the next 30 days"
        />
        <DashboardStatsCard
          title="Average Monthly Cost"
          value={totalAverageMonthlyCost}
          subtitle="Per active subscription"
          isPrice
        />
      </div>
      <div className="w-full h-[400px]">
        <PieChartComponent />
      </div>
    </div>
  );
};

export default MainDashboard;
