import DashboardStats from '../models/DashboardStats.js';
import Inventory from '../models/Inventory.js';
import User from '../models/User.js';
import PurchaseBill from '../models/PurchaseBill.js';

export const dashboardService = {
  async getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let stats = await DashboardStats.findOne({ date: today });

    if (!stats) {
      // Calculate stats from scratch
      const totalUsers = await User.countDocuments();
      const inventoryStats = await Inventory.aggregate([
        {
          $group: {
            _id: null,
            totalValue: { $sum: { $multiply: ['$quantity', '$price'] } },
            lowStockCount: {
              $sum: { $cond: [{ $eq: ['$status', 'low-stock'] }, 1, 0] },
            },
          },
        },
      ]);

      const billStats = await PurchaseBill.aggregate([
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalAmount: { $sum: '$totalAmount' },
          },
        },
      ]);

      stats = await DashboardStats.create({
        date: today,
        weeklySale: {
          value: billStats[0]?.totalAmount || 1234,
          percentageChange: 40,
        },
        redStock: {
          value: inventoryStats[0]?.lowStockCount || 141,
          percentageChange: -10,
        },
        newUsers: {
          value: totalUsers,
          percentageChange: 40,
        },
        totalInventoryValue: inventoryStats[0]?.totalValue || 0,
        totalOrders: billStats[0]?.totalOrders || 0,
      });
    }

    return stats;
  },

  async getChartData(days = 7) {
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const statData = await DashboardStats.findOne({ date });
      data.push({
        date: date.toISOString().split('T')[0],
        sales: statData?.weeklySale.value || Math.floor(Math.random() * 2000) + 1000,
        stock: statData?.redStock.value || Math.floor(Math.random() * 200) + 100,
        users: statData?.newUsers.value || Math.floor(Math.random() * 300) + 200,
      });
    }
    return data;
  },
};
