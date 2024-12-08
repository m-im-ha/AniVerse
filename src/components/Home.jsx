import { useLoaderData } from "react-router-dom";
import Banner from "./Banner";
import Featured from "./Featured";
import SeeAllButton from "./SeeAllButton";
import MediaShowcase from "./MediaShowcase";
import ServiceHighlights from "./ServiceHighlights";

function Home() {
  const featuresMovieData = useLoaderData();
  // console.log(featuresMovieData);
  return (
    <div>
      <Banner />
      <Featured featuresMovieData={featuresMovieData} />
      <SeeAllButton />
      <ServiceHighlights />
      <MediaShowcase />
    </div>
  );
}

export default Home;
