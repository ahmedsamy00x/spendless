import gemini from "./gemini";

export async function getInsight(prompt: string): Promise<string> {
  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  });
  // response format has candidates etc.
  return response.candidates?.[0]?.content?.parts?.[0]?.text || "";
}
