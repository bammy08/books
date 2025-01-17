import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiOutlineShoppingCart } from 'react-icons/hi2';
import { IoSearchOutline } from 'react-icons/io5';
import { HiOutlineUser, HiOutlineLogout } from 'react-icons/hi';
import { MdDashboard, MdOutlineShoppingBag } from 'react-icons/md';
import footerLogo from '../assets/footer-logo.png';
import { useState, useEffect, useRef } from 'react';
import avatarImg from '../assets/avatar.png';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';

const navigation = [
  { name: 'Dashboard', href: '/user-dashboard', icon: <MdDashboard /> },
  { name: 'Orders', href: '/orders', icon: <MdOutlineShoppingBag /> },
  { name: 'Cart Page', href: '/cart', icon: <HiOutlineShoppingCart /> },
  { name: 'Check Out', href: '/checkout', icon: <MdOutlineShoppingBag /> },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleLogOut = () => {
    logout();
  };

  const token = localStorage.getItem('token');

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <header className="py-4 shadow-lg bg-gray-50">
      <nav className="flex justify-between items-center px-8">
        {/* Left side */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={footerLogo} alt="Logo" className="w-14 -mt-2" />
          </Link>

          {/* Search input */}
          <div className="relative sm:w-80 w-40 hidden sm:block">
            <IoSearchOutline className="absolute left-3 top-4 text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search books..."
              className="w-full py-4 pl-10 pr-4 text-sm bg-gray-100 rounded-lg border-gray-400 border focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <button className="hidden sm:block hover:text-primary">
            <HiOutlineHeart className="size-6" />
          </button>

          <Link
            to="/cart"
            className="bg-primary text-white p-2 sm:px-6 px-4 flex items-center rounded"
          >
            <HiOutlineShoppingCart className="size-5 font-semibold" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1 ml-1">
                ({cartItems.length})
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">0</span>
            )}
          </Link>

          <div ref={dropdownRef} className="relative">
            {currentUser ? (
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="focus:outline-none"
                >
                  <img
                    src={avatarImg}
                    alt="Avatar"
                    className={`size-7 mt-2 rounded-full ${
                      currentUser ? 'ring-2 ring-blue-500' : ''
                    }`}
                  />
                </button>
                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {item.icon}
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <HiOutlineLogout />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : token ? (
              <Link to="/dashboard" className="border-b-2 border-primary">
                Dashboard
              </Link>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <div className="flex sm:hidden mt-4 px-4">
        <div className="relative w-full">
          <IoSearchOutline className="absolute left-3 top-4 text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search books..."
            className="w-full py-4 pl-10 pr-4 text-sm bg-gray-100 border border-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
