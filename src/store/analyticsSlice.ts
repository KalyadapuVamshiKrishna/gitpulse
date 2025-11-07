import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AnalyticsData {
  totalCommits: number;
  totalRepos: number;
  totalStars: number;
  totalPRs: number;
  commitTrend: { date: string; commits: number }[];
  languageDistribution: { name: string; value: number }[];
  weeklyActivity: { day: string; commits: number; prs: number }[];
}

interface AnalyticsState {
  data: AnalyticsData | null;
  loading: boolean;
}

const initialState: AnalyticsState = {
  data: null,
  loading: false,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setAnalyticsData: (state, action: PayloadAction<AnalyticsData>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setAnalyticsData, setLoading } = analyticsSlice.actions;
export default analyticsSlice.reducer;
