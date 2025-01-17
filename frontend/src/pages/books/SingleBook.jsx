import { FiShoppingCart } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (isError)
    return <div className="text-center py-8">Error loading book info</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-xl space-y-8">
      {/* Book Title */}
      <h1 className="text-3xl font-semibold text-gray-900">{book.title}</h1>

      {/* Book Image and Details */}
      <div className="flex flex-col sm:flex-row sm:space-x-8">
        {/* Book Image */}
        <div className="w-full sm:w-1/3 rounded-lg overflow-hidden shadow-md">
          <img
            src={`${getImgUrl(book.coverImage)}`}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Book Details */}
        <div className="flex-1 space-y-6">
          <p className="text-lg text-gray-700">
            <strong className="font-medium text-gray-900">Author:</strong>{' '}
            {book.author || 'admin'}
          </p>
          <p className="text-lg text-gray-700">
            <strong className="font-medium text-gray-900">Published:</strong>{' '}
            {new Date(book?.createdAt).toLocaleDateString()}
          </p>
          <p className="text-lg text-gray-700 capitalize">
            <strong className="font-medium text-gray-900">Category:</strong>{' '}
            {book?.category}
          </p>
          <p className="text-lg text-gray-700">
            <strong className="font-medium text-gray-900">Description:</strong>{' '}
            {book.description}
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={() => handleAddToCart(book)}
            className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300 flex items-center justify-center space-x-2"
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
