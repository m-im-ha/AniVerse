import { NavLink } from "react-router-dom"

function Navlinks() {
    return (
        <div className="flex justify-around bg-pink-200">
            <NavLink to="/">Logo</NavLink>
            <NavLink to="/">Home</NavLink>
            <NavLink to="allmovies">All Movies</NavLink>
            <NavLink to="deals">Deals</NavLink>
            <NavLink to="favoritemovies">My Favorites</NavLink>
            <NavLink to="addmovie">Add Movie</NavLink>
            <NavLink to="login">Login</NavLink>
            <NavLink to="register">Register</NavLink>
        </div>
    )
}

export default Navlinks
