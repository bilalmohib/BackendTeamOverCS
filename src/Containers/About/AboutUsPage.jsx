import React, { useState, useEffect } from 'react';

import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

// importing images
import img1 from "../../assets/who-we-are.png";
import img2 from "../../assets/what-we-do.png";
import img3 from "../../assets/how-we-work.png";
// importing images

import { Link, useHistory } from "react-router-dom"
import '../../css/About.css';

const AboutUsPage = (props) => {
    const history = useHistory();
    const handleRowClick = () => {
        history.push(`/docs`);
    }

    useEffect(() => {
        // The debounce function receives our function as a parameter
        const debounce = (fn) => {
            // This holds the requestAnimationFrame reference, so we can cancel it if we wish
            let frame;
            // The debounce function returns a new function that can receive a variable number of arguments
            return (...params) => {
                // If the frame variable has been defined, clear it now, and queue for next frame
                if (frame) {
                    cancelAnimationFrame(frame);
                }
                // Queue our function call for the next frame
                frame = requestAnimationFrame(() => {
                    // Call our function and pass any params we received
                    fn(...params);
                });
            }
        };

        // Reads out the scroll position and stores it in the data attribute
        // so we can use it in our stylesheets
        const storeScroll = () => {
            document.documentElement.dataset.scroll = window.scrollY;
        }

        // Listen for new scroll events, here we debounce our `storeScroll` function
        document.addEventListener('scroll', debounce(storeScroll), { passive: true });

        // Update scroll position for first time
        storeScroll();
    })

    return (
        <div>
            <div className="container">
                <div className="fixed-top">
                    <Navbar transparent={true} />
                </div>
            </div>
            <div className="bgimg-1">
                <div className="caption">
                    <div className="disc_top_width">
                        <h1 className="TitleCarousal">ABOUT US</h1>
                        <h3 className="DiscCarousal">Home / About us</h3>
                    </div>
                </div>
            </div>
            {/* About us Page section */}
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <br />
                        <br />
                        <h1 className="text-about-page-title">ABOUT Team Overc’s architects</h1>
                        <br />
                    </div>
                </div>
                <div className="paddingMobile row text-center">
                    <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                        <img src={img1} alt="Architecture" />
                        <h2>WHO WE ARE</h2>
                        <h5>Amer Adnan Associates is an architectural design and construction firm that focuses on designing spaces that encourage wellness. AAA was founded by Mr. Amer Adnan; he’s built a team of professionals that can cater to clients’ requirements to deliver the most optimal solutions; and have made a portfolio that extends national borders.</h5>
                    </div>
                    <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                        <img src={img2} alt="Interior Design" />
                        <h2>WHAT WE DO</h2>
                        <h5>From remodeling to creating to interior design, we do it all! Technology-oriented office spaces, chic cafes and luxury homes, we strive for perfection and innovation in both residential and commercial projects. Our customer-centric philosophy ensures a unique approach to each project based on the client's expectations.</h5>
                    </div>
                    <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                        <img src={img3} alt="Construction" />
                        <h2>HOW WE WORK</h2>
                        <h5>AAA’s work is best defined by two words – seamless integration. Every project undertaken is ensured to be cost and energy efficient. Our clients are always at the forefront of all decision-making throughout the project with free choice in terms of vendor as well as convenience in level of supervision to provide the optimal outcome.</h5>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <div className="row">
                    <div className="col-md-6">
                        <img className="founderImage" src="http://www.ameradnan.com/wp-content/themes/ameradnan/images/ceo-ameradnan.png" alt="" />
                    </div>
                    <div className="col-md-6">
                        <br /><br /><br /><br /><br />
                        <div className="streak streak-md streak-photo">

                            <div className="marginDesktop flex-center text-dark rgba-light pattern-1">
                                <ul className="mb-0 list-unstyled">
                                    <li>
                                        <h2 className="h2-responsive"> <br />
                                            <i className="fas fa-quote-left" aria-hidden="true" /> The people who are
                                         crazy enough to think they can change the world are the ones who do. <i className="fas fa-quote-right" aria-hidden="true" /></h2>
                                    </li>
                                    <li className="mb-0">
                                        <h5 className="text-center font-italic mb-0">~ Steve Jobs</h5>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Meet the founder block */}
            <div className="border mtfb">
                <br /><br /><br /><br />
                <h1 className="text-about-page-title">MEET THE FOUNDER</h1>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="text-center paddingMobile">After spending twenty years studying and working in the United States, Mr. Amer Adnan returned to his homeland Pakistan to foster his entrepreneurial side. He always had a passion for interior design and the rise of architectural firms in a region where the concept was not widely popular before, intrigued him. After conducting some research, he concluded that though the Pakistani community had become receptive to the idea of hiring professional help and most architectural firms represented a signature style. Ideas were thrown upon clients to choose from and the mere facade of a structure could reveal the designer behind it. Mr. Amer wanted his work to represent the dreams and desires of each unique customer rather than a symbolic product embodying the organization’s style. That is when the ‘customer centric’ Amer Adnan Associates was brought to life in 2002 with a majority of its residential and commercial projects taking place in the Punjab region. The AAA team now provides architectural design and construction services nationwide - specifically in Islamabad, Rawalpindi, and Lahore.</h5>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
            </div>
            {/* Meet the founder block */}
            <div className="container">
                <div className="row">
                    <div className="why">
                        <br />
                        <br />
                        <br />
                        <h1 className="text-about-page-title">WHY Team Overc’s architects?</h1>
                        <br />
                        <div className="text-center">
                            <iframe className="mtfbVideo" src="https://www.youtube.com/embed/_pzMDr2C6GU" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <Footer />
            {/* About us Page section */}
        </div >
    )
}

export default AboutUsPage;