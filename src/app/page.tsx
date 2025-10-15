"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  Menu,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    { title: "Total Users", value: "2,543", change: "+12.5%", trend: "up" },
    { title: "Revenue", value: "$45,231", change: "+8.2%", trend: "up" },
    { title: "Orders", value: "1,234", change: "-3.1%", trend: "down" },
    { title: "Conversion", value: "3.24%", change: "+2.4%", trend: "up" },
  ];

  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "John Doe",
      amount: "$250",
      status: "Completed",
    },
    {
      id: "#ORD-002",
      customer: "Jane Smith",
      amount: "$180",
      status: "Pending",
    },
    {
      id: "#ORD-003",
      customer: "Mike Johnson",
      amount: "$420",
      status: "Completed",
    },
    {
      id: "#ORD-004",
      customer: "Sarah Wilson",
      amount: "$320",
      status: "Processing",
    },
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Users, label: "Users", active: false },
    { icon: ShoppingCart, label: "Orders", active: false },
    { icon: BarChart3, label: "Analytics", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          <h1
            className={`${sidebarOpen ? "block" : "hidden"} text-xl font-bold`}
          >
            Dashboard
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                item.active
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              <item.icon size={20} />
              <span className={`${sidebarOpen ? "block" : "hidden"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold">John Doe</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Dashboard Overview
            </h2>
            <p className="text-gray-500">
              Welcome back! Here&apos;s what&apos;s happening today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6">
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.value}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </div>
            ))}
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Placeholder */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Revenue Overview
              </h3>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded flex items-center justify-center">
                <p className="text-gray-500">
                  Chart Area (Integrate with Chart.js or Recharts)
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Orders
              </h3>
              <div className="space-y-4">
                {recentOrders.map((order, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {order.id}
                      </p>
                      <p className="text-xs text-gray-500">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-800">
                        {order.amount}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Transactions
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {order.amount}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        Oct {14 - idx}, 2025
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
