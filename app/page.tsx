import Navbar from"./components/navbar"
import Hero  from "./hero"
import Category from "./category"
import Custom from "./custom"
import Arrival from "./arrival"
import Footer from "./components/footer";

export default function home (){
  return(
    <div className="bg-white">
        <Navbar/>
        <Hero/>
        <Category/>
        <Custom/>
        <Arrival/>
        <Footer/>
        
   </div>
  )
}