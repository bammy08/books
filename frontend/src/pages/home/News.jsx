import { Link } from 'react-router-dom';

import news1 from '../../assets/news/news-1.png';
import news2 from '../../assets/news/news-2.png';
import news3 from '../../assets/news/news-3.png';
import news4 from '../../assets/news/news-4.png';

const news = [
  {
    id: 1,
    title: 'Global Climate Summit Calls for Urgent Action',
    description:
      'World leaders gather at the Global Climate Summit to discuss urgent strategies to combat climate change, focusing on reducing carbon emissions and fostering renewable energy solutions.',
    image: news1,
  },
  {
    id: 2,
    title: 'Breakthrough in AI Technology Announced',
    description:
      'A major breakthrough in artificial intelligence has been announced by researchers, with new advancements promising to revolutionize industries from healthcare to finance.',
    image: news2,
  },
  {
    id: 3,
    title: 'New Space Mission Aims to Explore Distant Galaxies',
    description:
      'NASA has unveiled plans for a new space mission that will aim to explore distant galaxies, with hopes of uncovering insights into the origins of the universe.',
    image: news3,
  },
  {
    id: 4,
    title: 'Stock Markets Reach Record Highs Amid Economic Recovery',
    description:
      'Global stock markets have reached record highs as signs of economic recovery continue to emerge following the challenges posed by the global pandemic.',
    image: news4,
  },
  {
    id: 5,
    title: 'Innovative New Smartphone Released by Leading Tech Company',
    description:
      'A leading tech company has released its latest smartphone model, featuring cutting-edge technology, improved battery life, and a sleek new design.',
    image: news2,
  },
];

const News = () => {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Latest News</h2>

      <div className="overflow-x-auto flex space-x-6 pb-6">
        {news.map((item, index) => (
          <div
            key={index}
            className="min-w-[300px] max-w-[350px] bg-white rounded-lg shadow-lg hover:shadow-xl transition-all ease-in-out duration-300 overflow-hidden flex-shrink-0"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[200px] object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-md">
                <Link to="/">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </Link>
              </div>
            </div>

            <div className="p-4">
              <div className="w-16 h-[4px] bg-primary mb-3"></div>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
