import React from 'react'
import './Hero.css'
import backpic from "../Assets/backpic.jpg"
import { Link } from 'react-router-dom'
const Hero = () =>{
    return(
              <div className='hero'>
            <img src={backpic} alt="Background" className="hero-image" />
            <div className="hero-overlay">
                <h1>Improve your skills on your own To prepare for a better future</h1>
                <Link to='/SignUp'><button className="register-btn">REGISTER NOW</button></Link>
            </div>
        </div>
    )
}
export default Hero