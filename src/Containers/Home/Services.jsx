import React, { useEffect } from 'react';

//Importing images
import img1 from "../../assets/architecture.png";
import img2 from "../../assets/interior.png";
import img3 from "../../assets/construction.png";
//Importing images

import '../../Styling/Services.css';

function Services() {

    return (
        <div>
            <br />
            <br />
            <br />
            {/* Our Services */}
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="c-b"><b>OUR SERVICES</b></h1>
                        <br/>
                        <p className="s-para">World-class architectural commercial and residential solutions tailored to your needs.</p>
                        <br/>
                        <div className="row text-center paddingMobileServices">
                            <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                <img src={img1} alt="Architecture"/>
                                <h2>Architecture</h2>
                                <h5>We strongly believe that architecture is a combination of art and science</h5>
                            </div>
                            <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                <img src={img2} alt="Interior Design"/>
                                <h2>Interior Design</h2>
                                <h5>We aim to create wellness spaces that allow the occupant to ‘feel good’.</h5>
                            </div>
                            <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                <img src={img3} alt="Construction"/>
                                <h2>Architecture</h2>
                                <h5>We ensure our construction process is completely transparent</h5>
                            </div>
                            <button className="btn btn-transparent" id="learnMore">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            {/* Our Services */}
        </div>
    )
}
export default Services;