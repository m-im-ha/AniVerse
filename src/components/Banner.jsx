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
      color: "from-red-500/70 to-blue-900/70",
    },
    {
      image: moana,
      title: "Exclusive Content for You!",
      description:
        "Explore new releases and timeless classics at no extra cost.",
      button: "Explore Now",
      color: "from-blue-500/70 to-purple-900/70",
    },
    {
      image: incredible,
      title: "Watch Anytime, Anywhere",
      description: "Stream content across devices and never miss a moment.",
      button: "Start Watching",
      color: "from-green-500/70 to-indigo-900/70",
    },
  ];

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
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
                <div className="max-w-md md:max-w-lg lg:max-w-2xl space-y-4 md:space-y-6 text-white transform transition-all duration-700 hover:scale-[1.02]">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                    {slide.title}
                  </h2>
                  <p className="text-sm md:text-lg lg:text-xl mb-4 md:mb-6 text-white/90 font-medium leading-relaxed">
                    {slide.description}
                  </p>
                  <button className="px-6 py-2 md:px-8 md:py-3 lg:px-10 lg:py-4 bg-white text-black font-bold text-sm md:text-base lg:text-lg rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center group">
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
