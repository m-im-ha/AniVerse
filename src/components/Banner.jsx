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
      title: "What we’re watching now.",
      description:
        "This is just a peek. Choose from thousands of free ad-supported titles from our on-demand library.",
      button: "See What’s On",
    },
    {
      image: moana,
      title: "Exclusive Content for You!",
      description:
        "Explore new releases and timeless classics at no extra cost.",
      button: "Explore Now",
    },
    {
      image: incredible,
      title: "Watch Anytime, Anywhere",
      description: "Stream content across devices and never miss a moment.",
      button: "Start Watching",
    },
  ];
  return (
    <div className="relative w-full h-[500px]">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 4000 }}
        loop
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-center items-start px-20 text-white">
                <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg mb-6">{slide.description}</p>
                <button className="bg-white text-black py-2 px-4 rounded hover:bg-gray-200">
                  {slide.button}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
