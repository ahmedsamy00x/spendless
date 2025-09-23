"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Subscription = {
  id: string;
  name: string;
  category: string;
  cost: number;
  status: string;
  frequency: string;
  renewal_date: string;
};

export const columns: ColumnDef<Subscription>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "cost",
    header: "Cost",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
  },
  {
    accessorKey: "renewal_date",
    header: "Renewal Date",
  },
];
