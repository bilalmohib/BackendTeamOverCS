import React, { useState, useEffect } from 'react';
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

import '../../css/ProjectDetails.css';

import { Link } from "react-router-dom";

import { connect } from "react-redux"
import { get_all_projects_data } from '../../store/action/index';

import ImageGallery from 'react-image-gallery';

function ProjectDetails(props) {

    const [slideShowArray,setSlideShowArray] = useState([
        {
            original: '',
            thumbnail: ''
        }
    ]);

    useEffect(() => {
        props.get_all_projects_data();
        // let jobData = [];

        // //Taking data from job vacancy form
        // firebase.database().ref(`Projects/`).on('value', (snapshot) => {
        //     snapshot.forEach(function (data) {
        //         jobData.push(data.val())
        //         console.log(data.val())
        //     })

        //     console.log("TTTT", jobData);

        //     var tempArraySlideShow = [];

        //     for (let i = 0; i < jobData[props.SET_KEY].ImageURLArray.length; i++) {
        //         let tempObj = {
        //             original: jobData[props.SET_KEY].ImageURLArray[i],
        //             thumbnail: jobData[props.SET_KEY].ImageURLArray[i]
        //         }
        //         tempArraySlideShow.push(tempObj);
        //     }

        //     console.log("Barkhudar Dekho ghour se==>", tempArraySlideShow);

        //     

        //     setSlideShowArray(tempArraySlideShow);

        //     setprojectsData(jobData);

        // })

            var tempArraySlideShow = [];
            for (let i = 0; i < props.projects_data[props.SET_KEY].ImageURLArray.length; i++) {
                let tempObj = {
                    original: props.projects_data[props.SET_KEY].ImageURLArray[i],
                    thumbnail: props.projects_data[props.SET_KEY].ImageURLArray[i]
                }
                tempArraySlideShow.push(tempObj);
            }
            console.log("This is the temporary SlideShow Array==> ", tempArraySlideShow);

            setSlideShowArray(tempArraySlideShow);

    }, [])


    return (
        <div>
            <div className="container">
                <div className="fixed-top">
                    <Navbar />
                </div>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="container">
                <div className="linkingPD">
                    <Link to="/">Home</Link>
                    <i className="fas fa-angle-right text-gray ml-3 mr-2"></i> <Link to="/projects">Projects</Link>
                    <i className="fas fa-angle-right text-gray ml-3 mr-2"></i> Houses
                   <i className="fas fa-angle-right text-gray ml-3 mr-2"></i> Lahore
                   <i className="fas fa-angle-right text-gray ml-3 mr-2"></i> <span className="text-projectpd">A 5-marla house in DHA</span>
                </div>

                {(false) ? (
                    <h1 className="border text-center">Loading</h1>
                ) : (
                    <div>
                        <h1 className="projectTitlepd">{props.projects_data[props.SET_KEY].Title}</h1>
                        <br />

                        <div className="border">
                            <ImageGallery items={slideShowArray} thumbnailPosition="right" autoPlay={true} />
                        </div>
                        <br />

                        <h6>Curated by <b>Hana Abdel</b></h6>

                        <br />

                        <div className="border">
                            <div className="container">
                                <h4 className="mt-3"><b>Description :</b></h4>
                                <p dangerouslySetInnerHTML={{__html:props.projects_data[props.SET_KEY].Description}} className="discParaPD"/>
                                <hr />
                                <h4 className="mt-2"><b>Details :</b></h4>
                                <br />
                                <h6 className="discPD d-flex mt-0"><i className="fas fa-users mr-2 fa-lg"></i><p>Architects: <span className="discLinkPD">{props.projects_data[props.SET_KEY].Architects}</span></p></h6>
                                <h6 className="discPD d-flex"><i className="fas fa-chart-area mr-2 fa-lg"></i>&nbsp;<p>Area: <span className="discLinkPD">{props.projects_data[props.SET_KEY].Area} </span>m²</p></h6>
                                <h6 className="discPD d-flex"><i className="far fa-calendar-alt mr-2 fa-lg"></i>&nbsp;&nbsp;<p>Year: <span className="discLinkPD">{props.projects_data[props.SET_KEY].CompletionDate}</span></p></h6>
                                {/* <h6 className="discPD d-flex"><i className="fas fa-camera-retro mr-2 fa-lg"></i>&nbsp;<p>Photographs: <span className="discLinkPD">Bo Wong</span></p></h6> */}
                                <h6 className="discPD d-flex"><i className="fas fa-cube mr-2 fa-lg"></i>&nbsp;<p>Manufacturers: <span className="discLinkPD">{props.projects_data[props.SET_KEY].Manufacturers}</span></p></h6>
                                <h6 className="discPD d-flex"><i className="fas fa-square-full mr-2 fa-lg"></i>&nbsp;<p>Structural Engineering: <span className="discLinkPD">{props.projects_data[props.SET_KEY].StructuralEngineers}</span></p></h6>

                                <h6 className="discPD ml-4 d-flex">&nbsp;&nbsp;&nbsp;<p> Landscape Architect: <span className="discLinkPD">{props.projects_data[props.SET_KEY].LandscapeAchitects}</span></p></h6>
                                <h6 className="discPD ml-4 d-flex">&nbsp;&nbsp;&nbsp;<p> Project Architects: <span className="discLinkPD">{props.projects_data[props.SET_KEY].ProjectArchitects}</span></p></h6>
                                <h6 className="discPD ml-4 d-flex">&nbsp;&nbsp;&nbsp;<p> City: <span className="discLinkPD">{props.projects_data[props.SET_KEY].City}</span></p></h6>
                                <h6 className="discPD ml-4 d-flex">&nbsp;&nbsp;&nbsp;<p> Country: <span className="discLinkPD">{props.projects_data[props.SET_KEY].Country}</span></p></h6>
                                <h6 className="discPD d-flex"><i className="fas fa-compass mr-2 fa-lg"></i>&nbsp;&nbsp;<p> Project Location:</p></h6>
                                <iframe id="mappd" src={props.projects_data[props.SET_KEY].GoogleMapLink} allowFullScreen loading="lazy" />
                            </div>
                        </div>
                    </div>
                )}

            </div>


            <br />
            <br />
            <Footer />
            {/* Projects section */}
        </div>
    )
}

const mapStateToProps = (state) => ({
    SET_KEY: state.app.SET_KEY,
    projects_data: state.app.GET_PROJECTS_DATA
})
const mapDispatchToProp = (dispatch) => ({
    get_all_projects_data: () => dispatch(get_all_projects_data()),
})
export default connect(mapStateToProps, mapDispatchToProp)(ProjectDetails);