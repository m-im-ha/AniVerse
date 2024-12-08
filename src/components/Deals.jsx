import dragonballz from "/assets/dragonball.jpg";
import spider from "/assets/spider.jpg";
import madagascar from "/assets/madagascar.jpg";
import panda from "/assets/panda.jpg";
import spirited from "/assets/spirited.jpg";

function Deals() {
  return (
    <div className="bg-gradient-to-br from-purple-700 via-gray-900 to-black py-16 px-6 md:px-16 lg:px-24 text-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="p-4">
            <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 tracking-wide">
              HOLIDAY DEALS
            </div>
          </div>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            Your home for exclusive offers, daily deals & more! Sale price,
            title, and availability vary.
          </p>
        </div>
      </div>

      {/* Daily Deals Section */}
      <div className="max-w-7xl mx-auto mt-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-100">
          Daily Deals
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Deal 1 */}
          <div className="group relative rounded-md overflow-hidden shadow-lg bg-gray-800 hover:shadow-xl transition-all">
            <img
              src={dragonballz}
              alt="Dragon Ball Z"
              className="w-full h-auto transform group-hover:scale-105 transition-all"
            />
            <div className="absolute top-2 left-2 bg-red-500 text-xs font-bold text-white py-1 px-2 rounded-full">
              SALE
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-200 font-semibold text-sm">
                Dragon Ball Z : Broly
              </p>
              <p className="text-gray-400 text-sm mt-1">From $4.99</p>
            </div>
          </div>

          {/* Deal 2 */}
          <div className="group relative rounded-md overflow-hidden shadow-lg bg-gray-800 hover:shadow-xl transition-all">
            <img
              src={spider}
              alt="The Spiderman"
              className="w-full h-auto transform group-hover:scale-105 transition-all"
            />
            <div className="absolute top-2 left-2 bg-red-500 text-xs font-bold text-white py-1 px-2 rounded-full">
              SALE
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-200 font-semibold text-sm">
                Spider-Man
              </p>
              <p className="text-gray-400 text-sm mt-1">From $7.99</p>
            </div>
          </div>

          {/* Deal 3 */}
          <div className="group relative rounded-md overflow-hidden shadow-lg bg-gray-800 hover:shadow-xl transition-all">
            <img
              src={panda}
              alt="Kung Fu Panda"
              className="w-full h-auto transform group-hover:scale-105 transition-all"
            />
            <div className="absolute top-2 left-2 bg-red-500 text-xs font-bold text-white py-1 px-2 rounded-full">
              SALE
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-200 font-semibold text-sm">
                Kung Fu Panda
              </p>
              <p className="text-gray-400 text-sm mt-1">From $7.99</p>
            </div>
          </div>

          {/* Deal 4 */}
          <div className="group relative rounded-md overflow-hidden shadow-lg bg-gray-800 hover:shadow-xl transition-all">
            <img
              src={madagascar}
              alt="Madagascar"
              className="w-full h-auto transform group-hover:scale-105 transition-all"
            />
            <div className="absolute top-2 left-2 bg-red-500 text-xs font-bold text-white py-1 px-2 rounded-full">
              SALE
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-200 font-semibold text-sm">
                Madagascar
              </p>
              <p className="text-gray-400 text-sm mt-1">From $3.99</p>
            </div>
          </div>

          {/* Deal 5 */}
          <div className="group relative rounded-md overflow-hidden shadow-lg bg-gray-800 hover:shadow-xl transition-all">
            <img
              src={spirited}
              alt="Spirited Away"
              className="w-full h-auto transform group-hover:scale-105 transition-all"
            />
            <div className="absolute top-2 left-2 bg-red-500 text-xs font-bold text-white py-1 px-2 rounded-full">
              SALE
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-200 font-semibold text-sm">
                Spirited Away
              </p>
              <p className="text-gray-400 text-sm mt-1">From $7.99</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deals;
