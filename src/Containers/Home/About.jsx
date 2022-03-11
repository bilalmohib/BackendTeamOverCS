import React from 'react';

import { Link, useHistory } from "react-router-dom"
import '../../css/About.css';

function About() {
    return (
        <div>
            {/* About us section */}
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h5 className="aboutHead">WELCOME TO TEAM OVER CS ARCHITECTS</h5>
                        <h2 className="text-dark about-title"><b>About</b></h2>
                        <p className="about-para">Team Overc’s is a trusted name in the house construction and consultancy industry. With the extensive experience in the field since 2011, Team Overc’s has made a name for itself providing high quality Construction and Building services to its clientele. <br/>
                        With prime focus to serve expatriates and overseas Pakistanis, Team Overc’s not only provides necessary expertise in the construction, but leaps a step ahead to make sure that the turn-key solution is provided. Either it be residential construction or commercial, brick structure of frame structure, grey structure of complete finishing, our first and foremost priority is client’s satisfaction and ease that starts from the very first step in form of detailed paper work including quotations, bill of materials, agreements & contracts, regular interaction throughout the execution of project, addressing issues and successfully completing the project.
                        <br/>
                        Team Overc’s is committed to provide quality and hassle-free service assuring peace of mind to the clientele with clear communication and transparent business processes. Using the earned experience and knowledge, Team Overc’s also guarantees reliable and construction cost effective solutions with responsive after service to the clientele. We make long lasting relations with our clients by providing high quality services.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <img className="aboutImage" src="http://galleriadesign.pk/images/service_p.jpg" alt="About Us Image"/>
                    </div>
                </div>
            </div>
            {/* About us section */}
        </div >
    )
}

export default About;