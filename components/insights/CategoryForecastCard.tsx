import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CategoryForecastCardProps {
  categoryShiftPrediction: string;
}

export const CategoryForecastCard = ({
  categoryShiftPrediction,
}: CategoryForecastCardProps) => {
  if (!categoryShiftPrediction) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Category Cost Forecast</CardTitle>
        <CardDescription>
          Projected spending distribution across categories for next month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700">{categoryShiftPrediction}</p>
      </CardContent>
    </Card>
  );
};
