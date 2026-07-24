import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = [];

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setOrders(list);
    });

    return () => unsubscribe();
  }, []);

  const filteredOrders = orders.filter((order) => {
    return (
      order.playerId?.toLowerCase().includes(search.toLowerCase()) ||
      order.phone?.toLowerCase().includes(search.toLowerCase()) ||
      order.package?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const pending = orders.filter((o) => o.status === "Pending").length;
  const completed = orders.filter((o) => o.status === "Completed").length;
  const cancelled = orders.filter((o) => o.status === "Cancelled").length;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold text-orange-400 mb-8">
        LAKAFX ADMIN DASHBOARD
      </h1>

      <div className="grid md:grid-cols-4 gap-5 mb-8">

        <div className="bg-slate-900 rounded-xl p-5 border border-orange-500/20">
          <h2>Total Orders</h2>
          <p className="text-4xl font-bold mt-3">{orders.length}</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-5 border border-yellow-500/20">
          <h2>Pending</h2>
          <p className="text-4xl font-bold mt-3 text-yellow-400">
            {pending}
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-5 border border-green-500/20">
          <h2>Completed</h2>
          <p className="text-4xl font-bold mt-3 text-green-400">
            {completed}
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-5 border border-red-500/20">
          <h2>Cancelled</h2>
          <p className="text-4xl font-bold mt-3 text-red-400">
            {cancelled}
          </p>
        </div>

      </div>

      <input
        className="w-full mb-8 bg-slate-900 border border-slate-700 rounded-xl p-4"
        placeholder="Search Player ID / Phone / Package"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-auto rounded-xl">

        <table className="w-full">

          <thead className="bg-orange-500 text-white">

            <tr>

              <th className="p-4">Player ID</th>

              <th>Package</th>

              <th>Phone</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {filteredOrders.map((order) => (

              <tr
                key={order.id}
                className="border-b border-slate-800 hover:bg-slate-900"
              >

                <td className="p-4">{order.playerId}</td>

                <td>{order.package}</td>

                <td>{order.phone}</td>

                <td>

                  <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                    {order.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Admin;