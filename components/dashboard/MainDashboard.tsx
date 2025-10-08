"use client";

import React, { useMemo } from "react";
import DashboardStatsCard from "./DashboardStatsCard";
import PieChartComponent from "./PieChart";
import { useGetSubscriptions } from "@/services/api";
import DashboardLoader from "../DashboardLoader";
import RecentActivities from "./RecentActivities";
import { DataTable } from "@/app/dashboard/subscriptions/data-table";
import { columns } from "@/app/dashboard/subscriptions/columns";
import dayjs from "dayjs";
import DashboardWidgetTitle from "./DashboardWidgetTitle";

const MainDashboard = () => {
  const { data, isLoading, error } = useGetSubscriptions({});

  const upcomingRenewalsData = useMemo(() => {
    return data?.data?.filter((subscription) => {
      if (!subscription.renewal_date) return false;

      const daysUntilRenewal = dayjs(subscription.renewal_date).diff(
        dayjs(),
        "days"
      );

      console.log({
        name: subscription.name,
        renewal_date: subscription.renewal_date,
        daysUntilRenewal,
        passes: daysUntilRenewal >= 0 && daysUntilRenewal <= 30,
      });

      return daysUntilRenewal >= 0 && daysUntilRenewal <= 30;
    });
  }, [data]);

  console.log(upcomingRenewalsData, "upcomingRenewalsData");

  const chartData = useMemo(() => {
    const categoryTotals = data?.data?.reduce((acc, subscription) => {
      acc[subscription.category] =
        (acc[subscription.category] || 0) + subscription.cost;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals || {}).map(([name, value]) => ({
      name,
      value,
      fill: `hsl(var(--category-${name.toLowerCase()}))`,
    }));
  }, [data]);

  console.log(chartData, "chartData");

  const totalMonthlySpend = data?.data
    ?.filter((subscription) => subscription.frequency === "monthly")
    .reduce((acc, subscription) => acc + subscription.cost, 0);
  // const totalAnnualSpend = data?.data
  //   ?.filter((subscription) => subscription.frequency === "annual")
  //   .reduce((acc, subscription) => acc + subscription.cost, 0);

  const totalUpcomingRenewals =
    data?.data?.filter((subscription) => {
      const daysUntilRenewal = dayjs(subscription.renewal_date).diff(
        dayjs(),
        "days"
      );
      return daysUntilRenewal >= 0 && daysUntilRenewal <= 30;
    }).length || 0;
  const totalAverageMonthlyCost =
    data?.data?.reduce((acc, subscription) => acc + subscription.cost, 0) /
    (data?.data?.length || 0);

  if (isLoading) return <DashboardLoader />;
  if (!data) return <div>No data</div>;

  return (
    <div className="space-y-8">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full border shadow-sm h-[400px] rounded-2xl p-4">
          <PieChartComponent
            data={chartData as { name: string; value: number; fill: string }[]}
          />
        </div>
        <RecentActivities data={data?.data} />
      </div>

      <div className="space-y-3">
        <DashboardWidgetTitle
          title="Upcoming Renewals"
          description="Subscriptions due to renew in the next 30 days."
        />
        <DataTable
          columns={columns}
          data={upcomingRenewalsData || []}
          showActions={false}
        />
      </div>
    </div>
  );
};

export default MainDashboard;
