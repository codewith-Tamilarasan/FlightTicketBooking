import React from "react";
import flight from "../Images/flight.jpg"
import {useNavigate} from "react-router-dom"
import '../App.css'

const Home =()=>{
    const nav = useNavigate();
    const handlelogin =()=>{
       nav(`/user-login`)
    }
    const handlesignup =()=>{
        nav(`/signup`)
    }

    return(
        
        <div className="bg-black-700">   
            <div className="border  bg-gray-300 border-black-800 flex justify-center p-10  w:auto m-5 rounded-lg">
                <div className="  border border-black-500 p-8  bg-gray-100 rounded-lg mr-20 hover:bg-green-800">
                  
                    <div className="w-10 flex justify-center ">
                        <img src={flight} alt="noflight"></img>
                    </div>
                    <div>
                    <h1 className="flex justify-center font-bold text-xl ">Book To Fly</h1>
                    </div>
                </div>

                <div className="flex justify-start items-end px-10">
            
                    <button className="border border-gray-500 h-fit p-2 mr-5 bg-gray-50 text-black-700 font-semibold hover:bg-blue-400 focus:text-white-900 rounded-lg hover:font-bold" onClick={()=>handlelogin()}>LOGIN</button>
                    <button className="border border-gray-500 h-fit p-2 mr-5  bg-gray-50 text-black-700 font-semibold hover:bg-blue-400 focus:text-white-900 rounded-lg hover:font-bold "onClick={()=> handlesignup()} >SIGN UP</button>
                    <button className="border border-gray-500 h-fit p-2 mr-5 bg-gray-50 text-black-700 font-semibold hover:bg-blue-400 focus:text-white-900 rounded-lg hover:font-bold" >ABOUT</button>
                </div>
    
            </div>
      


        </div>  
    );
}
export default Home;