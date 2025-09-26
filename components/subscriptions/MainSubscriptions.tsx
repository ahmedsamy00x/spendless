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
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const MainSubscriptions = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get pagination and search params from URL
  const search = searchParams?.get("query") || "";
  const page = parseInt(searchParams?.get("page") || "1");
  const pageSize = parseInt(searchParams?.get("pageSize") || "10");

  const { data, isLoading, error } = useGetSubscriptions({
    search,
    page,
    pageSize,
  });
  const [open, setOpen] = useState(false);

  // Handle pagination changes
  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", newPage.toString());
    params.set("pageSize", newPageSize.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  const pagination = {
    page,
    pageSize,
    total: data.total,
    pageCount: data.pageCount,
  };

  return (
    <div className="container w-full mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-bold">Subscriptions</h1>
      <div className="flex items-center justify-between">
        <TableSearch showButton={false} />

        <Dialog open={open} onOpenChange={setOpen}>
          {/* <DialogTitle>Add Subscription</DialogTitle> */}
          <DialogTrigger>
            <Button>
              <AddCircle size={24} />
              <span className="text-sm font-medium">Add Subscription</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <SubscriptionsForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        columns={columns}
        data={data.data}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
      />

      {/* <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <SubscriptionsForm />
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default MainSubscriptions;
