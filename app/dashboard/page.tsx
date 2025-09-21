import { getSession } from "@/lib/session";
import React from "react";

const page = async () => {
  const session = await getSession();
  console.log(session, "session");

  return <div>XXX</div>;
};

export default page;
