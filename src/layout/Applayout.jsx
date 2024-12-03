import { Outlet } from "react-router-dom"
import Home from "../components/Home"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

function Applayout() {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Applayout
