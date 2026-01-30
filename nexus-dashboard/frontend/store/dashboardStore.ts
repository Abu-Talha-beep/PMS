import { create } from 'zustand';

interface DashboardStats {
  weeklySale: { value: number; percentageChange: number };
  redStock: { value: number; percentageChange: number };
  newUsers: { value: number; percentageChange: number };
}

interface DashboardStore {
  stats: DashboardStats | null;
  chartData: any[] | null;
  setStats: (stats: DashboardStats) => void;
  setChartData: (data: any[]) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  stats: null,
  chartData: null,
  setStats: (stats) => set({ stats }),
  setChartData: (chartData) => set({ chartData }),
}));
