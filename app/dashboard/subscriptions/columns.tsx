"use client";

import StatusTag from "@/components/StatusTag";
import CategoryTag from "@/components/CategoryTag";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import SubscriptionActions from "./subscription-actions";
import { SubscriptionsFormData } from "@/lib/validations/subscriptions";

// This type is used to define the shape of our data.
// Using the same type as the form for consistency
export type Subscription = SubscriptionsFormData & {
  id: string;
};

export const columns: ColumnDef<Subscription>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return <CategoryTag category={row.original.category} />;
    },
  },
  {
    accessorKey: "cost",
    header: "Cost",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusTag status={row.original.status} />;
    },
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
  },
  {
    accessorKey: "renewal_date",
    header: "Renewal Date",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <SubscriptionActions subscription={row.original} />;
    },
  },
];
