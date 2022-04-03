import React, { useState, useEffect } from 'react';

import { connect } from "react-redux";
import { setTodoList } from '.././store/action/index';

import logo from "../assets/logo1.png";

import { Link, useHistory } from "react-router-dom"
import '../Styling/Navbar.css';

const Navbar = (props) => {
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

    // const changeKey = (e) => {
    //     props.setCurrentKey(e);
    //     console.log("The Key is : ", props.SET_KEY);
    // }

    return (
        <div>
            {/* Navbar */}
            {(props.transparent) ? (
                <nav className="navbar navbar-expand-lg navbar-light">
                    {/* Container wrapper */}
                    <div className="container-fluid">
                        {/* Navbar brand */}
                        <Link to="/" className="navbar-brand">
                            <div style={{ display: "flex" }}>
                                <img className="logo" src={logo} alt="Team Overc's Architects" />
                                {/* <h2 id="logo-text">Team Over CS Architects</h2> */}
                            </div>
                        </Link>
                        {/* Toggle button */}
                        <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i id="header-bars" className="fas fa-bars" />
                        </button>
                        {/* Collapsible wrapper */}
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {/* Left links */}
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/admin" className="nav-link active t-none">ADMIN</Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link to="/about" className="nav-link t-none">ABOUT</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/services" className="nav-link t-none">SERVICES</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/projects" className="nav-link t-none">OUR PROJECTS</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/certification" className="nav-link t-none">OUR CERTIFICATION</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/contact" className="nav-link t-none">CONTACT US</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/cp" className="nav-link t-none">COMPANY PROFILE</Link>
                                </li> */}
                            </ul>
                            {/* Left links */}
                        </div>
                        {/* Collapsible wrapper */}
                    </div>
                    {/* Container wrapper */}
                </nav>
            ) : (
                <nav className="navbar navbar-expand-lg bg-dark navbar-light">
                    {/* Container wrapper */}
                    <div className="container-fluid">
                        {/* Navbar brand */}
                        <Link to="/" className="navbar-brand">
                            <div style={{ display: "flex" }}>
                                <img className="logo" src={logo} alt="Team Overc's Architects" />
                                {/* <h2 id="logo-text">Team Over CS Architects</h2> */}
                            </div>
                        </Link>
                        {/* Toggle button */}
                        <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i id="header-bars" className="fas fa-bars" />
                        </button>
                        {/* Collapsible wrapper */}
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {/* Left links */}
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/admin" style={{fontSize:"20px"}} className="nav-link active t-none">ADMIN PANEL</Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link to="/about" className="nav-link t-none">ABOUT</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/services" className="nav-link t-none">SERVICES</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/projects" className="nav-link t-none">OUR PROJECTS</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/certification" className="nav-link t-none">OUR CERTIFICATION</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/contact" className="nav-link t-none">CONTACT US</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/blog" className="nav-link t-none">BLOG</Link>
                                </li> */}
                            </ul>
                            {/* Left links */}
                        </div>
                        {/* Collapsible wrapper */}
                    </div>
                    {/* Container wrapper */}
                </nav>
            )}
            {/* Navbar */}
        </div >
    )
}

export default Navbar;