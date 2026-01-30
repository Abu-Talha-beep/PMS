import mongoose from 'mongoose';

const purchaseBillSchema = new mongoose.Schema(
  {
    billNumber: {
      type: String,
      required: [true, 'Please provide a bill number'],
      unique: true,
    },
    supplierName: {
      type: String,
      required: [true, 'Please provide supplier name'],
    },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Inventory',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        unitPrice: {
          type: Number,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    billDate: {
      type: Date,
      required: [true, 'Please provide bill date'],
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'overdue'],
      default: 'pending',
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('PurchaseBill', purchaseBillSchema);
