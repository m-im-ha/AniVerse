import { useLoaderData } from "react-router-dom"
import Banner from "./Banner"
import Featured from "./Featured"
import SeeAllButton from "./SeeAllButton";

function Home() {
    const featuresMovieData = useLoaderData();
    // console.log(featuresMovieData);
    return (
        <div>
           <Banner/>
           <Featured featuresMovieData={featuresMovieData}/>
           <SeeAllButton/>
        </div>
    )
}

export default Home
