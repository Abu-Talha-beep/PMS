'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import Chart from '@/components/Chart';
import Alert from '@/components/Alert';
import { useAuthStore } from '@/store/authStore';
import { useDashboardStore } from '@/store/dashboardStore';
import { dashboardService } from '@/services/dashboardService';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, hydrate } = useAuthStore();
  const { stats, setStats, chartData, setChartData } = useDashboardStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const statsData = await dashboardService.getStats();
        setStats(statsData.data);

        const chartDataResponse = await dashboardService.getChartData(7);
        setChartData(chartDataResponse.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, router, setStats, setChartData]);

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-8">
            <div className="text-center">Loading...</div>
          </main>
        </div>
      </div>
    );
  }

  const saleChartData = [
    { value: 1000 },
    { value: 1200 },
    { value: 1100 },
    { value: 1300 },
    { value: 1234 },
    { value: 1250 },
    { value: 1400 },
  ];

  const stockChartData = [
    { value: 155 },
    { value: 150 },
    { value: 145 },
    { value: 142 },
    { value: 141 },
    { value: 140 },
    { value: 138 },
  ];

  const usersChartData = [
    { value: 200 },
    { value: 215 },
    { value: 220 },
    { value: 235 },
    { value: 240 },
    { value: 241 },
    { value: 242 },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-8">
            {error && <Alert variant="error" title="Error" message={error} onClose={() => setError(null)} />}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Weekly Sale"
                value={stats?.weeklySale.value || '1,234'}
                change={stats?.weeklySale.percentageChange || 40}
                data={saleChartData}
                color="#ec4899"
              />
              <StatCard
                title="Red Stock"
                value={stats?.redStock.value || 141}
                change={stats?.redStock.percentageChange || -10}
                data={stockChartData}
                color="#ef4444"
              />
              <StatCard
                title="No of New Users"
                value={stats?.newUsers.value || 242}
                change={stats?.newUsers.percentageChange || 40}
                data={usersChartData}
                color="#06b6d4"
              />
            </div>

            {/* Chart */}
            {chartData && chartData.length > 0 && <Chart data={chartData} type="area" title="7-Day Analytics" />}

            {/* Inventory Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Inventory Overview</h2>
                <a href="/inventory" className="text-pink-500 hover:text-pink-600 font-semibold text-sm">
                  View All →
                </a>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">1,234</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Low Stock</p>
                  <p className="text-2xl font-bold text-yellow-600 mt-2">45</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-600 mt-2">12</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
