import supabase from "@/services/supabase/client";
import React from "react";
import { DataTable } from "./data-table";
import { columns, Subscription } from "./columns";
import { Button } from "@/components/ui/button";
import { AddCircle } from "iconsax-reactjs";
import TableSearch from "@/components/table-search";

async function getData(): Promise<Subscription[]> {
  const { data, error } = await supabase.from("subscriptions").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

const page = async () => {
  const data = await getData();
  console.log(data);
  return (
    <div className="container w-full mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-bold">Subscriptions</h1>
      <div className="flex items-center justify-between">
        <TableSearch showButton={false} />
        <Button>
          <AddCircle size={24} />
          <span className="text-sm font-medium">Add Subscription</span>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default page;
