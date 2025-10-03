import React from "react";
import { Skeleton } from "./ui/skeleton";

const DashboardLoader = () => {
  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-foreground/10 shadow-sm p-3 rounded-2xl flex flex-col gap-2.5"
          >
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-9 w-28" />
            </div>
            <Skeleton className="h-4 w-44" />
          </div>
        ))}
      </div>

      {/* Spending by Category & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Spending by Category */}
        <div className="bg-foreground/10 shadow-sm p-6 rounded-2xl">
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="flex items-center justify-center">
            <Skeleton className="h-64 w-64 rounded-full" />
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-foreground/10 shadow-sm p-6 rounded-2xl">
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-56 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-start py-2">
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Renewals Table */}
      <div className="bg-foreground/10 shadow-sm p-6 rounded-2xl">
        <div className="space-y-2 mb-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="space-y-3">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 pb-2 border-b">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-16" />
          </div>
          {/* Table Rows */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="grid grid-cols-5 gap-4 py-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLoader;
