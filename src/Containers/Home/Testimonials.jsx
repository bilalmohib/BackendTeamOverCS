import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../../Styling/Testimonials.css"

export default class Testimonials extends Component {
    render() {
        return (
            <div>
                <br />
                <br />
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="c-b"><b>TESTIMONIALS</b></h1>
                        </div>
                    </div>
                </div>

                <Carousel
                    showArrows={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    autoPlay={true}
                    interval={2000}
                >
                    <div>
                        <img src="data:image/jpeg;base64,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" />
                        <div className="myCarousel">
                            <h3>Shirley Fultz</h3>
                            <h4>Designer</h4>
                            <p>
                                It's freeing to be able to catch up on customized news and not be
                                distracted by a social media element on the same site
                            </p>
                        </div>
                    </div>

                    <div>
                        <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--nSI8V6RE--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/81co8nilff5r9eer3xga.png" />
                        <div className="myCarousel">
                            <h3>Daniel Keystone</h3>
                            <h4>Cricketer</h4>
                            <p>
                                The simple and intuitive design makes it easy for me use. I highly
                                recommend Fetch to my peers.
                            </p>
                        </div>
                    </div>

                    <div>
                        <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--gRFMHqWs--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/1xwiaya5i7wweic3pz96.png" />
                        <div className="myCarousel">
                            <h3>Theo Sorel</h3>
                            <h4>Developer</h4>
                            <p>
                                I enjoy catching up with Fetch on my laptop, or on my phone when
                                I'm on the go!
                            </p>
                        </div>
                    </div>
                </Carousel>
                <br />
                <br />
            </div>
        );
    }
}