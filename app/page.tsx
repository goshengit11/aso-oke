import Navbar from"./components/navbar"
import Hero  from "./hero"
import Category from "./category"
import Footer from "./components/footer";
import Arrival from "./arrival"
export default function home (){
  return(
    <div className="bg-white">
        <Navbar/>
        <Hero/>
        <Category/>
        <Arrival/>
        <Footer/>
        
   </div>
  )
}