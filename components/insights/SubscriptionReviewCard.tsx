import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

interface SubscriptionReviewCardProps {
  renewalRisks: string[];
}

export const SubscriptionReviewCard = ({
  renewalRisks,
}: SubscriptionReviewCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          <CardTitle className="text-lg">Subscription Review</CardTitle>
        </div>
        <CardDescription>
          Identify and cancel or modify subscriptions you no longer use or
          rarely access.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {renewalRisks && renewalRisks.length > 0 ? (
          renewalRisks.map((risk: string, index: number) => (
            <div
              key={index}
              className="border-b last:border-b-0 pb-4 last:pb-0"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    {risk.split("-")[0].trim()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {risk.includes("trial")
                      ? "Trial expiring soon"
                      : "Review needed"}
                  </div>
                </div>
                <Badge variant="warning" className="text-xs">
                  Review Soon
                </Badge>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No subscriptions need immediate review
          </p>
        )}
      </CardContent>
    </Card>
  );
};
