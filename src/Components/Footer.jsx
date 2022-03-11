import React from "react";
import logo from "../assets/logo1.png";
import "../Styling/Footer.css";

export default class Testimonials extends React.PureComponent {
    render() {
        return (
            <footer className="footer">
                <br />
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-xs-4 col-lg-4 col-md-4 col-sm-4">
                            <img className="footer-logo" src={logo} width="280" alt="logo" />
                            <p className="text-white">Team Overc’s is a trusted name in the house construction and consultancy industry. With the extensive experience in the field since 2011, Team Overc’s has made a name for itself providing high quality Construction and Building services to its clientele.</p>
                            <br/>
                        </div>
                        <div className="col-xs-4 col-lg-4 col-md-4 col-sm-4">
                            <h3 className="text-white">ADDRESS</h3>
                            <br />
                            <p className="text-primary">Location</p>
                            <p className="text-white">17 Block E-2, Gulberg-3,<br />Lahore</p>
                            <br />
                            <p className="text-primary">Talk to Us</p>
                            <p className="text-white">+92-42-35774353<br />+92-302-4666366</p>
                            <br/>
                        </div>
                        <div className="col-xs-4 col-lg-4 col-md-4 col-sm-4">
                            <form action="">
                                <h3 className="text-white">CONTACT US</h3>
                                <br />
                                <input className="form-control" id="footer-form-name" placeholder="Name" required type="text" />
                                <br />
                                <input className="form-control" id="footer-form-email" placeholder="Email" required type="email" />
                                <br />
                                <input className="form-control" id="footer-form-number" placeholder="Phone" required type="number" />
                                <br />
                                <textarea className="form-control" id="footer-form-message" name="message" required cols="30" rows="3" placeholder="Message"></textarea>
                                <br />
                                <button className="btn btn-warning" id="btn-send">Send Message</button>
                            </form>
                        </div>
                    </div>
                    <br />
                    <br/> 
                    <div className="row">
                        <div className="col-xs-4 col-lg-4 col-md-4 col-sm-4">
                            <p className="text-center"><a className="text-grey" href="#!">Sitemap</a></p>
                        </div>
                        <div className="col-xs-4 col-lg-4 col-md-4 col-sm-4">
                            <p className="text-center text-grey">Copyright © 2021 Team Overc’s Architects</p>
                        </div>
                        <div className="col-xs-4 col-lg-4 col-md-4 col-sm-4">
                            <p className="text-center text-grey">Designed and Developed by _____</p>
                        </div>
                    </div>
                    <br />
                </div>
            </footer>
        );
    }
}