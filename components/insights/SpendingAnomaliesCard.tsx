import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";

interface SpendingAnomaliesCardProps {
  spendingAnomalies: string[];
}

export const SpendingAnomaliesCard = ({
  spendingAnomalies,
}: SpendingAnomaliesCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-red-500" />
          <CardTitle className="text-lg">Spending Anomalies</CardTitle>
        </div>
        <CardDescription>
          Unusual spending patterns detected in your subscriptions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {spendingAnomalies && spendingAnomalies.length > 0 ? (
          spendingAnomalies.map((anomaly: string, index: number) => (
            <div
              key={index}
              className="border-b last:border-b-0 pb-4 last:pb-0"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm">High Cost Detected</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {anomaly}
                  </div>
                </div>
                <Badge variant="destructive" className="text-xs">
                  Alert
                </Badge>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No spending anomalies detected
          </p>
        )}
      </CardContent>
    </Card>
  );
};
