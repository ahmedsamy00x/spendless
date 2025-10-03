import React from "react";

const DashboardStatsCard = ({
  title,
  value,
  subtitle,
  isPrice,
}: {
  title: string;
  value: number;
  subtitle: string;
  isPrice?: boolean;
}) => {
  return (
    <div className="bg-foreground/10 shadow-sm p-3 rounded-2xl flex flex-col gap-2.5">
      <div>
        <h3 className="text-lg text-muted-foreground font-medium">{title}</h3>
        <div className="text-3xl font-montserrat font-bold">
          {isPrice ? `$${value.toFixed(2)}` : value}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
};

export default DashboardStatsCard;
