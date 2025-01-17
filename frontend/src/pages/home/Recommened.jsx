import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const Recommened = () => {
  const { data: books = [] } = useFetchAllBooksQuery();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-gray-800">
            Recommended for You
          </h2>
          <p className="text-gray-600 mt-4 md:mt-0">
            Discover the best books tailored just for you.
          </p>
        </div>

        {/* Horizontal Scroll Section */}
        <div className="overflow-x-auto flex gap-6 snap-x snap-mandatory scrollbar-hide pb-4">
          {books.slice(8, 18).map((book, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[450px] snap-start rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommened;
