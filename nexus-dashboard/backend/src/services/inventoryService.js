import Inventory from '../models/Inventory.js';

export const inventoryService = {
  async getAllInventory(filters = {}) {
    const query = Inventory.find();

    if (filters.status) {
      query.where('status').equals(filters.status);
    }

    if (filters.category) {
      query.where('category').equals(filters.category);
    }

    const items = await query.sort('-createdAt');
    return items;
  },

  async getInventoryById(id) {
    const item = await Inventory.findById(id);
    if (!item) {
      throw new Error('Inventory item not found');
    }
    return item;
  },

  async createInventory(itemData) {
    const item = await Inventory.create(itemData);
    return item;
  },

  async updateInventory(id, updateData) {
    const item = await Inventory.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      throw new Error('Inventory item not found');
    }
    return item;
  },

  async deleteInventory(id) {
    const item = await Inventory.findByIdAndDelete(id);
    if (!item) {
      throw new Error('Inventory item not found');
    }
    return item;
  },

  async getLowStockItems() {
    const items = await Inventory.find({ status: 'low-stock' });
    return items;
  },

  async getInventoryStats() {
    const totalItems = await Inventory.countDocuments();
    const lowStockCount = await Inventory.countDocuments({ status: 'low-stock' });
    const outOfStockCount = await Inventory.countDocuments({ status: 'out-of-stock' });
    const totalValue = await Inventory.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ['$quantity', '$price'] } },
        },
      },
    ]);

    return {
      totalItems,
      lowStockCount,
      outOfStockCount,
      totalValue: totalValue[0]?.total || 0,
    };
  },
};
