import PropTypes from 'prop-types'; // Import PropTypes
import { FiShoppingCart } from 'react-icons/fi';
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 bg-white">
      {/* Book Image */}
      <div className="relative h-64 overflow-hidden">
        <Link to={`/books/${book._id}`}>
          <img
            src={`${getImgUrl(book?.coverImage)}`}
            alt={book?.title}
            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
          />
        </Link>
        {/* Discount Badge */}
        {book.oldPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {`-${Math.round(
              ((book.oldPrice - book.newPrice) / book.oldPrice) * 100
            )}%`}
          </div>
        )}
      </div>

      {/* Book Details */}
      <div className="p-4 flex flex-col justify-between">
        {/* Title */}
        <Link to={`/books/${book._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            {book?.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-2 mb-4">
          {book?.description.length > 90
            ? `${book.description.slice(0, 90)}...`
            : book?.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-800">
            ${book?.newPrice}{' '}
            {book?.oldPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                $ {book?.oldPrice}
              </span>
            )}
          </p>
          <button
            onClick={() => handleAddToCart(book)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            <FiShoppingCart className="text-lg" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for validation
BookCard.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    newPrice: PropTypes.number.isRequired,
    oldPrice: PropTypes.number,
  }).isRequired,
};

export default BookCard;
