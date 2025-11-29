import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import RoutesTester from "../components/RoutesTester"


export const Home=()=>{

    return(
        <>
        <Navbar/>
        <div className="h-100">
            <h1 className="m-10 p-10">This is Home</h1>
            {/* <RoutesTester/> */}
            <h1 className="m-10 p-10">This is Home</h1>
            
        </div>
        <Footer/>
        </>
    )
}