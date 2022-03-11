import React, { useState, useEffect } from 'react';
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

// importing images

// importing images

import { Link, useHistory } from "react-router-dom"
import '../../css/Contact.css';

const Contact = (props) => {
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
                    <h1 className="TitleCarousal"><b>Contact Us</b></h1>
                    <div className="disc_top_width">
                        <h3 className="DiscCarousal">Home / Contact Us</h3>
                    </div>
                </div>
            </div>
            {/* Contact Us section */}
            <div className="container">
                <br />
                <br />
                <br />
                <br />
                <div className="row">
                    <h1 className="text-about-page-title paddingMobile">GET IN TOUCH WITH US</h1>
                </div>

                <div className="row paddingMobile">
                    <div className="col-md-4 text-center">
                        <br /><br />
                        <i className="fas fa-mobile-alt fa-3x text-success"></i>
                        <br /><br />
                        <h6 className="gitt">Phone</h6>
                        <h6 className="gittd">+92 42 357 74353</h6>
                        <h6>+92 302 466 6366</h6>
                        <br /><br />
                    </div>
                    <div className="col-md-4 text-center">
                        <br /><br />
                        <i className="fas fa-map-marker-alt fa-3x text-danger"></i>
                        <br /><br />
                        <h6 className="gitt">Address</h6>
                        <h6 className="gittd">17 Block E-2, Gulberg-3, Lahore</h6>
                        <br /><br />
                    </div>
                    <div className="col-md-4 text-center">
                        <br /><br />
                        <i className="far fa-envelope fa-3x text-primary"></i>
                        <br /><br />
                        <h6 className="gitt">Email</h6>
                        <h6 className="gittd">info@ameradnan.com</h6>
                        <br /><br />
                    </div>
                </div>

                <div className="row paddingMobile">
                    <h1 className="text-about-page-title w-70p">WOULD YOU LIKE US TO BUILD YOUR NEXT PROJECT? GREAT!</h1>

                    <h6 className="text-center mt-4">Fill this up and we will get back to you as soon as possible. <br /> <br /></h6>
                    <div className="w-75p mt-4">
                        <input type="text" placeholder="Name" id="name" className="form-control" />
                        <br />
                        <input type="email" placeholder="Email" id="email" className="form-control" />
                        <br />
                        <input type="number" placeholder="Phone Number" id="phone" className="form-control" />
                        <br />
                        <textarea placeholder="Message" className="form-control w-100p" name="" id="message" rows="10"></textarea>
                        <br />
                        <button id="sendbtn" className="btn btn-primary ml-0">Send Message</button>
                        <br /><br /><br /><br />
                    </div>
                </div>
                <h1 className="text-about-page-title">CONNECT WITH US</h1>
                <br />
                <div className="text-center">
                    {/* Facebook */}
                    <a className="btn btn-primary" id="facebook-btn" href="https://web.facebook.com/Teamovercs.Architects/?_rdc=1&_rdr" role="button"><i className="fab fa-facebook-f fa-lg" /></a>
                    {/* Twitter */}
                    <a className="btn btn-primary" id="twitter-btn" href="https://twitter.com/hashtag/teamovercsarchitects" role="button"><i className="fab fa-twitter fa-lg" /></a>
                    {/* Whatsapp */}
                    <a className="btn btn-primary" id="whatsapp-btn" href="https://api.whatsapp.com/send/?phone=%2B923094555595&text&app_absent=0" role="button"><i className="fab fa-whatsapp fa-lg" /></a>
                    {/* Instagram */}
                    <a className="btn btn-primary" id="instagram-btn" href="https://www.instagram.com/teamovercs.architects/" role="button"><i className="fab fa-instagram fa-lg" /></a>
                    {/* Linkedin */}
                    <a className="btn btn-primary" id="linkedin-btn" href="https://pk.linkedin.com/company/team-overcs-architects" role="button"><i className="fab fa-linkedin-in fa-lg" /></a>
                    {/* Pinterest */}
                    <a className="btn btn-primary" id="pinterest-btn" href="https://www.pinterest.com/TeamOvercsArchitects/" role="button"><i className="fab fa-pinterest fa-lg" /></a>
                </div>
                <br /><br />
            </div>
            <br /><br />
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3402.726278928045!2d74.44907!3d31.476715!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190926aaaaaaab%3A0xef04fa700c084abd!2sTeam%20Overcs%20Architects!5e0!3m2!1sen!2s!4v1621110029864!5m2!1sen!2s" height={500} style={{ border: "0", width: "100%" }} allowFullScreen loading="lazy" />
            {/* Contact Us Section */}
            <Footer />
            {/* Projects section */}
        </div >
    )
}

export default Contact;