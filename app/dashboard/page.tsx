// import { MainDashboard } from "@/components";
import MainDashboard from "@/components/dashboard/MainDashboard";
import { getSession } from "@/lib/session";
import React from "react";

const page = async () => {
  const session = await getSession();
  console.log(session, "session");

  return (
    <div>
      <MainDashboard />
    </div>
  );
};

export default page;
