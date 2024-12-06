import { useNavigate } from "react-router-dom"

function SeeAllButton() {
    const navigate = useNavigate();

    function handleSeeAllMovies(){
        navigate("/allmovies");
    }

    return (
        <div className="flex justify-center mt-5 mb-20">
            <button onClick={handleSeeAllMovies} className="p-4 bg-blue-400 text-white">See All Movies</button>
        </div>
    )
}

export default SeeAllButton
