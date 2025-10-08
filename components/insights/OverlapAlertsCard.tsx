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

interface OverlapAlertsCardProps {
  overlappingServices: string[];
}

export const OverlapAlertsCard = ({
  overlappingServices,
}: OverlapAlertsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-orange-500" />
          <CardTitle className="text-lg">Subscription Overlap Alerts</CardTitle>
        </div>
        <CardDescription>
          Consolidate duplicate services to reduce unnecessary spending.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {overlappingServices && overlappingServices.length > 0 ? (
          overlappingServices.map((overlap: string, index: number) => (
            <div
              key={index}
              className="border-b last:border-b-0 pb-4 last:pb-0"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    {overlap.includes("entertainment")
                      ? "Entertainment Services"
                      : overlap.includes("music")
                      ? "Music Subscriptions"
                      : "Service Overlap"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {overlap}
                  </div>
                </div>
                <Badge variant="warning" className="text-xs">
                  Overlap
                </Badge>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No overlapping subscriptions detected
          </p>
        )}
      </CardContent>
    </Card>
  );
};
