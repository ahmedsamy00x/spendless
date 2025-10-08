import { useQuery } from "@tanstack/react-query";

export async function fetchInsights(userId: string) {
  const res = await fetch(`/api/ai-insights?user_id=${userId}`);
  const { insights } = await res.json();
  return insights;
}

export const useGetAiInsights = (userId: string) => {
  return useQuery({
    queryKey: ["ai-insights", userId],
    queryFn: () => fetchInsights(userId),
  });
};
