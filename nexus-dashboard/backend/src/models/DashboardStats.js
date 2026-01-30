import mongoose from 'mongoose';

const dashboardStatsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    weeklySale: {
      value: Number,
      percentageChange: Number,
    },
    redStock: {
      value: Number,
      percentageChange: Number,
    },
    newUsers: {
      value: Number,
      percentageChange: Number,
    },
    totalInventoryValue: Number,
    totalOrders: Number,
  },
  { timestamps: true }
);

export default mongoose.model('DashboardStats', dashboardStatsSchema);
