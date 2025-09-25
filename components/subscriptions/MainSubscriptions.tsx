"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddCircle } from "iconsax-reactjs";
import TableSearch from "@/components/table-search";
import { DataTable } from "@/app/dashboard/subscriptions/data-table";
import { columns } from "@/app/dashboard/subscriptions/columns";
import { Subscription } from "@/app/dashboard/subscriptions/columns";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SubscriptionsForm from "@/app/dashboard/subscriptions/subscriptions-form";
import { useGetSubscriptions } from "@/services/api";
import { useSearchParams } from "next/navigation";

const MainSubscriptions = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("query") || "";
  const { data, isLoading, error } = useGetSubscriptions({ search: search });
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }
  return (
    <div className="container w-full mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-bold">Subscriptions</h1>
      <div className="flex items-center justify-between">
        <TableSearch showButton={false} />

        <Dialog>
          {/* <DialogTitle>Add Subscription</DialogTitle> */}
          <DialogTrigger>
            <Button>
              <AddCircle size={24} />
              <span className="text-sm font-medium">Add Subscription</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <SubscriptionsForm />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={data} />

      {/* <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <SubscriptionsForm />
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default MainSubscriptions;
