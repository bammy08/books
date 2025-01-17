import bannerImg from '../../assets/banner.png';

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-16 px-6 md:px-12 justify-between items-center gap-12 bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg rounded-lg">
      {/* Image Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <img
          src={bannerImg}
          alt="Books Banner"
          className="w-full max-w-md md:max-w-lg rounded-lg shadow-md"
        />
      </div>

      {/* Content Section */}
      <div className="md:w-1/2 w-full text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold leading-snug text-gray-800 mb-6">
          Discover This Week&apos;s{' '}
          <span className="text-primary">Top Releases</span>
        </h1>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
          Update your reading list with the latest and greatest releases from
          the literary world. From heart-pumping thrillers to captivating
          memoirs, this week&apos;s new arrivals have something for everyone.
        </p>

        <div className="flex justify-center md:justify-start">
          <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition-transform transform hover:-translate-y-1 focus:ring-4 focus:ring-primary-light focus:outline-none">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
