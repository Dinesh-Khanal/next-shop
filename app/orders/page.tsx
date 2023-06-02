"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [paid] = useState(false);

  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data.orders);
    });
  }, []);
  return (
    <div>
      <h1>Orders</h1>
      <table className="basic text-sm w-full border-collapse">
        <thead>
          <tr>
            <th className="py-1 px-2 border">Date</th>
            <th className="py-1 px-2 border">Paid</th>
            <th className="py-1 px-2 border">Recipient</th>
            <th className="py-1 px-2 border">Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td className="py-1 px-2 border">
                  {order.createdAt?.toString().substring(0, 10)}
                </td>
                <td
                  className={`${
                    paid ? "text-green-600 " : "text-red-600"
                  } py-2 px-2`}
                >
                  {paid ? "YES" : "NO"}
                </td>
                <td className="py-1 px-2 border">
                  {order.title} {order.email}
                  <br />
                  {order.city} {order.pin} {order.country}
                  <br />
                  {order.address}
                </td>
                <td className="py-1 px-2 border">
                  {order.products.map((p) => (
                    <span key={p}>{p},</span>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
