import React from "react";
import { getUser } from "@/services/auth/auth";
import { getAIInsightsServer } from "@/services/ai/get-ai-insights-server";
import {
  AISummaryCard,
  InsightsStatsCards,
  SubscriptionReviewCard,
  CheaperAlternativesCard,
  OverlapAlertsCard,
  SpendingAnomaliesCard,
  CategoryForecastCard,
} from "@/components/insights";

const InsightsPage = async () => {
  const { user } = await getUser();

  if (!user?.id) {
    return <div>User not found</div>;
  }

  const insights = await getAIInsightsServer(user.id);

  return (
    <div className="p-6 space-y-6">
      <AISummaryCard optimizationAdvice={insights.optimization_advice} />

      <InsightsStatsCards
        savingsProjection={insights.savings_projection}
        churnLikelihood={insights.churn_likelihood}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SubscriptionReviewCard renewalRisks={insights.renewal_risks} />
        <CheaperAlternativesCard
          substitutionSuggestions={insights.substitution_suggestions}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverlapAlertsCard
          overlappingServices={insights.overlapping_services}
        />
        <SpendingAnomaliesCard
          spendingAnomalies={insights.spending_anomalies}
        />
      </div>

      <CategoryForecastCard
        categoryShiftPrediction={insights.category_shift_prediction}
      />
    </div>
  );
};

export default InsightsPage;
