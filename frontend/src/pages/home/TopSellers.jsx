import { useState } from 'react';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const categories = [
  'Choose a genre',
  'Business',
  'Fiction',
  'Horror',
  'Adventure',
];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState('Choose a genre');
  const { data: books = [] } = useFetchAllBooksQuery();

  const filteredBooks =
    selectedCategory === 'Choose a genre'
      ? books
      : books.filter(
          (book) =>
            book.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-gray-800">Top Sellers</h2>
          <p className="text-gray-600 mt-4 md:mt-0">
            Explore the most popular books across different genres.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            name="category"
            id="category"
            className="border border-gray-300 bg-white text-gray-600 rounded-lg px-6 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-transform transform hover:scale-105"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Manual Scroll Section */}
        <div className="overflow-x-auto flex gap-6 snap-x snap-mandatory scrollbar-hide pb-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[450px] snap-start rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <BookCard book={book} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-6">
              No books available in this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
