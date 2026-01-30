'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Alert from '@/components/Alert';
import { useAuthStore } from '@/store/authStore';
import { inventoryService } from '@/services/inventoryService';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

interface InventoryItem {
  _id: string;
  itemId: string;
  itemName: string;
  category: string;
  quantity: number;
  price: number;
  supplierName: string;
  status: string;
}

export default function InventoryPage() {
  const router = useRouter();
  const { isAuthenticated, hydrate } = useAuthStore();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    itemId: '',
    itemName: '',
    category: 'Electronics',
    quantity: 0,
    reorderLevel: 10,
    price: 0,
    supplierName: '',
  });

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    fetchInventory();
  }, [isAuthenticated, router]);

  const fetchInventory = async () => {
    try {
      const response = await inventoryService.getAll();
      setItems(response.data || []);
    } catch (err: any) {
      setError('Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await inventoryService.create(formData);
      setFormData({ itemId: '', itemName: '', category: 'Electronics', quantity: 0, reorderLevel: 10, price: 0, supplierName: '' });
      setShowForm(false);
      fetchInventory();
    } catch (err: any) {
      setError('Failed to create item');
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (confirm('Are you sure?')) {
      try {
        await inventoryService.delete(id);
        fetchInventory();
      } catch (err: any) {
        setError('Failed to delete item');
      }
    }
  };

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Inventory Management" subtitle="Manage your inventory items and stock levels" />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-6">
            {error && <Alert variant="error" title="Error" message={error} onClose={() => setError(null)} />}

            {/* Controls */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-gray-200">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by item ID or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 outline-none text-gray-700"
                />
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                <Plus size={18} />
                Add Item
              </button>
            </div>

            {/* Add Item Form */}
            {showForm && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Item</h3>
                <form onSubmit={handleCreateItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Item ID"
                    value={formData.itemId}
                    onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={formData.itemName}
                    onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Food">Food</option>
                    <option value="Books">Books</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                  <input
                    type="text"
                    placeholder="Supplier Name"
                    value={formData.supplierName}
                    onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                  <button
                    type="submit"
                    className="col-span-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg"
                  >
                    Create Item
                  </button>
                </form>
              </div>
            )}

            {/* Items Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {loading ? (
                <div className="p-8 text-center text-gray-600">Loading...</div>
              ) : filteredItems.length === 0 ? (
                <div className="p-8 text-center text-gray-600">No items found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Item ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Supplier</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredItems.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.itemId}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.itemName}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.category}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.quantity}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">${item.price.toFixed(2)}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.supplierName}</td>
                          <td className="px-6 py-4 text-sm">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                item.status === 'in-stock'
                                  ? 'bg-green-100 text-green-800'
                                  : item.status === 'low-stock'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item._id)}
                              className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
