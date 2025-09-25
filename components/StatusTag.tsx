import React from "react";

const StatusTag = ({ status }: { status: string }) => {
  const statusLowerCase = status.toLowerCase();
  const colorsClasses = {
    active: "bg-status-active text-status-active-foreground",
    trial: "bg-status-trial text-status-trial-foreground",
    paused: "bg-status-paused text-status-paused-foreground",
    canceled: "bg-status-canceled text-status-canceled-foreground",
    expired: "bg-status-expired text-status-expired-foreground",
    pending: "bg-status-pending text-status-pending-foreground",
  };
  return (
    <div
      className={`${
        colorsClasses[statusLowerCase as keyof typeof colorsClasses]
      } rounded-md px-2 py-1 text-sm w-fit`}
    >
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </div>
  );
};

export default StatusTag;
