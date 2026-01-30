import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: [true, 'Please provide an item ID'],
      unique: true,
      trim: true,
    },
    itemName: {
      type: String,
      required: [true, 'Please provide an item name'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Electronics', 'Clothing', 'Food', 'Books', 'Other'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide quantity'],
      default: 0,
    },
    reorderLevel: {
      type: Number,
      required: [true, 'Please provide reorder level'],
      default: 10,
    },
    price: {
      type: Number,
      required: [true, 'Please provide price'],
    },
    supplierName: {
      type: String,
      required: [true, 'Please provide supplier name'],
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['in-stock', 'low-stock', 'out-of-stock'],
      default: 'in-stock',
    },
  },
  { timestamps: true }
);

// Update status based on quantity
inventorySchema.pre('save', function (next) {
  if (this.quantity === 0) {
    this.status = 'out-of-stock';
  } else if (this.quantity <= this.reorderLevel) {
    this.status = 'low-stock';
  } else {
    this.status = 'in-stock';
  }
  next();
});

export default mongoose.model('Inventory', inventorySchema);
