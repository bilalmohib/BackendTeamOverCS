import React, { useState, useEffect } from 'react';
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import ProjectsList from "../../Components/ProjectsList";

import { connect } from "react-redux"
import { get_all_projects_data } from '../../store/action/index';

import '../../css/Projects.css';

const Projects = (props) => {

    useEffect(() => {
        props.get_all_projects_data();
    }, [])

    return (
        <div>
            <div className="container">
                <div className="fixed-top">
                    <Navbar transparent={true} />
                </div>
            </div>

            <div className="bgimg-1">
                <div className="caption">
                    <h1 className="TitleCarousal"><b>Projects</b></h1>
                    <div className="disc_top_width">
                        <h3 className="DiscCarousal">Home / Projects</h3>
                    </div>
                </div>
            </div>
            <br />
          
            {/* Projects section */}
            <div className="container paddingMobile">
                <br />
                {/* Tabs navs */}
                <ul className="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
                    <li style={{ marginLeft: "0px" }} className="nav-item tabstitle" role="presentation">
                        <a className="nav-link active" id="ex3-tab-1" data-mdb-toggle="tab" href="#ex3-tabs-1" role="tab" aria-controls="ex3-tabs-1" aria-selected="true">All</a>
                    </li>
                    <li className="nav-item tabstitle" role="presentation">
                        <a className="nav-link" id="ex3-tab-2" data-mdb-toggle="tab" href="#ex3-tabs-2" role="tab" aria-controls="ex3-tabs-2" aria-selected="false">Commercial Exterior</a>
                    </li>
                    <li className="nav-item tabstitle" role="presentation">
                        <a className="nav-link" id="ex3-tab-3" data-mdb-toggle="tab" href="#ex3-tabs-3" role="tab" aria-controls="ex3-tabs-3" aria-selected="false">Commercial Interior</a>
                    </li>
                    <li className="nav-item tabstitle" role="presentation">
                        <a className="nav-link" id="ex3-tab-4" data-mdb-toggle="tab" href="#ex3-tabs-4" role="tab" aria-controls="ex3-tabs-4" aria-selected="false">Residential Exterior</a>
                    </li>
                    <li className="nav-item tabstitle" role="presentation">
                        <a className="nav-link" id="ex3-tab-5" data-mdb-toggle="tab" href="#ex3-tabs-5" role="tab" aria-controls="ex3-tabs-5" aria-selected="false">Residential Interior</a>
                    </li>
                </ul>
                {/* Tabs navs */}
                {/* Tabs content */}
                <div className="tab-content" id="ex2-content">
                    <div className="tab-pane fade show active" id="ex3-tabs-1" role="tabpanel" aria-labelledby="ex3-tab-1">

                        <div>
                            <ul className="portfolio">
                                {props.projects_data.map((v, i) => {
                                    return <li key={i}>
                                        <ProjectsList
                                            index={i}
                                            ImageURL={v.ImageURLArray[0]}
                                            title={v.Title}
                                            category={v.Category}
                                        />
                                    </li>
                                })}
                            </ul>
                        </div>
                        {/* Ye */}
                    </div>
                    <div className="tab-pane fade" id="ex3-tabs-2" role="tabpanel" aria-labelledby="ex3-tab-2">
                        <div>
                            <ul className="portfolio">
                                {props.projects_data.map((v, i) => {
                                    return <li key={i}>
                                        <figure>
                                            {(v.Category == "Commercial Exterior") ? (
                                                <ProjectsList
                                                    index={i}
                                                    ImageURL={v.ImageURLArray[0]}
                                                    title={v.Title}
                                                    category={v.Category}
                                                />
                                            ) : (
                                                <div>
                                                    <span></span>
                                                </div>
                                            )}
                                        </figure>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="ex3-tabs-3" role="tabpanel" aria-labelledby="ex3-tab-3">
                        <div>
                            <ul className="portfolio">
                                {props.projects_data.map((v, i) => {
                                    return <li key={i}>
                                        <figure>
                                            {(v.Category == "Commercial Interior") ? (
                                               <ProjectsList
                                               index={i}
                                               ImageURL={v.ImageURLArray[0]}
                                               title={v.Title}
                                               category={v.Category}
                                           />
                                            ) : (
                                                <div>
                                                    <span></span>
                                                </div>
                                            )}
                                        </figure>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="ex3-tabs-4" role="tabpanel" aria-labelledby="ex3-tab-4">
                        <div>
                            <ul className="portfolio">
                                {props.projects_data.map((v, i) => {
                                    return <li key={i}>
                                        <figure>
                                            {(v.Category == "Residential Exterior") ? (
                                               <ProjectsList
                                               index={i}
                                               ImageURL={v.ImageURLArray[0]}
                                               title={v.Title}
                                               category={v.Category}
                                           />
                                            ) : (
                                                <div>
                                                    <span></span>
                                                </div>
                                            )}
                                        </figure>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="ex3-tabs-5" role="tabpanel" aria-labelledby="ex3-tab-5">
                        <div>
                            <ul className="portfolio">
                                {props.projects_data.map((v, i) => {
                                    return <li key={i}>
                                        <figure>
                                            {(v.Category == "Residential Interior") ? (
                                                <ProjectsList
                                                index={i}
                                                ImageURL={v.ImageURLArray[0]}
                                                title={v.Title}
                                                category={v.Category}
                                            />
                                            ) : (
                                                <div>
                                                    <span></span>
                                                </div>
                                            )}
                                        </figure>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Tabs content */}
            </div>

            <br />
            <br />
            <Footer />
            {/* Projects section */}
        </div >
    )
}
const mapStateToProps = (state) => ({
    SET_KEY: state.app.SET_KEY,
    projects_data: state.app.GET_PROJECTS_DATA
})
const mapDispatchToProp = (dispatch) => ({
    get_all_projects_data: () => dispatch(get_all_projects_data()),
})
export default connect(mapStateToProps, mapDispatchToProp)(Projects);