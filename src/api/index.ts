import OpenAI from "openai";
import { Analysis } from "../types";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function analyzeQuery(query: string): Promise<Analysis | null> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an AI that generates detailed and structured analyses of news articles based on their headlines. Return the response strictly in the following JSON format:",
        },
        {
          role: "system",
          content:
            '{\n  "summary": "string",\n  "positive_perspective": "string",\n  "negative_perspective": "string",\n  "sentiment": "string", // positive, neutral, negative\n  "conclusion": "string",\n  "contextual_expansion": "string",\n  "impact_analysis": "string",\n  "question_answer": {\n    "question": "string",\n    "answer": "string"\n  },\n  "alternative_perspectives": "string",\n  "generated_opinion": "string",\n  "sentiment_based_content": "string",\n  "actionable_insights": "string",\n  "predictive_analysis": "string",\n  "ethical_considerations": "string",\n  "interactive_scenarios": {\n    "scenario": "string",\n    "outcome": "string"\n  }\n}',
        },
        {
          role: "user",
          content: query,
        },
      ],
    });

    const messageContent = completion.choices[0].message?.content;

    if (messageContent) {
      const analysis: Analysis = JSON.parse(messageContent);
      return analysis;
    }

    return null;
  } catch (error) {
    console.error("Error in analyzeQuery:", error);
    return null;
  }
}

export async function fetchTopHeadlines() {
  const url = import.meta.env.VITE_NEWSAPI_URL;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    return null;
  }
}
