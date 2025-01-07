import { useTheme } from "../provider/ThemeProvider";
import dragonballz from "/assets/dragonball.jpg";
import spider from "/assets/spider.jpg";
import madagascar from "/assets/madagascar.jpg";
import panda from "/assets/panda.jpg";
import spirited from "/assets/spirited.jpg";

function Deals() {
  const { theme } = useTheme();
  
  const deals = [
    { id: 1, image: dragonballz, title: "Dragon Ball Z : Broly", price: "4.99" },
    { id: 2, image: spider, title: "Spider-Man", price: "7.99" },
    { id: 3, image: panda, title: "Kung Fu Panda", price: "7.99" },
    { id: 4, image: madagascar, title: "Madagascar", price: "3.99" },
    { id: 5, image: spirited, title: "Spirited Away", price: "7.99" }
  ];

  return (
    <div className={`mt-6 min-h-screen py-16 px-4 sm:px-6 lg:px-8 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-black via-purple-950 to-black'
        : 'bg-gradient-to-br from-slate-100 via-white to-slate-100'
    }`}>
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl ${
          theme === 'dark' ? 'bg-purple-600/10' : 'bg-teal-500/10'
        }`}></div>
        <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl ${
          theme === 'dark' ? 'bg-purple-600/10' : 'bg-teal-500/10'
        }`}></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className={`text-5xl md:text-6xl font-extrabold mb-6 font-mont ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Holiday <span className={
              theme === 'dark' ? 'text-purple-400' : 'text-teal-500'
            }>Deals</span>
          </h1>
          <p className={`text-lg md:text-xl font-mont ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Your home for exclusive offers, daily deals & more! Sale price,
            title, and availability vary.
          </p>
        </div>

        {/* Daily Deals Section */}
        <div>
          <h2 className={`text-2xl md:text-3xl font-bold mb-8 font-mont ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Daily Deals
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className={`group rounded-xl overflow-hidden shadow-lg 
                transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:shadow-purple-500/20'
                    : 'bg-white/80 backdrop-blur-sm border border-slate-200/50 hover:shadow-teal-500/20'
                }`}
              >
                {/* Image Container */}
                <div className="relative aspect-[14/12] overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover transition-transform duration-500 
                    group-hover:scale-110"
                  />
                  {/* Sale Badge */}
                  <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold
                    backdrop-blur-sm ${
                      theme === 'dark'
                        ? 'bg-purple-500/80 text-white'
                        : 'bg-teal-500/80 text-white'
                    }`}>
                    SALE
                  </div>
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300 ${
                      theme === 'dark'
                        ? 'bg-gradient-to-t from-purple-900/80 to-transparent'
                        : 'bg-gradient-to-t from-teal-900/80 to-transparent'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className={`text-base font-bold truncate font-mont ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {deal.title}
                  </h3>
                  <div className={`mt-2 font-mont ${
                    theme === 'dark' ? 'text-purple-400' : 'text-teal-600'
                  }`}>
                    From ${deal.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deals;