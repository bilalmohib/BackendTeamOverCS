import React, { useState } from 'react';

//Components imported here
import Navbar from "../../Components/Navbar";
import Carousal from "./Carousal";
import About from "./About";
import CompanyDetails from "./CompanyDetails";
import Projects from "./Projects";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Footer from "../../Components/Footer";
//Components imported here

import '../../css/Home.css';

const Home = (props) => {
    return (
        <div>
            <div className="container">
                <div className="fixed-top">
                    <Navbar transparent={true} />
                </div>
            </div>


            <Carousal />

            <div className="container">
                <About />
                <CompanyDetails />
                <Services />
                <Projects />
                <Testimonials/>
            </div>


            <Footer />

        </div>
    )
}
export default Home;