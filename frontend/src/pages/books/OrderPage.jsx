import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
  const { currentUser } = useAuth();

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser.email);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">Error fetching orders data</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Orders</h2>
      {orders.length === 0 ? (
        <div className="text-center text-lg text-gray-600">
          No orders found!
        </div>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 transition-transform transform hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2 bg-blue-500 text-white rounded-full text-sm font-medium">
                    Order #{index + 1}
                  </span>
                  <span className="text-gray-600 text-sm">
                    Order ID: {order._id}
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="text-lg text-gray-800 font-semibold">
                    Customer Info
                  </p>
                  <div className="space-y-2 text-gray-600">
                    <p>Name: {order.name}</p>
                    <p>Email: {order.email}</p>
                    <p>Phone: {order.phone}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-lg text-gray-800 font-semibold">
                      Shipping Address
                    </p>
                    <p className="text-gray-600">
                      {order.address.city}, {order.address.state},{' '}
                      {order.address.country}, {order.address.zipcode}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-lg text-gray-800 font-semibold">
                      Order Summary
                    </p>
                    <p className="text-gray-600">
                      Total Price:{' '}
                      <span className="font-bold text-green-500">
                        ${order.totalPrice}
                      </span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-lg text-gray-800 font-semibold">
                      Products Ordered
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      {order.productIds.map((productId) => (
                        <li key={productId}>Product ID: {productId}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
