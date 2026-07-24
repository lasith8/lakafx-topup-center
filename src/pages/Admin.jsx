import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  Search,
  Trash2,
  CheckCircle2,
  XCircle,
  Package,
  Phone,
  User,
  Calendar,
  ImageIcon,
  Download,
  Printer,
  TrendingUp,
  Clock,
  CheckCheck,
  Ban,
  DollarSign,
  Eye,
  X,
  Loader2,
  Filter,
  ChevronDown,
  RefreshCw,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showScreenshot, setShowScreenshot] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          list.push({
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date(),
          });
        });
        setOrders(list);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const getFilteredOrders = useCallback(() => {
    let filtered = [...orders];

    if (search.trim()) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.playerId?.toLowerCase().includes(term) ||
          order.phone?.toLowerCase().includes(term) ||
          order.package?.toLowerCase().includes(term) ||
          order.game?.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (dateFilter !== "All") {
      const now = new Date();
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdAt);
        switch (dateFilter) {
          case "Today":
            return orderDate.toDateString() === now.toDateString();
          case "Week":
            const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
            return orderDate >= weekAgo;
          case "Month":
            return (
              orderDate.getMonth() === now.getMonth() &&
              orderDate.getFullYear() === now.getFullYear()
            );
          default:
            return true;
        }
      });
    }

    filtered.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (sortBy === "createdAt") {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      } else if (typeof valA === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (sortOrder === "asc") {
        return valA > valB ? 1 : -1;
      }
      return valA < valB ? 1 : -1;
    });

    return filtered;
  }, [orders, search, statusFilter, dateFilter, sortBy, sortOrder]);

  const filteredOrders = getFilteredOrders();

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "Pending").length,
    completed: orders.filter((o) => o.status === "Completed").length,
    cancelled: orders.filter((o) => o.status === "Cancelled").length,
    revenue: orders
      .filter((o) => o.status === "Completed")
      .reduce((sum, o) => {
        const match = o.package?.match(/LKR\s*([\d,]+)/);
        return sum + (match ? parseInt(match[1].replace(/,/g, "")) : 0);
      }, 0),
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    setActionLoading(orderId);
    try {
      await updateDoc(doc(db, "orders", orderId), {
        status: newStatus,
        updatedAt: new Date(),
      });
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    setActionLoading(orderId);
    try {
      await deleteDoc(doc(db, "orders", orderId));
      if (selectedOrder?.id === orderId) {
        setShowModal(false);
        setSelectedOrder(null);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete order. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Game",
      "Package",
      "Player ID",
      "Phone",
      "Payment Method",
      "Payment Number",
      "Status",
      "Screenshot",
      "Created At",
    ];
    const rows = filteredOrders.map((o) => [
      o.id,
      o.game,
      o.package,
      o.playerId,
      o.phone,
      o.paymentMethod,
      o.paymentNumber,
      o.status,
      o.screenshot,
      new Date(o.createdAt).toLocaleString(),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `lakafx-orders-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const handlePrintInvoice = (order) => {
    const printWindow = window.open("", "_blank");
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${order.id}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; max-width: 600px; margin: 0 auto; background: #0f172a; color: white; }
          .header { text-align: center; border-bottom: 3px solid #f97316; padding-bottom: 20px; margin-bottom: 30px; }
          .header h1 { color: #f97316; margin: 0; font-size: 28px; }
          .header p { color: #94a3b8; margin: 5px 0 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #1e293b; }
          .label { font-weight: bold; color: #cbd5e1; }
          .value { color: #94a3b8; }
          .status { display: inline-block; padding: 6px 16px; border-radius: 9999px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
          .status-Pending { background: #fef3c7; color: #d97706; }
          .status-Completed { background: #d1fae5; color: #059669; }
          .status-Cancelled { background: #fee2e2; color: #dc2626; }
          .footer { margin-top: 40px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #1e293b; padding-top: 20px; }
          .logo { font-size: 40px; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🎮</div>
          <h1>LAKAFX TOP UP CENTER</h1>
          <p>Official Invoice</p>
        </div>
        <div class="detail-row">
          <span class="label">Order ID</span>
          <span class="value">${order.id}</span>
        </div>
        <div class="detail-row">
          <span class="label">Game</span>
          <span class="value">${order.game || "Free Fire"}</span>
        </div>
        <div class="detail-row">
          <span class="label">Package</span>
          <span class="value">${order.package}</span>
        </div>
        <div class="detail-row">
          <span class="label">Player ID</span>
          <span class="value">${order.playerId}</span>
        </div>
        <div class="detail-row">
          <span class="label">Phone</span>
          <span class="value">${order.phone}</span>
        </div>
        <div class="detail-row">
          <span class="label">Payment Method</span>
          <span class="value">${order.paymentMethod}</span>
        </div>
        <div class="detail-row">
          <span class="label">Payment Number</span>
          <span class="value">${order.paymentNumber}</span>
        </div>
        <div class="detail-row">
          <span class="label">Status</span>
          <span class="status status-${order.status}">${order.status}</span>
        </div>
        <div class="detail-row">
          <span class="label">Date</span>
          <span class="value">${new Date(order.createdAt).toLocaleString()}</span>
        </div>
        <div class="footer">
          <p>Thank you for choosing LAKAFX TOP UP CENTER!</p>
          <p>For support, contact us on WhatsApp: 0740482490</p>
          <p style="margin-top: 10px; font-size: 10px;">This is a computer generated invoice.</p>
        </div>
      </body>
      </html>
    `;
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    printWindow.print();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "Completed":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "Cancelled":
        return "bg-red-500/15 text-red-400 border-red-500/30";
      default:
        return "bg-slate-500/15 text-slate-400 border-slate-500/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-3.5 h-3.5" />;
      case "Completed":
        return <CheckCheck className="w-3.5 h-3.5" />;
      case "Cancelled":
        return <Ban className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-orange-400 animate-spin" />
          <p className="text-orange-200/60 text-sm font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-orange-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 bg-slate-800/80 hover:bg-orange-500/20 text-slate-400 hover:text-orange-400 rounded-xl transition-all border border-slate-700 hover:border-orange-500/30"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-lg shadow-lg shadow-orange-500/20">
                🎮
              </div>
              <div>
                <h1 className="text-xl font-black bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  LAKAFX ADMIN
                </h1>
                <p className="text-xs text-slate-500 font-medium">Dashboard</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 border border-orange-500/20 rounded-xl text-sm font-bold text-orange-300 hover:bg-orange-500/10 hover:border-orange-500/40 transition-all"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
        >
          {[
            {
              label: "Total Orders",
              value: stats.total,
              icon: Package,
              gradient: "from-blue-500 to-cyan-400",
              border: "border-blue-500/20",
              text: "text-blue-400",
            },
            {
              label: "Pending",
              value: stats.pending,
              icon: Clock,
              gradient: "from-amber-500 to-yellow-400",
              border: "border-amber-500/20",
              text: "text-amber-400",
            },
            {
              label: "Completed",
              value: stats.completed,
              icon: CheckCheck,
              gradient: "from-emerald-500 to-green-400",
              border: "border-emerald-500/20",
              text: "text-emerald-400",
            },
            {
              label: "Cancelled",
              value: stats.cancelled,
              icon: Ban,
              gradient: "from-red-500 to-rose-400",
              border: "border-red-500/20",
              text: "text-red-400",
            },
            {
              label: "Revenue",
              value: `LKR ${stats.revenue.toLocaleString()}`,
              icon: DollarSign,
              gradient: "from-orange-500 to-amber-400",
              border: "border-orange-500/20",
              text: "text-orange-400",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative overflow-hidden bg-slate-900/60 backdrop-blur-sm border ${stat.border} rounded-2xl p-5 group hover:shadow-lg transition-all duration-300`}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-bl-full`} />
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <TrendingUp className={`w-4 h-4 ${stat.text} opacity-60`} />
              </div>
              <p className="text-2xl font-black text-white tracking-tight">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 mb-6 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search Player ID, Phone, Package..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-slate-800/80 border border-slate-700 rounded-xl pl-9 pr-8 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50 cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="appearance-none bg-slate-800/80 border border-slate-700 rounded-xl pl-9 pr-8 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50 cursor-pointer"
              >
                <option value="All">All Time</option>
                <option value="Today">Today</option>
                <option value="Week">This Week</option>
                <option value="Month">This Month</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
                setDateFilter("All");
              }}
              className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-400 hover:text-white hover:border-slate-600 transition-all font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </motion.div>

        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-950/60 border-b border-slate-800">
                  {[
                    { key: "playerId", label: "Player ID" },
                    { key: "package", label: "Package" },
                    { key: "phone", label: "Phone" },
                    { key: "status", label: "Status" },
                    { key: "createdAt", label: "Date" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => {
                        if (sortBy === col.key) {
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        } else {
                          setSortBy(col.key);
                          setSortOrder("desc");
                        }
                      }}
                      className="px-4 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-orange-400 transition-colors select-none"
                    >
                      <div className="flex items-center gap-1.5">
                        {col.label}
                        {sortBy === col.key && (
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform ${sortOrder === "asc" ? "rotate-180" : ""}`}
                          />
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-16 text-center">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center gap-3"
                        >
                          <Package className="w-12 h-12 text-slate-700" />
                          <p className="text-slate-500 font-medium">No orders found</p>
                          <p className="text-slate-600 text-sm">Try adjusting your filters</p>
                        </motion.div>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order, index) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                        className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors group"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                              <User className="w-4 h-4 text-orange-400" />
                            </div>
                            <span className="text-sm font-semibold text-slate-200">
                              {order.playerId}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                              <Package className="w-4 h-4 text-blue-400" />
                            </div>
                            <span className="text-sm text-slate-300">{order.package}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                              <Phone className="w-4 h-4 text-green-400" />
                            </div>
                            <span className="text-sm text-slate-300">{order.phone}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-xs text-slate-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowModal(true);
                              }}
                              className="p-2 bg-slate-800 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            {order.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => handleStatusUpdate(order.id, "Completed")}
                                  disabled={actionLoading === order.id}
                                  className="p-2 bg-slate-800 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 rounded-lg transition-colors"
                                  title="Complete"
                                >
                                  {actionLoading === order.id ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  )}
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(order.id, "Cancelled")}
                                  disabled={actionLoading === order.id}
                                  className="p-2 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                                  title="Cancel"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handlePrintInvoice(order)}
                              className="p-2 bg-slate-800 hover:bg-orange-500/20 text-slate-400 hover:text-orange-400 rounded-lg transition-colors"
                              title="Print Invoice"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(order.id)}
                              disabled={actionLoading === order.id}
                              className="p-2 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-4 py-3 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">
              Showing {filteredOrders.length} of {orders.length} orders
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="sm:hidden flex items-center gap-1.5 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 hover:text-white transition-colors font-medium"
              >
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {showModal && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 px-6 py-5 flex items-center justify-between rounded-t-3xl z-10">
                <div>
                  <h3 className="text-xl font-black text-white">Order Details</h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{selectedOrder.id}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-6 space-y-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-400 font-medium">Status</span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status}
                  </span>
                </div>

                {[
                  { label: "Game", value: selectedOrder.game || "Free Fire", icon: "🎮" },
                  { label: "Package", value: selectedOrder.package, icon: "📦" },
                  { label: "Player ID", value: selectedOrder.playerId, icon: "🆔" },
                  { label: "Phone", value: selectedOrder.phone, icon: "📱" },
                  { label: "Payment Method", value: selectedOrder.paymentMethod, icon: "💳" },
                  { label: "Payment Number", value: selectedOrder.paymentNumber, icon: "📲" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-800/50 last:border-0">
                    <span className="text-sm text-slate-400 font-medium flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm">
                        {item.icon}
                      </span>
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-slate-200">{item.value || "N/A"}</span>
                  </div>
                ))}

                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-400 font-medium flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm">📅</span>
                    Date
                  </span>
                  <span className="text-sm text-slate-300">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* Screenshot */}
                {selectedOrder.screenshot && (
                  <div className="pt-2">
                    <span className="text-sm text-slate-400 font-medium flex items-center gap-2 mb-3">
                      <ImageIcon className="w-4 h-4" />
                      Payment Screenshot
                    </span>
                    <div
                      className="relative rounded-xl overflow-hidden border border-slate-700 cursor-pointer group"
                      onClick={() => setShowScreenshot(true)}
                    >
                      <img
                        src={selectedOrder.screenshot}
                        alt="Payment Screenshot"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 px-6 py-4 flex items-center gap-2 rounded-b-3xl">
                {selectedOrder.status === "Pending" && (
                  <>
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedOrder.id, "Completed");
                        setShowModal(false);
                      }}
                      disabled={actionLoading === selectedOrder.id}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Complete
                    </button>
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedOrder.id, "Cancelled");
                        setShowModal(false);
                      }}
                      disabled={actionLoading === selectedOrder.id}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-red-500/20 text-red-400 font-bold rounded-xl border border-slate-700 hover:border-red-500/30 transition-all"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                )}
                <button
                  onClick={() => handlePrintInvoice(selectedOrder)}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-orange-500/20 text-orange-400 font-bold rounded-xl border border-slate-700 hover:border-orange-500/30 transition-all"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedOrder.id);
                    setShowModal(false);
                  }}
                  disabled={actionLoading === selectedOrder.id}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-red-500/20 text-red-400 font-bold rounded-xl border border-slate-700 hover:border-red-500/30 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screenshot Fullscreen Modal */}
      <AnimatePresence>
        {showScreenshot && selectedOrder?.screenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setShowScreenshot(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setShowScreenshot(false)}
                className="absolute -top-14 right-0 p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedOrder.screenshot}
                alt="Payment Screenshot Full"
                className="w-full rounded-2xl border border-slate-700 shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;