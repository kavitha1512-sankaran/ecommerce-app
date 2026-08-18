import React from "react";
import API from "../../api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/myorders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="container">

      <h1>My Orders</h1>

      {orders.map((order) => (
        <div
          className="order-card"
          key={order._id}
        >

          <h3>
            Order ID: {order._id}
          </h3>

          <p>
            Total: ₹{order.totalPrice}
          </p>

          <p>
            Status: {order.orderStatus}
          </p>

          <p>
            Payment: {order.paymentMethod}
          </p>

        </div>
      ))}

    </div>
  );
}

export default Orders;