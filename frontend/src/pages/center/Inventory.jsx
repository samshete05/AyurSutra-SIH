import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

export default function PanchakarmaInventory() {
  // Sample schema for an item
  const sampleItems = [
    {
      id: "oil-ksheerabala-01",
      name: "Ksheerabala Thailam",
      category: "Panchakarma Oils",
      unit: "ml",
      currentStock: 5000,
      minStock: 1000,
      maxStock: 10000,
      reorderQty: 5000,
      supplier: "AyurHerbs Co.",
      purchasePrice: 250,
      expiryDate: "2026-04-01",
      batch: "KB2025A",
      usagePerTherapy: { Abhyanga: 120, Shirodhara: 250 },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "ghrit-01",
      name: "Medicated Ghee (Anu Thailam)",
      category: "Ghee & Tailams",
      unit: "kg",
      currentStock: 20,
      minStock: 5,
      maxStock: 50,
      reorderQty: 20,
      supplier: "GheeMasters",
      purchasePrice: 1200,
      expiryDate: "2026-12-15",
      batch: "GHEE-34",
      usagePerTherapy: { Basti: 200 },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "herb-01",
      name: "Ashwagandha Powder",
      category: "Medicinal Herbs",
      unit: "kg",
      currentStock: 8,
      minStock: 10,
      maxStock: 30,
      reorderQty: 15,
      supplier: "Herbal Valley",
      purchasePrice: 850,
      expiryDate: "2025-08-30",
      batch: "ASH-2024B",
      usagePerTherapy: { Nasya: 50, Internal: 100 },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "oil-dhanwan-01",
      name: "Dhanwantaram Thailam",
      category: "Panchakarma Oils",
      unit: "ml",
      currentStock: 3200,
      minStock: 1500,
      maxStock: 8000,
      reorderQty: 4000,
      supplier: "AyurHerbs Co.",
      purchasePrice: 280,
      expiryDate: "2027-01-20",
      batch: "DHT-2025Q1",
      usagePerTherapy: { Abhyanga: 150, Pizhichil: 300 },
      lastUpdated: new Date().toISOString(),
    },
  ];

  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("panchakarma_inventory_v2");
      return raw ? JSON.parse(raw) : sampleItems;
    } catch (e) {
      return sampleItems;
    }
  });

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [showNearExpiryOnly, setShowNearExpiryOnly] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({});

  useEffect(() => {
    localStorage.setItem("panchakarma_inventory_v2", JSON.stringify(items));
    calculateStats();
  }, [items]);

  // Calculate statistics
  const calculateStats = () => {
    const lowStock = items.filter(i => i.currentStock <= i.minStock).length;
    const nearExpiry = items.filter(i => {
      if (!i.expiryDate) return false;
      const days = Math.ceil((new Date(i.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
      return days <= 90;
    }).length;
    const totalValue = items.reduce((sum, i) => sum + (i.currentStock * i.purchasePrice), 0);
    
    setStats({ lowStock, nearExpiry, totalValue, totalItems: items.length });
  };

  // Helpers
  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category)))];

  function addOrUpdateItem(data) {
    if (!data.id) data.id = `${data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
    setItems((prev) => {
      const exists = prev.find((p) => p.id === data.id);
      if (exists) {
        return prev.map((p) => (p.id === data.id ? { ...data, lastUpdated: new Date().toISOString() } : p));
      }
      return [{ ...data, lastUpdated: new Date().toISOString() }, ...prev];
    });
    setShowForm(false);
    setEditing(null);
  }

  function removeItem(id) {
    if (!confirm("Delete this item? This action cannot be undone.")) return;
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function consumeForTherapy(itemId, therapyName, count = 1) {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== itemId) return it;
        const per = (it.usagePerTherapy && it.usagePerTherapy[therapyName]) || 0;
        const deduct = per * count;
        return { ...it, currentStock: Math.max(0, it.currentStock - deduct), lastUpdated: new Date().toISOString() };
      })
    );
  }

  function restock(itemId, qty) {
    setItems((prev) => prev.map((it) => (it.id === itemId ? { ...it, currentStock: it.currentStock + qty, lastUpdated: new Date().toISOString() } : it)));
  }

  function exportCSV() {
    const header = [
      "id",
      "name",
      "category",
      "unit",
      "currentStock",
      "minStock",
      "maxStock",
      "reorderQty",
      "supplier",
      "purchasePrice",
      "expiryDate",
      "batch",
      "lastUpdated",
    ];
    const rows = [header.join(",")];
    for (const it of items) {
      rows.push(
        header
          .map((h) => {
            const v = it[h];
            if (v === undefined || v === null) return "";
            return String(v).replace(/\"/g, '""');
          })
          .join(",")
      );
    }
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `panchakarma_inventory_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = items.filter((it) => {
    if (query && !`${it.name} ${it.category} ${it.supplier} ${it.batch}`.toLowerCase().includes(query.toLowerCase())) return false;
    if (categoryFilter !== "All" && it.category !== categoryFilter) return false;
    if (showLowStockOnly && it.currentStock > it.minStock) return false;
    if (showNearExpiryOnly) {
      if (!it.expiryDate) return false;
      const days = Math.ceil((new Date(it.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
      if (days > 90) return false;
    }
    return true;
  });

  // UI Components
  function ItemRow({ it }) {
    const daysToExpiry = it.expiryDate ? Math.ceil((new Date(it.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)) : null;
    const low = it.currentStock <= it.minStock;
    const nearExpiry = daysToExpiry !== null && daysToExpiry <= 90;
    const stockPercentage = Math.min(100, (it.currentStock / it.maxStock) * 100);
    const stockValue = (it.currentStock * it.purchasePrice).toLocaleString();

    const getStockColor = () => {
      if (low) return "bg-red-500";
      if (stockPercentage < 30) return "bg-yellow-500";
      return "bg-emerald-500";
    };

    return (
      <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
        <td className="px-4 py-3">
          <div>
            <div className="font-medium text-slate-800">{it.name}</div>
            <div className="text-xs text-slate-500 mt-1">{it.category}</div>
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center">
            <div className="w-24 mr-3">
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${getStockColor()} transition-all duration-300`}
                  style={{ width: `${stockPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="text-sm font-medium">
              {it.currentStock.toLocaleString()} <span className="text-slate-500 text-xs">{it.unit}</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-1">Value: ₹{stockValue}</div>
        </td>
        <td className="px-4 py-3">
          <div className="text-sm">
            <div>Min: <span className="font-medium">{it.minStock}</span></div>
            <div>Reorder: <span className="font-medium">{it.reorderQty}</span></div>
          </div>
        </td>
        <td className="px-4 py-3">
          <div>
            <div className="text-sm font-medium">{it.supplier}</div>
            <div className="text-xs text-slate-500 mt-1">{it.batch}</div>
          </div>
        </td>
        <td className="px-4 py-3">
          <div>
            {it.expiryDate ? (
              <div className={`text-sm font-medium ${nearExpiry ? 'text-amber-600' : 'text-slate-700'}`}>
                {new Date(it.expiryDate).toLocaleDateString()}
                {daysToExpiry !== null && (
                  <div className={`text-xs ${nearExpiry ? 'text-amber-500' : 'text-slate-500'}`}>
                    {daysToExpiry > 0 ? `${daysToExpiry} days left` : 'Expired'}
                  </div>
                )}
              </div>
            ) : (
              <span className="text-slate-400 text-sm">No expiry</span>
            )}
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex gap-1">
            <button
              className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              onClick={() => {
                setEditing(it);
                setShowForm(true);
              }}
              title="Edit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
              onClick={() => {
                const qty = parseInt(prompt("Enter restock quantity:", String(it.reorderQty || 0)) || "0", 10);
                if (qty > 0) restock(it.id, qty);
              }}
              title="Restock"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
            <button
              className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
              onClick={() => {
                const therapy = prompt("Enter therapy name to consume for (e.g. Abhyanga):", "Abhyanga");
                if (!therapy) return;
                const sessions = parseInt(prompt("Number of sessions:", "1") || "1", 10) || 1;
                consumeForTherapy(it.id, therapy, sessions);
              }}
              title="Use for Therapy"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            <button 
              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              onClick={() => removeItem(it.id)}
              title="Delete"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-wrap gap-1">
            {low && (
              <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full font-medium">
                Low Stock
              </span>
            )}
            {nearExpiry && (
              <span className="px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded-full font-medium">
                Expiring Soon
              </span>
            )}
            {!low && !nearExpiry && (
              <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full font-medium">
                In Stock
              </span>
            )}
          </div>
        </td>
      </tr>
    );
  }

  function ItemForm({ init, onCancel, onSave }) {
    const [form, setForm] = useState(
      init || {
        name: "",
        category: "Panchakarma Oils",
        unit: "ml",
        currentStock: 0,
        minStock: 0,
        maxStock: 0,
        reorderQty: 0,
        supplier: "",
        purchasePrice: 0,
        expiryDate: "",
        batch: "",
        usagePerTherapy: {},
      }
    );

    useEffect(() => setForm(init || form), [init]);

    function setField(k, v) {
      setForm((s) => ({ ...s, [k]: v }));
    }

    function save() {
      if (!form.name) {
        alert("Item name is required");
        return;
      }
      onSave({ ...form });
    }

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">
                {init ? "Edit Inventory Item" : "Add New Inventory Item"}
              </h3>
              <button
                onClick={onCancel}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Item Name *</label>
                <input
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter item name"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={form.category}
                  onChange={(e) => setField("category", e.target.value)}
                >
                  <option value="Panchakarma Oils">Panchakarma Oils</option>
                  <option value="Ghee & Tailams">Ghee & Tailams</option>
                  <option value="Medicinal Herbs">Medicinal Herbs</option>
                  <option value="Herbal Powders">Herbal Powders</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
                <select
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={form.unit}
                  onChange={(e) => setField("unit", e.target.value)}
                >
                  <option value="ml">Milliliters (ml)</option>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="g">Grams (g)</option>
                  <option value="pcs">Pieces</option>
                  <option value="l">Liters (l)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Stock</label>
                <input
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  type="number"
                  placeholder="0"
                  value={form.currentStock}
                  onChange={(e) => setField("currentStock", Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Minimum Stock</label>
                <input
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  type="number"
                  placeholder="0"
                  value={form.minStock}
                  onChange={(e) => setField("minStock", Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reorder Quantity</label>
                <input
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  type="number"
                  placeholder="0"
                  value={form.reorderQty}
                  onChange={(e) => setField("reorderQty", Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Supplier</label>
                <input
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Supplier name"
                  value={form.supplier}
                  onChange={(e) => setField("supplier", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Purchase Price (per unit)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">₹</span>
                  <input
                    className="w-full pl-8 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    type="number"
                    placeholder="0.00"
                    value={form.purchasePrice}
                    onChange={(e) => setField("purchasePrice", Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                <input
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  type="date"
                  value={form.expiryDate}
                  onChange={(e) => setField("expiryDate", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Batch Number</label>
                <input
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Batch number"
                  value={form.batch}
                  onChange={(e) => setField("batch", e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Usage per Therapy (JSON format)
                </label>
                <textarea
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  rows="3"
                  placeholder='{"Abhyanga": 120, "Shirodhara": 250, "Basti": 200}'
                  value={JSON.stringify(form.usagePerTherapy || {}, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value || "{}");
                      setField("usagePerTherapy", parsed);
                    } catch (err) {
                      setField("usagePerTherapy", form.usagePerTherapy || {});
                    }
                  }}
                />
                <p className="text-xs text-slate-500 mt-1">
                  Enter therapy names and their consumption amounts in {form.unit}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
            <div className="flex justify-end gap-3">
              <button
                className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors font-medium"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                onClick={save}
              >
                {init ? "Update Item" : "Add Item"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-1">
        <Navbar/>
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Panchakarma Inventory</h1>
            <p className="text-slate-600 mt-2">Manage oils, herbs, and supplies for Ayurvedic treatments</p>
          </div>
          <div className="flex gap-3">
            <button
              className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium flex items-center gap-2 shadow-sm"
              onClick={exportCSV}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export CSV
            </button>
            <button
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium flex items-center gap-2 shadow-lg shadow-blue-500/25"
              onClick={() => { setShowForm(true); setEditing(null); }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add New Item
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">Total Items</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{stats.totalItems || 0}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">Low Stock Items</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{stats.lowStock || 0}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-xl">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">Near Expiry</p>
              <p className="text-3xl font-bold text-amber-600 mt-1">{stats.nearExpiry || 0}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">Total Value</p>
              <p className="text-3xl font-bold text-emerald-600 mt-1">₹{stats.totalValue?.toLocaleString() || '0'}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Search items by name, category, supplier, or batch..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select
              className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            
            <label className="flex items-center gap-2 px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                checked={showLowStockOnly}
                onChange={(e) => setShowLowStockOnly(e.target.checked)}
              />
              <span className="text-slate-700 font-medium">Low Stock</span>
            </label>
            
            <label className="flex items-center gap-2 px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                checked={showNearExpiryOnly}
                onChange={(e) => setShowNearExpiryOnly(e.target.checked)}
              />
              <span className="text-slate-700 font-medium">Near Expiry</span>
            </label>

            <button
              className="px-4 py-3 text-slate-600 hover:text-slate-800 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              onClick={() => {
                if (confirm('Clear all inventory data? This cannot be undone.')) {
                  setItems([]);
                  localStorage.removeItem('panchakarma_inventory_v2');
                }
              }}
            >
              Clear All
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-slate-600 flex items-center gap-4">
          <div>
            Showing <span className="font-bold text-slate-800">{filtered.length}</span> of <span className="font-bold text-slate-800">{items.length}</span> items
          </div>
          {showLowStockOnly && (
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
              Low Stock Filter Active
            </span>
          )}
          {showNearExpiryOnly && (
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
              Near Expiry Filter Active
            </span>
          )}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-slate-700 font-semibold">Item Details</th>
                <th className="text-left px-6 py-4 text-slate-700 font-semibold">Stock Level</th>
                <th className="text-left px-6 py-4 text-slate-700 font-semibold">Stock Limits</th>
                <th className="text-left px-6 py-4 text-slate-700 font-semibold">Supplier & Batch</th>
                <th className="text-left px-6 py-4 text-slate-700 font-semibold">Expiry Date</th>
                <th className="text-left px-6 py-4 text-slate-700 font-semibold">Actions</th>
                <th className="text-left px-6 py-4 text-slate-700 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((it) => (
                <ItemRow key={it.id} it={it} />
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="max-w-md mx-auto">
                      <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <h3 className="text-lg font-medium text-slate-800 mb-2">No items found</h3>
                      <p className="text-slate-600 mb-4">
                        {items.length === 0
                          ? "Your inventory is empty. Add your first item to get started."
                          : "Try adjusting your search filters to find what you're looking for."}
                      </p>
                      {items.length === 0 && (
                        <button
                          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                          onClick={() => { setShowForm(true); setEditing(null); }}
                        >
                          Add First Item
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200">
          <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-slate-600">
            <strong>Pro Tip:</strong> Set min stock levels to get alerts. Use the "Use" action to auto-deduct stock for therapies.
          </span>
        </div>
      </footer>

      {/* Form Modal */}
      {showForm && (
        <ItemForm
          init={editing}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={(data) => addOrUpdateItem(data)}
        />
      )}
    </div>
  );
}