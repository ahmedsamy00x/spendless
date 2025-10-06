import React from "react";

const DashboardWidgetTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm font-normal text-muted-foreground">{description}</p>
    </div>
  );
};

export default DashboardWidgetTitle;
