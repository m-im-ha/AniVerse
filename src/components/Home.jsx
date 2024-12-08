import { useLoaderData } from "react-router-dom"
import Banner from "./Banner"
import Featured from "./Featured"
import SeeAllButton from "./SeeAllButton";
import MediaShowcase from "./MediaShowcase";

function Home() {
    const featuresMovieData = useLoaderData();
    // console.log(featuresMovieData);
    return (
        <div>
           <Banner/>
           <Featured featuresMovieData={featuresMovieData}/>
           <SeeAllButton/>
           <MediaShowcase/>
        </div>
    )
}

export default Home
