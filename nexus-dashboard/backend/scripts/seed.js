import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';
import Inventory from '../src/models/Inventory.js';
import PurchaseBill from '../src/models/PurchaseBill.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Inventory.deleteMany({});
    await PurchaseBill.deleteMany({});
    console.log('Cleared existing data');

    // Create demo users
    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@nexus.com',
        password: 'password123',
        role: 'admin',
        department: 'Management',
        isActive: true,
      },
      {
        name: 'Staff User',
        email: 'staff@nexus.com',
        password: 'password123',
        role: 'staff',
        department: 'Inventory',
        isActive: true,
      },
      {
        name: 'Manoj Kumar',
        email: 'manoj@nexus.com',
        password: 'password123',
        role: 'staff',
        department: 'Sales',
        isActive: true,
      },
    ]);
    console.log('✅ Created 3 demo users');

    // Create demo inventory items
    const inventoryItems = await Inventory.create([
      {
        itemId: 'INV001',
        itemName: 'Laptop',
        category: 'Electronics',
        quantity: 25,
        reorderLevel: 10,
        price: 1299.99,
        supplierName: 'Tech Supplies Co',
        status: 'in-stock',
      },
      {
        itemId: 'INV002',
        itemName: 'USB Mouse',
        category: 'Electronics',
        quantity: 5,
        reorderLevel: 20,
        price: 19.99,
        supplierName: 'Tech Supplies Co',
        status: 'low-stock',
      },
      {
        itemId: 'INV003',
        itemName: 'Wireless Keyboard',
        category: 'Electronics',
        quantity: 15,
        reorderLevel: 10,
        price: 79.99,
        supplierName: 'Tech Supplies Co',
        status: 'in-stock',
      },
      {
        itemId: 'INV004',
        itemName: 'Monitor 24"',
        category: 'Electronics',
        quantity: 0,
        reorderLevel: 5,
        price: 349.99,
        supplierName: 'Display Distributors',
        status: 'out-of-stock',
      },
      {
        itemId: 'INV005',
        itemName: 'Office Chair',
        category: 'Electronics',
        quantity: 40,
        reorderLevel: 15,
        price: 199.99,
        supplierName: 'Office Furniture Inc',
        status: 'in-stock',
      },
      {
        itemId: 'INV006',
        itemName: 'Desk Lamp',
        category: 'Electronics',
        quantity: 8,
        reorderLevel: 10,
        price: 49.99,
        supplierName: 'Lighting Solutions',
        status: 'low-stock',
      },
      {
        itemId: 'INV007',
        itemName: 'Webcam HD',
        category: 'Electronics',
        quantity: 12,
        reorderLevel: 8,
        price: 89.99,
        supplierName: 'Tech Supplies Co',
        status: 'in-stock',
      },
      {
        itemId: 'INV008',
        itemName: 'USB Hub',
        category: 'Electronics',
        quantity: 3,
        reorderLevel: 15,
        price: 39.99,
        supplierName: 'Tech Supplies Co',
        status: 'low-stock',
      },
    ]);
    console.log('✅ Created 8 demo inventory items');

    // Create demo purchase bills
    await PurchaseBill.create([
      {
        billNumber: 'BILL001',
        supplierName: 'Tech Supplies Co',
        items: [
          {
            itemId: inventoryItems[0]._id,
            quantity: 5,
            unitPrice: 1299.99,
            totalPrice: 6499.95,
          },
          {
            itemId: inventoryItems[1]._id,
            quantity: 10,
            unitPrice: 19.99,
            totalPrice: 199.90,
          },
        ],
        totalAmount: 6699.85,
        billDate: new Date('2024-01-15'),
        dueDate: new Date('2024-02-15'),
        status: 'paid',
      },
      {
        billNumber: 'BILL002',
        supplierName: 'Office Furniture Inc',
        items: [
          {
            itemId: inventoryItems[4]._id,
            quantity: 10,
            unitPrice: 199.99,
            totalPrice: 1999.90,
          },
        ],
        totalAmount: 1999.90,
        billDate: new Date('2024-01-20'),
        dueDate: new Date('2024-02-20'),
        status: 'pending',
      },
      {
        billNumber: 'BILL003',
        supplierName: 'Display Distributors',
        items: [
          {
            itemId: inventoryItems[3]._id,
            quantity: 8,
            unitPrice: 349.99,
            totalPrice: 2799.92,
          },
        ],
        totalAmount: 2799.92,
        billDate: new Date('2024-01-10'),
        dueDate: new Date('2024-02-10'),
        status: 'overdue',
      },
      {
        billNumber: 'BILL004',
        supplierName: 'Tech Supplies Co',
        items: [
          {
            itemId: inventoryItems[2]._id,
            quantity: 20,
            unitPrice: 79.99,
            totalPrice: 1599.80,
          },
          {
            itemId: inventoryItems[6]._id,
            quantity: 5,
            unitPrice: 89.99,
            totalPrice: 449.95,
          },
        ],
        totalAmount: 2049.75,
        billDate: new Date('2024-01-25'),
        dueDate: new Date('2024-02-25'),
        status: 'pending',
      },
    ]);
    console.log('✅ Created 4 demo purchase bills');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nDemo Credentials:');
    console.log('Email: admin@nexus.com');
    console.log('Password: password123');
    console.log('\nOr use staff@nexus.com for staff access');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
