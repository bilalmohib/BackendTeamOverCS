import React, { useState, useEffect } from 'react';
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import ProjectsList from "../../Components/ProjectsList";

import firebase from "../../firebase/index";

// importing images
// importing images

import { Link, useHistory } from "react-router-dom"
import '../../css/Blog.css';

const Blog = (props) => {


    // const history = useHistory();
    // const handleRowClick = (e) => {
    //     props.setCurrentKey(props.index)
    //     history.push(`/${e}`);
    //     // alert(e.target.innerText)
    // }

    // const [projectsData, setprojectsData] = useState([]);

    // const history = useHistory();
    // const handleRowClick = (e) => {
    //     history.push(`/${e}`);
    // }

    // useEffect(() => {
    //     let jobData = [];

    //     //Taking data from job vacancy form
    //     firebase.database().ref(`Projects/`).on('value', (snapshot) => {
    //         snapshot.forEach(function (data) {
    //             jobData.push(data.val())
    //             console.log(data.val())
    //         })

    //         console.log(jobData);

    //         setprojectsData(jobData);



    //     })
    // }, [])

    return (
        <div>
            <div className="container">
                <div className="fixed-top">
                    <Navbar transparent={true} />
                </div>
            </div>

            <div className="bgimg-1">
                <div className="caption">
                    <h1 className="TitleCarousal"><b>Blog</b></h1>
                    <div className="disc_top_width">
                        <h3 className="DiscCarousal">Home / Blogs</h3>
                    </div>
                </div>
            </div>

            {/* Blog section */}
            <div className="container">
                <div className="row">
                    <h2 className="latestPosts ml-0 mt-4 text-warning">Latest Posts</h2>

                </div>
                <div className="row">
                    <div className="col-md-8">
                        {(false) ? (
                            <div style={{ marginLeft: "40%" }}>
                                <div className="loader"></div>
                            </div>
                        ) : (
                            <div>
                                {/* {this.state.data.map((v, i) => {
                                    return <li key={i} style={{ listStyle: "none" }}>
                                        <div> */}
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <img src="http://www.ameradnan.com/wp-content/uploads/2021/05/bigstock-Beautiful-Upscale-Executive-Ho-4500385.jpg" alt="" className="img-blog" />
                                                </div>
                                                <div className="col-md-7">
                                                    <h1 id="blog_list_title">A Smooth Transition from Indoors to Outdoors Accommodate Many Outdoor Activities</h1>

                                                    <h4 className="ColorBloGText">Posted on 2021-3-14 10:28:25</h4>

                                                    <h4 className="ColorBloGText specialText">A social gathering moves easily from indoors to outdoors when a comfortable deck welcomes you into a lush, open-air living space. To get maximum enjoyment from this natural extension of indoor space, we help you to consider all elements of your yard, as well as your personal likes and dislikes. While restoration, we focus on special features: Gazebos, overhead arbors, vertical trellises, flower boxes, hot tubs and fences are special features that can be added and improve visual appeal and value to your outdoor living space. Even common deck elements, like steps, benches, and railings can be special features if they feature an unusual design.
                                                    </h4>

                                                    <h4 className="ColorBloGText">
                                                        <a style={{ fontWeight: "normal" }}>more</a>
                                                    </h4>
                                                </div>
                                            </div>
                                        {/* </div>
                                    </li>
                                })} */}
                            </div>
                        )}

                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control bSearch"
                            // onChange={(e) => this.handleSearch(e.target.value)}
                            placeholder="Search"
                            // onKeyDown={(e) => {
                            //     if (e.keyCode === 8) {
                            //         this.setState({
                            //             data: this.state.fullData
                            //         })
                            //     }
                            // }}
                        />
                        <br />
                        <h2>Categories</h2>
                        <ul>
                            <li><h5 onClick={() => this.props.setBlogCategory("EXTERIOR PAINTING")}><Link to="/category">EXTERIOR PAINTING</Link></h5></li>
                            <li><h5><Link onClick={() => this.props.setBlogCategory("DECK RESTORATION")} to="/category">DECK RESTORATION</Link></h5></li>
                            <li><h5><Link onClick={() => this.props.setBlogCategory("EXTERIOR CARPENTRY")} to="/category">EXTERIOR CARPENTRY</Link></h5></li>
                            <li><h5><Link onClick={() => this.props.setBlogCategory("POWER WASHING")} to="/category">POWER WASHING</Link></h5></li>
                        </ul>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <Footer />
            {/* Projects section */}
        </div >
    )
}

export default Blog;