/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import "./OrderHistory.scss";

const mockOrderHistory = [
  {
    id: "1",
    date: "2023-10-01",
    status: "Delivered",
    total: "$100.00",
  },
  {
    id: "2",
    date: "2023-09-15",
    status: "Shipped",
    total: "$50.00",
  },
  {
    id: "3",
    date: "2023-08-30",
    status: "Processing",
    total: "$75.00",
  },
];

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState(mockOrderHistory);

  useEffect(() => {
    // Giả lập việc lấy dữ liệu từ API
    const fetchOrders = async () => {
      try {
        // Thay thế bằng API thực tế nếu có
        setOrders(mockOrderHistory);
      } catch (error: any) {
        console.error("Failed to fetch order history", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-history-container">
      <h2>My Order History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>{order.status}</td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderHistory;


