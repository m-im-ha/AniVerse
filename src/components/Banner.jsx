import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import avenger from "/assets/avenger-bg.webp";
import moana from "/assets/moana-bg.webp";
import incredible from "/assets/incredible-bg.webp";

function Banner() {
  const slides = [
    {
      image: avenger,
      title: "What we're watching now.",
      description:
        "This is just a peek. Choose from thousands of free ad-supported titles from our on-demand library.",
      button: "See What's On",
      color: "from-black/80 to-purple-950/80",
    },
    {
      image: moana,
      title: "Exclusive Content for You!",
      description:
        "Explore new releases and timeless classics at no extra cost.",
      button: "Explore Now",
      color: "from-black/80 to-slate-900/80",
    },
    {
      image: incredible,
      title: "Watch Anytime, Anywhere",
      description: "Stream content across devices and never miss a moment.",
      button: "Start Watching",
      color: "from-black/80 to-slate-800/80",
    },
  ];

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] font-mont">
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 3000 }}
      loop
      className="h-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-1000 transform hover:scale-105"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${slide.color}`}
              ></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex items-center h-full container mx-auto px-4 md:px-8 lg:px-16">
              <div className="max-w-md md:max-w-lg lg:max-w-2xl space-y-3 md:space-y-4 text-white transform transition-all duration-700 hover:scale-[1.02]">
                <h2 className="text-xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight mb-2 md:mb-3">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">
                    {slide.title}
                  </span>
                </h2>
                <p className="text-sm md:text-base lg:text-lg mb-3 md:mb-4 text-gray-200 font-medium leading-relaxed">
                  {slide.description}
                </p>
                <button className="px-5 py-2 md:px-6 md:py-2.5 lg:px-8 lg:py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-bold text-sm md:text-base rounded-full hover:from-teal-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center group">
                  {slide.button}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 ml-2 md:ml-3 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  );
}

export default Banner;