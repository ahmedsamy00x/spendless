import React from "react";
import { getUser } from "@/services/auth/auth";
import { getAIInsightsServer } from "@/services/ai/get-ai-insights-server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingDown, Bell, DollarSign } from "lucide-react";

const InsightsPage = async () => {
  const { user } = await getUser();

  if (!user?.id) {
    return <div>User not found</div>;
  }

  const insights = await getAIInsightsServer(user.id);

  return (
    <div className="p-6 space-y-6">
      {/* AI Summary */}
      <Card className="bg-status-trial">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">AI Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">
            {insights.optimization_advice || "No insights available"}
          </p>
        </CardContent>
      </Card>

      {/* Top Stats Row */}
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
              {insights.savings_projection?.match(/\$[\d,]+/)?.[0] || "$0.00"}
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
              {insights.savings_projection?.match(/\$[\d,]+/g)?.[1] || "$0.00"}
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
              {insights.churn_likelihood?.includes("High")
                ? "High"
                : insights.churn_likelihood?.includes("Medium")
                ? "Medium"
                : "Low"}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {insights.churn_likelihood || "No data"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row - Subscription Review and Cheaper Alternatives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscription Review */}
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
            {insights.renewal_risks && insights.renewal_risks.length > 0 ? (
              insights.renewal_risks.map((risk: string, index: number) => (
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

        {/* Cheaper Alternatives Detected */}
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
            {insights.substitution_suggestions &&
            insights.substitution_suggestions.length > 0 ? (
              insights.substitution_suggestions.map(
                (suggestion: string, index: number) => (
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
                )
              )
            ) : (
              <p className="text-sm text-muted-foreground">
                No cheaper alternatives found
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscription Overlap Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-500" />
              <CardTitle className="text-lg">
                Subscription Overlap Alerts
              </CardTitle>
            </div>
            <CardDescription>
              Consolidate duplicate services to reduce unnecessary spending.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.overlapping_services &&
            insights.overlapping_services.length > 0 ? (
              insights.overlapping_services.map(
                (overlap: string, index: number) => (
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
                )
              )
            ) : (
              <p className="text-sm text-muted-foreground">
                No overlapping subscriptions detected
              </p>
            )}
          </CardContent>
        </Card>

        {/* Spending Anomalies */}
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
            {insights.spending_anomalies &&
            insights.spending_anomalies.length > 0 ? (
              insights.spending_anomalies.map(
                (anomaly: string, index: number) => (
                  <div
                    key={index}
                    className="border-b last:border-b-0 pb-4 last:pb-0"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          High Cost Detected
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {anomaly}
                        </div>
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        Alert
                      </Badge>
                    </div>
                  </div>
                )
              )
            ) : (
              <p className="text-sm text-muted-foreground">
                No spending anomalies detected
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Category Prediction */}
      {insights.category_shift_prediction && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Category Cost Forecast</CardTitle>
            <CardDescription>
              Projected spending distribution across categories for next month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              {insights.category_shift_prediction}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InsightsPage;
