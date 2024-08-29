// stores/newsStore.ts
import { defineStore } from 'pinia';
import { analyzeQuery } from '../api';
import type { Analysis } from '../types';

export const useQueryStore = defineStore('query', {
  state: () => ({
    analysis: null as Analysis | null,
    loading: false,
    error: null as string | null,
  }),
  
  actions: {
    async fetchAnalysis(query: string) {
      this.loading = true;
      this.error = null;
      try {
        const result = await analyzeQuery(query);
        this.analysis = result;
      } catch (error) {
        this.error = 'Failed to analyze query';
        console.error('Error in fetchAnalysis:', error);
      } finally {
        this.loading = false;
      }
    }
  }
});
