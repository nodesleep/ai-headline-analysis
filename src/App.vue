<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchTopHeadlines } from "./api";
import { useQueryStore } from "./stores/queryStore.ts";

const newsArticles = ref({});
const queryStore = useQueryStore();
const activeArticleIndex = ref<number | null>(null);

function getSentimentClass(sentiment: string) {
  switch (sentiment) {
    case "positive":
      return "text-green-500";
    case "neutral":
      return "text-purple-500";
    case "negative":
      return "text-red-500";
    default:
      return "text-black";
  }
}

function analyze(arg: string, index: number) {
  activeArticleIndex.value = index;
  queryStore.analysis = null;
  queryStore.fetchAnalysis(arg);
}

onMounted(() => {
  fetchTopHeadlines().then((res) => {
    newsArticles.value = res;
  });
});
</script>

<template>
  <div class="flex min-h-screen w-full dark:bg-neutral-900 dark:text-white">
    <div class="flex w-full 2xl:w-[90rem] mx-auto">
      <div class="flex flex-grow p-6 gap-3">
        <div class="w-1/2">
          <h1 class="font-bold text-xl uppercase">Latest headlines</h1>
          <ul class="flex flex-col gap-6 border-2 border-black dark:border-white p-2">
            <li
              v-for="(article, index) in newsArticles.articles"
              :key="article.publishedAt"
              @click="analyze(article.title, index)"
              :class="{
                'text-sm underline font-bold cursor-pointer': true,
                'bg-emerald-100 text-emerald-600': activeArticleIndex === index, // Active styling
              }"
            >
              {{ article.title }}
            </li>
          </ul>
        </div>
        <div class="w-1/2">
          <div class="flex">
            <h1 class="font-bold text-xl uppercase" v-if="!queryStore.loading">
              Analysis
            </h1>
            <div
              v-if="queryStore.loading"
              class="px-3 py-1 mt-7 bg-emerald-600 animate-pulse text-white text-sm"
            >
              <p>Analyzing headline</p>
            </div>
          </div>
          <div
            v-if="queryStore.analysis"
            class="flex flex-col font-bold text-xs gap-3"
          >
            <div class="flex flex-col p-2 border-2 border-black dark:border-white">
              <h1 class="font-bold text-lg">Overview</h1>
              <p>{{ queryStore.analysis.summary }}</p>
            </div>
            <div class="flex flex-col p-2 border-2 border-black dark:border-white">
              <h1 class="font-bold text-lg">Context</h1>
              <p>{{ queryStore.analysis.contextual_expansion }}</p>
            </div>
            <div class="flex flex-col p-2 border-2 border-black dark:border-white">
              <h1 class="font-bold text-lg">Sentiment</h1>
              <p class="uppercase py-2" :class="getSentimentClass(queryStore.analysis.sentiment.toLowerCase())">
                {{ queryStore.analysis.sentiment }}
              </p>
              <p>{{ queryStore.analysis.sentiment_based_content }}</p>
            </div>
            <div class="flex flex-col p-2 border-2 border-black dark:border-white">
              <h1 class="font-bold text-lg">Impact</h1>
              <p>{{ queryStore.analysis.impact_analysis }}</p>
            </div>
            <div class="flex flex-col p-2 border-2 border-black dark:border-white">
              <h1 class="font-bold text-lg">Perspectives</h1>
              <p class="mb-3">
                Positive: {{ queryStore.analysis.positive_perspective }}
              </p>
              <p>Negative: {{ queryStore.analysis.negative_perspective }}</p>
            </div>
            <div class="flex flex-col p-2 border-2 border-black dark:border-white">
              <h1 class="font-bold text-lg">Alternative View</h1>
              <p>{{ queryStore.analysis.alternative_perspectives }}</p>
            </div>
            <div class="flex flex-col p-2 border-2 border-black dark:border-white">
              <h1 class="font-bold text-lg">Opinion</h1>
              <p>{{ queryStore.analysis.generated_opinion }}</p>
            </div>
            <div class="flex flex-col p-2 border-2 border-black dark:border-white">
              <h1 class="font-bold text-lg">Insights</h1>
              <p>{{ queryStore.analysis.actionable_insights }}</p>
            </div>
            <div class="flex flex-col p-2 border-2 border-black dark:border-white">
              <h1 class="font-bold text-lg">Predictive</h1>
              <p>{{ queryStore.analysis.predictive_analysis }}</p>
            </div>
            <div class="flex flex-col p-2 border-2 border-black dark:border-white">
              <h1 class="font-bold text-lg">Ethical Considerations</h1>
              <p>{{ queryStore.analysis.ethical_considerations }}</p>
            </div>
            <div class="flex flex-col p-2 border-2 border-black dark:border-white">
              <h1 class="font-bold text-lg">What if?</h1>
              <p>
                {{ queryStore.analysis.interactive_scenarios.scenario }}
                {{ queryStore.analysis.interactive_scenarios.outcome }}
              </p>
            </div>
            <div class="flex flex-col p-2 border-2 border-black dark:border-white">
              <h1 class="font-bold text-lg">Conclusion</h1>
              <p class="mb-3">{{ queryStore.analysis.conclusion }}</p>
              <p>
                {{ queryStore.analysis.question_answer.question }}
                {{ queryStore.analysis.question_answer.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
