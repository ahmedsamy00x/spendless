import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface AISummaryCardProps {
  optimizationAdvice: string;
}

export const AISummaryCard = ({ optimizationAdvice }: AISummaryCardProps) => {
  return (
    <Card className="bg-status-trial">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-lg">AI Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700">
          {optimizationAdvice || "No insights available"}
        </p>
      </CardContent>
    </Card>
  );
};
