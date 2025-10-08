import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

interface InsightsStatsCardsProps {
  savingsProjection: string;
  churnLikelihood: string;
}

export const InsightsStatsCards = ({
  savingsProjection,
  churnLikelihood,
}: InsightsStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Predicted Next Month Spending */}
      <Card>
        <CardHeader className="pb-3">
          <CardDescription className="text-sm font-medium">
            Predicted Next Month Spending
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {savingsProjection?.match(/\$[\d,]+/)?.[0] || "$0.00"}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Based on current subscriptions
          </p>
        </CardContent>
      </Card>

      {/* Savings Opportunities */}
      <Card>
        <CardHeader className="pb-3">
          <CardDescription className="text-sm font-medium">
            Savings Opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">
            {savingsProjection?.match(/\$[\d,]+/g)?.[1] || "$0.00"}
            /month
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Potential monthly savings
          </p>
        </CardContent>
      </Card>

      {/* Churn Likelihood */}
      <Card>
        <CardHeader className="pb-3">
          <CardDescription className="text-sm font-medium">
            Churn Risk Level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {churnLikelihood?.includes("High")
              ? "High"
              : churnLikelihood?.includes("Medium")
              ? "Medium"
              : "Low"}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {churnLikelihood || "No data"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
