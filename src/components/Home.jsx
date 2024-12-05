import { useLoaderData } from "react-router-dom"
import Banner from "./Banner"
import Featured from "./Featured"

function Home() {
    const featuresMovieData = useLoaderData();
    // console.log(featuresMovieData);
    return (
        <div>
           <Banner/>
           <Featured featuresMovieData={featuresMovieData}/>
        </div>
    )
}

export default Home
