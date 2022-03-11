import React, { useState, useEffect } from 'react';

import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

// importing images
import img1 from "../../assets/service-architechture.png";
import img2 from "../../assets/service-interior.png";
import img3 from "../../assets/how-we-work.png";
// importing images

import { Link, useHistory } from "react-router-dom"
import '../../css/Services.css';

const Services = (props) => {
    const history = useHistory();
    const handleRowClick = (e) => {
        history.push(`/${e}`);
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
                    <h1 className="TitleCarousal">OUR SERVICES</h1>
                    <div className="disc_top_width">
                        <h3 className="DiscCarousal">Home / Services</h3>
                    </div>
                </div>
            </div>
            {/* About us Page section */}
            <div className="container">
                <br />
                <br />
                <br />
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="text-services-page-title text-left">ARCHITECTURE</h1>
                        <br />
                        <h5 className="text-left paddingMobile">
                            At Amer Adnan Associates we believe that architecture is a combination of art and science. Our design principles are based on honesty and practicality, where a variety of styles can cater to our clients’ individual tastes and preferences. The single unifying theme within all these spaces is to make the client ‘feel good’. Creating such wholesome experiences also depends on interior design, which aims to use materials, colors and lights in ways that are both aesthetically pleasing and relaxing.
                        </h5>
                        <br />
                        <h5 className="text-left paddingMobile">
                            The location plays a pivotal role in the concept design phase since the building needs to interact with its surroundings – so when it comes to facades it can be made to blend in or to boldly stand out. It is with the careful utilization of on-site resources, such as existing foliage, breezeways and existing sunlight to shade, light and cool the building, that we develop our architectural designs, especially when designing for the hotter, drier areas of Punjab.
                        </h5>
                    </div>
                    <div className="col-md-6">
                        <br /><br /><br />
                        <img className="ml-4 servicesImage" src={img1} alt="architecture" />
                    </div>
                </div>
            </div>
            {/* Meet the founder block */}
            <div className="border mtfb">
                <br /><br /><br />
                <h1 className="text-about-page-title">WHY AMER ADNAN ASSOCIATES?</h1>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-center">
                                <iframe className="mtfbVideo" src="https://www.youtube.com/embed/_pzMDr2C6GU" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
            </div>
            <div className="container">
                <br />
                <br />
                <br />
                <br />
                <div className="row">
                    <div className="col-md-6">
                        <img className="ml-4 servicesImage" src={img2} alt="architecture" />
                    </div>
                    <div className="col-md-6">
                        <br /><br /><br />
                        <h1 className="text-services-page-title text-left">INTERIOR DESIGN</h1>
                        <br />
                        <h5 className="text-left paddingMobile">
                            We infuse a touch of client’s personality into a space! While interior design is about making a space feel like a cohesive whole, with the exterior as well as functionality of the building, it is also about invoking a feeling. AAA aims to create wellness spaces that allow the occupant to ‘feel good’. This could be through indirect lighting, the interplay of hard and soft materials (juxtaposing marble slabs and plantation) or through a hand-crafted wrought iron sculpture. The designs are honest because our interior designers in Pakistan give the client an end-product that is well-thought-out and suited to their usage, specific requirements and taste. Always.
                        </h5>
                    </div>
                </div>
            </div>
            <br />
            <div className="projectBlock">
                <button onClick={() => handleRowClick('projects')} className="projectBtn">VIEW ALL FEATURED PROJECTS HERE<i className="ml-2 fas fa-chevron-right text-bold"></i></button>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="text-services-page-title text-left">CONSTRUCTION</h1>
                        <br />
                        <h5 className="text-left paddingMobile">
                            We start with our client’s vision in mind! At AAA, the construction process is completely transparent. Our clients are informed about material specifications and vendors beforehand. The project adheres to a construction timeline and the on-site labor is among the best in their respective areas of work. Supervisors are responsible for ensuring smooth on-site operations and construction in Pakistan and act as a liaison between the client and the design team when it comes to on-site changes. Having an in- house construction company in Pakistan gives the added advantage of smooth project delivery and design implementation during turnkey projects. Our engineers and architects work holistically so that even the most complicated of designs (which are also usually the most innovative) is refined and implemented on-site.
                        </h5>
                    </div>
                    <div className="col-md-6">
                        <br /><br /><br />
                        <img className="ml-4 servicesImage" src={img1} alt="architecture" />
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

export default Services;