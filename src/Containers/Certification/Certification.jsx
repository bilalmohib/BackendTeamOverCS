import React, { useState, useEffect } from 'react';
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

// importing images
// importing images

import { Link, useHistory } from "react-router-dom"
import '../../css/Certification.css';

const Certification = (props) => {
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
                    <h1 className="TitleCarousal"><b>OUR CERTIFICATIONS</b></h1>
                    <div className="disc_top_width">
                        <h3 className="DiscCarousal">Home / Certifications</h3>
                    </div>
                </div>
            </div>
            {/* Projects section */}
            <div className="container">
                <br />
                <br />
                <br />
                <br />
                <br />
                {/* The Content will be placed here for certification */}
                <div className="row paddingMobile">
                    <div className="col-md-4 col-sm-12 certificationDiv">
                        <figure><img className="imgCertificate" src="http://galleriadesign.pk/images/certificates/1.jpg" /></figure>
                        <p className="text-center mt-3">Certified Professional Engineer Mr. Abdul Rauf Pakistan Engineering Council, 5 Dec, 2000</p>
                    </div>
                    <div className="col-md-4 col-sm-12 certificationDiv">
                        <figure><img className="imgCertificate" src="http://galleriadesign.pk/images/certificates/2.jpg" /></figure>
                        <p className="text-center mt-3">Registered Mr. Ghulam Dastgir as a Life Member on 3rd June,2008.</p>
                    </div>
                    <div className="col-md-4 col-sm-12 certificationDiv">
                        <figure><img className="imgCertificate" src="http://galleriadesign.pk/images/certificates/3.jpg" /></figure>
                        <p className="text-center mt-3">Registered Mr.Ghulam Dastgir as an Architect on 24th June,2006.</p>
                    </div>
                </div>

                <div className="row paddingMobile">
                    <div className="col-md-4 col-sm-12 certificationDiv">
                        <figure><img className="imgCertificate" src="http://galleriadesign.pk/images/certificates/5.jpg" /></figure>
                        <p className="text-center mt-3">Membership Certificate</p>
                    </div>
                    <div className="col-md-4 col-sm-12 certificationDiv">
                        <figure><img className="imgCertificate" src="http://galleriadesign.pk/images/certificates/4.jpg" /></figure>
                        <p className="text-center mt-3">Capital Development Authority.</p>
                    </div>
                </div>
                {/* The Content will be placed here for certification */}
            </div>

            <br />
            <br />
            <Footer />
            {/* Projects section */}
        </div >
    )
}

export default Certification;