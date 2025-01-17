import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import { useState } from 'react';

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);
  const { currentUser } = useAuth();
  const { register, handleSubmit } = useForm();

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const onSubmit = async (data) => {
    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      phone: data.phone,
      productIds: cartItems.map((item) => item?._id),
      totalPrice: totalPrice,
    };

    try {
      await createOrder(newOrder).unwrap();
      Swal.fire({
        title: 'Confirmed Order',
        text: 'Your order has been placed successfully!',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
      navigate('/orders');
    } catch (error) {
      console.error('Error placing order', error);
      alert('Failed to place an order');
    }
  };

  if (isLoading) return <div>Loading....</div>;

  return (
    <section className="bg-gray-50 min-h-screen p-8 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Checkout</h2>

        <div className="text-gray-600 mb-4">
          <p className="text-lg font-medium">
            Total Price:{' '}
            <span className="font-bold text-xl">${totalPrice}</span>
          </p>
          <p>Items: {cartItems.length > 0 ? cartItems.length : 0}</p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  {...register('name', { required: true })}
                  type="text"
                  id="name"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  {...register('phone', { required: true })}
                  type="number"
                  id="phone"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="md:col-span-5">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                disabled
                defaultValue={currentUser?.email}
                placeholder="email@domain.com"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                {...register('address', { required: true })}
                type="text"
                id="address"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  {...register('city', { required: true })}
                  type="text"
                  id="city"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <input
                  {...register('country', { required: true })}
                  type="text"
                  id="country"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State / Province
                </label>
                <input
                  {...register('state', { required: true })}
                  type="text"
                  id="state"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="zipcode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zipcode
                </label>
                <input
                  {...register('zipcode', { required: true })}
                  type="text"
                  id="zipcode"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="billing_same"
                onChange={(e) => setIsChecked(e.target.checked)}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="billing_same"
                className="ml-2 text-sm text-gray-600"
              >
                I agree to the{' '}
                <Link to="/terms" className="text-indigo-600 hover:underline">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-indigo-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div className="mt-6 text-right">
              <button
                type="submit"
                disabled={!isChecked}
                className={`px-6 py-3 rounded-md text-white font-semibold ${
                  isChecked
                    ? 'bg-primary hover:bg-red-800'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
