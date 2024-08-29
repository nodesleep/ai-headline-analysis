export type Analysis = {
  summary: string;
  positive_perspective: string;
  negative_perspective: string;
  sentiment: "positive" | "neutral" | "negative";
  conclusion: string;
  contextual_expansion: string;
  impact_analysis: string;
  question_answer: {
    question: string;
    answer: string;
  };
  alternative_perspectives: string;
  generated_opinion: string;
  sentiment_based_content: string;
  actionable_insights: string;
  predictive_analysis: string;
  ethical_considerations: string;
  interactive_scenarios: {
    scenario: string;
    outcome: string;
  };
};
