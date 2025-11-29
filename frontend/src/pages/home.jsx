import AdvancedCenterSearch from "../components/AdvancedCenterSearch"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import RoutesTester from "../components/RoutesTester"
import HeroCarousel from "../components/HeroCarousel"


export const Home=()=>{

    return(
        <>
        <Navbar/>
        <HeroCarousel/>
        <div className="h-100">
            <h1 className="m-10 p-10">This is Home</h1>
            {/* <RoutesTester/> */}
            <h1 className="m-10 p-10">This is Home</h1>
            
        </div>
        <AdvancedCenterSearch/>
        <Footer/>
        </>
    )
}