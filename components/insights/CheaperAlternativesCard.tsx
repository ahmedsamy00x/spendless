import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown } from "lucide-react";

interface CheaperAlternativesCardProps {
  substitutionSuggestions: string[];
}

export const CheaperAlternativesCard = ({
  substitutionSuggestions,
}: CheaperAlternativesCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5" />
          <CardTitle className="text-lg">
            Cheaper Alternatives Detected
          </CardTitle>
        </div>
        <CardDescription>
          Explore lower-cost or cost-effective options for your essential
          services.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {substitutionSuggestions && substitutionSuggestions.length > 0 ? (
          substitutionSuggestions.map((suggestion: string, index: number) => (
            <div
              key={index}
              className="border-b last:border-b-0 pb-4 last:pb-0"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    {suggestion.includes("entertainment")
                      ? "Entertainment Services"
                      : suggestion.includes("software")
                      ? "Software Subscriptions"
                      : "Alternative Option"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {suggestion}
                  </div>
                </div>
                <Badge variant="success" className="text-xs">
                  Save Money
                </Badge>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No cheaper alternatives found
          </p>
        )}
      </CardContent>
    </Card>
  );
};
