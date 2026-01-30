import PurchaseBill from '../models/PurchaseBill.js';

export const purchaseBillService = {
  async getAllBills(filters = {}) {
    const query = PurchaseBill.find().populate('items.itemId');

    if (filters.status) {
      query.where('status').equals(filters.status);
    }

    if (filters.supplierName) {
      query.where('supplierName').regex(filters.supplierName, 'i');
    }

    const bills = await query.sort('-createdAt');
    return bills;
  },

  async getBillById(id) {
    const bill = await PurchaseBill.findById(id).populate('items.itemId');
    if (!bill) {
      throw new Error('Purchase bill not found');
    }
    return bill;
  },

  async createBill(billData) {
    const bill = await PurchaseBill.create(billData);
    return await bill.populate('items.itemId');
  },

  async updateBill(id, updateData) {
    const bill = await PurchaseBill.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate('items.itemId');

    if (!bill) {
      throw new Error('Purchase bill not found');
    }
    return bill;
  },

  async deleteBill(id) {
    const bill = await PurchaseBill.findByIdAndDelete(id);
    if (!bill) {
      throw new Error('Purchase bill not found');
    }
    return bill;
  },

  async getBillStats() {
    const totalBills = await PurchaseBill.countDocuments();
    const pendingBills = await PurchaseBill.countDocuments({ status: 'pending' });
    const paidBills = await PurchaseBill.countDocuments({ status: 'paid' });
    const totalAmount = await PurchaseBill.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' },
        },
      },
    ]);

    return {
      totalBills,
      pendingBills,
      paidBills,
      totalAmount: totalAmount[0]?.total || 0,
    };
  },
};
