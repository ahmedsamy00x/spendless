import { GoogleGenAI } from "@google/genai";
import { createServerClient } from "../supabase/server";
import { AIInsights } from "../types/insights";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function getAIInsightsServer(userId: string): Promise<AIInsights> {
  try {
    // Create server-side Supabase client with auth session
    const supabase = await createServerClient();

    // 1️⃣ Fetch user subscriptions
    const { data: subscriptions, error } = await supabase
      .from("subscriptions")
      .select(
        "name, category, cost, status, frequency, start_date, renewal_date, created_at"
      )
      .eq("user_id", userId);

    if (error) throw error;

    // 2️⃣ Fetch historical spend (optional – build a simple query)
    const { data: historical } = await supabase.rpc("get_historical_spending", {
      user_id: userId,
    });

    const payload = {
      month: new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),
      subscriptions,
      historical_spending: historical || {},
    };

    // 3️⃣ Define prompt for Gemini
    const prompt = `
You are an AI financial assistant that helps users reduce unnecessary subscription costs.

Given the following JSON data about a user's subscriptions and historical spending,
analyze and return a single JSON object with ONLY predictive and optimization insights.

Required JSON keys:
{
  "overlapping_services": string[],
  "spending_anomalies": string[],
  "renewal_risks": string[],
  "savings_projection": string,
  "optimization_advice": string,
  "category_shift_prediction": string,
  "substitution_suggestions": string[],
  "churn_likelihood": string
}

Return ONLY valid JSON with these keys. Do not include explanations or markdown.

Here is the data:
${JSON.stringify(payload)}
    `;

    // 4️⃣ Send to Gemini
    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ parts: [{ text: prompt }] }],
    });

    const text = result.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";

    // 5️⃣ Clean and parse JSON (remove markdown code fences if present)
    let cleanedText = text.trim();

    // Remove markdown code fences (```json ... ``` or ``` ... ```)
    if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText
        .replace(/^```(?:json)?\n?/, "")
        .replace(/\n?```$/, "");
    }

    let insights;
    try {
      insights = JSON.parse(cleanedText);
    } catch {
      insights = { error: "AI returned invalid JSON", raw: text };
    }

    return insights;
  } catch (err) {
    console.error("AI insights error:", err);
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
