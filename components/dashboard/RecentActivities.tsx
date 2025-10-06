import { SubscriptionsResponse } from "@/services/types/subscriptions";
import dayjs from "dayjs";
import React from "react";
import DashboardWidgetTitle from "./DashboardWidgetTitle";

const MAX_DAYS_TO_SHOW = 7;

const RecentActivity = ({
  activity,
  date,
}: {
  activity: string;
  date: string;
}) => {
  return (
    <div className="flex justify-between items-center border-b pb-2">
      <span className="text-sm font-normal">{activity}</span>
      <span className="text-xs text-muted-foreground">{date}</span>
    </div>
  );
};

const RecentActivities = ({ data }: { data: SubscriptionsResponse[] }) => {
  return (
    <div className="space-y-6">
      <DashboardWidgetTitle
        title="Recent Activity"
        description="Latest changes and events on your subscriptions."
      />
      <div className="space-y-2">
        {data
          ?.filter(
            (sub) =>
              Math.abs(dayjs(sub.start_date).diff(dayjs(), "days")) <=
              MAX_DAYS_TO_SHOW
          )
          .map((item) => {
            const dateInDays = Math.abs(
              dayjs(item.start_date).diff(dayjs(), "days")
            );
            const dateText =
              dateInDays === 0
                ? "Today"
                : dateInDays === 1
                ? "1 day ago"
                : `${dateInDays} days ago`;
            return (
              <RecentActivity
                key={item.id}
                activity={item.name + " subscription started"}
                date={dateText}
              />
            );
          })}
      </div>
    </div>
  );
};

export default RecentActivities;
