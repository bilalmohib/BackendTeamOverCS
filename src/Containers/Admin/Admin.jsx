import React, { useState, useEffect } from 'react';
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Loader from "../../Components/Loader";

import DatePicker from 'react-date-picker';

import logo from "../../assets/logo copy.png"

import { Link, useHistory } from "react-router-dom"
import '../../css/Admin.css';

import firebase from "../../firebase/index";
import 'firebase/firestore';
import { storage } from '../../firebase/index';

import { MDBProgress } from 'mdbreact';

import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

const currentDate = new Date();

class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            status: null,
            // Here the important attributes start
            title: "",
            category: "",
            disc: "",
            architects: "",
            area: 0,
            completionDate: currentDate,
            manufacturers: "",
            StructuralEngineers: "",
            LandscapeAchitects: "",
            ProjectArchitects: "",
            City: "",
            Country: "",
            GoogleMapLink: "",
            // Here the important attributes start
            ImageURLArray: [],
            progress: 0,
            filesArray: [],
            ///////////////////////////////////Here the Blog states start/////////////////////////////////////////////////
            // For The BLOG Description
            TempHeadingsBlog: "",
            // For The BLOG Description
            BlogTitle: "",
            BlogCategory: "",
            BlogDescription: `<h1>This is a heading</h1> <p>This is a paragraph</p>`,
            //For images
            BlogFrontImageURL: "",
            BlogFrontImage: null,
            FrontParaBlog: "",
            BlogFrontImageProgress: 0,
            BlogAuthor: "",
            BlogHashTags: "",
            BlogHashTagsArray: ["#architects", "#bestHouses"],
            showInsertParagraphModal: false,
            showInsertHeadingModal: false,
            showInsertImageModal: false,
            //Blog Inside Image
            TempBlogImageURL: "",
            TempBlogImageALT: "",
            BlogTempImageProgress: 0,
            TempBlogImageTitle: "",
            //Signed In user data
            signedInUserData: null,
            blogloader: false,
            projectloader: false
            //Blog Inside Image
            //For images
            ///////////////////////////////////Here the Blog states start/////////////////////////////////////////////////
        };
        this.globalImageURLArray = [];
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    status: true,
                    signedInUserData: user
                })
                // setStatus(true);
            }
            else {
                // setStatus(false)
                this.setState({
                    status: false,
                    signedInUserData: null
                })
            }
        })

    }

    componentDidUpdate = () => {
        console.log("List of Hashtag Blogs is here ==>", this.state.BlogHashTagsArray);
    }

    setProjectCategoryFunction = (e) => {
        let selectCategory = e.target.value
        alert(`${selectCategory} is the Category you selected`);
        // setCategory(selectCategory);
        this.setState({
            category: selectCategory
        })
    }

    setBlogCategoryFunction = (e) => {
        let selectCategory = e.target.value
        alert(`${selectCategory} is the Category you selected`);
        // setCategory(selectCategory);
        this.setState({
            BlogCategory: selectCategory
        })
    }


    handleUpload = (e) => {
        if (true) {
            const file = Array.from(e.target.files);
            console.log("files==>", file);
            // setfilesArray(file);
            var progress = 0;
            file.forEach((file) => {
                const uploadTask = storage.ref(`ProjectImages/${file.name}`).put(file);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // progrss function ....
                        progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                        console.log(progress)
                    },
                    (error) => {
                        // error function ....
                        alert(error);
                    },
                    () => {
                        // complete function ....
                        storage.ref('ProjectImages').child(file.name).getDownloadURL().then(url => {
                            // setImageURL(url);
                            //console.log("UUUU==>",url);
                            this.globalImageURLArray.push(url);
                            this.setState({
                                progress: progress,
                                ImageURLArray: this.globalImageURLArray
                            })
                        })
                    });

            });
            console.log("Global Image Array==>", this.globalImageURLArray);
        }
    }

    handleUploadBlogFrontImage = (e) => {
        if (e.target.files[0]) {
            const img = e.target.files[0];

            if (img != null) {
                const uploadTask = storage.ref(`BlogCoverImage/${img.name}`).put(img);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // progrss function ....
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        this.setState({
                            BlogFrontImageProgress: progress
                        })
                    },
                    (error) => {
                        // error function ....
                        console.log(error);
                    },
                    () => {
                        // complete function ....
                        storage.ref('BlogCoverImage').child(img.name).getDownloadURL().then(url => {
                            this.setState({
                                BlogFrontImageURL: url
                            })
                        })
                        alert("Image is ready to upload");
                    });

            }
            else {
                console.log("Please select an Image to upload");
            }
        }
        else {
            console.log("Please select a file to upload");
        }
    }

    handleTempImageUpload = (e) => {
        if (e.target.files[0]) {
            const img = e.target.files[0];

            if (img != null) {
                const uploadTask = storage.ref(`BlogImage/${img.name}`).put(img);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // progrss function ....
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        this.setState({
                            BlogTempImageProgress: progress
                        })
                    },
                    (error) => {
                        // error function ....
                        console.log(error);
                    },
                    () => {
                        // complete function ....
                        storage.ref('BlogImage').child(img.name).getDownloadURL().then(url => {
                            this.setState({
                                TempBlogImageURL: url
                            })
                        })
                        alert("Image is ready to upload");
                    });

            }
            else {
                console.log("Please select an Image to upload");
            }
        }
        else {
            console.log("Please select a file to upload");
        }
    }

    sendDataProject = () => {
        this.setState({
            projectloader: true
        })

        ////////////////////////////To take the current date and time//////////////////////////////////
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        dateTime = dateTime.toString();
        // console.log("Completetion Date=>",this.state.completionDate)
        ////////////////////////////To take the current date and time//////////////////////////////////

        let cd = this.state.completionDate;

        let completionDate = cd.getFullYear() + '-' + (cd.getMonth() + 1) + '-' + cd.getDate();

        completionDate = completionDate.toString();

        let key = firebase.database().ref('Projects/').push().key;

        let Data = {
            Title: this.state.title,
            Category: this.state.category,
            Description: this.state.disc,
            ImageURLArray: this.state.ImageURLArray,
            Architects: this.state.architects,
            Area: this.state.area,
            CompletionDate: completionDate,
            Manufacturers: this.state.manufacturers,
            StructuralEngineers: this.state.StructuralEngineers,
            LandscapeAchitects: this.state.LandscapeAchitects,
            ProjectArchitects: this.state.ProjectArchitects,
            City: this.state.City,
            Country: this.state.Country,
            GoogleMapLink: this.state.GoogleMapLink,
            Key: key,
            timeSubmitted: dateTime
        }


        firebase.database().ref(`Projects/`).push(Data)
            .then(alert("Your Project is Submitted Successfully."))

        this.setState({
            // Here the important attributes start
            title: "",
            category: "",
            disc: "",
            architects: "",
            area: 0,
            completionDate: new Date(),
            manufacturers: "",
            StructuralEngineers: "",
            LandscapeAchitects: "",
            ProjectArchitects: "",
            City: "",
            Country: "",
            GoogleMapLink: "",
            // Here the important attributes start
            ImageURLArray: [],
            progress: 0,
            filesArray: [],
            projectloader: false
        })

        this.globalImageURLArray = [];

    }

    enableTheBlog = () => {
        this.setState({
            blogloader: true
        })
    }

    sendDataBlog = () => {
        if (this.state.status != null) {
            // this.setState({
            //     blogloader: true
            // })
            // this.enableTheBlog();
            ////////////////////////////To take the current date and time//////////////////////////////////
            let today = new Date();
            let date = (today.getMonth() + 1) + today.getDate() + ',' + today.getFullYear();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date + ' ' + time;
            dateTime = dateTime.toString();
            ////////////////////////////To take the current date and time//////////////////////////////////

            //Initializing the database varaible db
            const db = firebase.firestore();
            // Initializing the ref for blog submission to database
            const blogDbReference = db.collection(`Blogs/`);

            //The object format in which data will be stored
            let BlogDataObject = {
                uid: this.state.signedInUserData.uid,
                userEmail: this.state.signedInUserData.email,
                BlogTitle: this.state.BlogTitle,
                BlogCategory: this.state.BlogCategory,
                BlogDescription: this.state.BlogDescription,
                BlogCoverImageUrl: this.state.BlogFrontImageURL,
                BlogCoverPara: this.state.FrontParaBlog,
                BlogAuthor: this.state.BlogAuthor,
                BlogSubmissionDate: dateTime,
                BlogHashTagsArray: this.state.BlogHashTagsArray
            }

            blogDbReference.add(BlogDataObject).then(() => {
                //Here when the data is sent successfully this function will be triggered
                console.log("Data sent");
                //Alert the user that blog is submitted
                alert("Congratulations!.Your Blog is Submitted Successfully.");
                //Clear the states
                this.setState({
                    // Here the attributes start for the blog
                    blogloader: false,
                    BlogTitle: "",
                    BlogCategory: "",
                    BlogDescription: "",
                    BlogFrontImageURL: "",
                    FrontParaBlog: "",
                    BlogAuthor: "",
                    BlogHashTagsArray: [],
                    BlogFrontImageProgress: 0
                })
            })

        } else {
            alert("Please sign in to submit the blog.");
        }
    }

    login = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                // Signed in
                let user = userCredential.user;
                // console.log("The user is logged in and data is: " + user);
                alert("Logged in successfully")
                this.setState({
                    status: true
                })

            })
            .catch((error) => {
                // var errorCode = error.code;
                let errorMessage = error.message;
                console.log(errorMessage);
                alert(errorMessage)
            });
    }

    sign_out = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            alert("Signed Out Successfully");

            this.setState({
                status: false
            })

        }).catch((error) => {
            // An error happened.
            console.log(error)
            alert(error);
        });

    }

    reset_password = () => {
        var auth = firebase.auth();
        var emailAddress = "bilalmohib7896@gmail.com";
        auth.sendPasswordResetEmail(emailAddress).then(function () {
            // alert(`A password reset email has been sent to ${ emailAddress }.`)
        }).catch(function (error) {
            // An error happened.
            alert(error)
            // return;
        });
        alert(`A password reset email has been sent to ${emailAddress}.`)
    }

    render() {
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
                        <i className="fas fa-angle-right text-gray ml-3 mr-2"></i> <Link to="/admin">Admin</Link>
                    </div>
                    <h1 className="projectTitlepd">Admin Panel</h1>
                </div>

                {(firebase.auth().currentUser == null) ? (
                    <div>
                        <h3 className="text-center text-danger">Logged out</h3>
                    </div>
                ) : (
                    <div className="container d-flex justify-content-between">
                        <h3 className="text-success mt-2">Logged in</h3>
                        <button className="btn btn-danger" onClick={this.sign_out}>Sign Out</button>
                    </div>
                )}

                {(this.state.status) ? (
                    <div>
                        <div className="container">

                            <div>
                                {/* Tabs navs */}
                                <ul className="nav nav-tabs nav-fill mb-3 mt-2" style={{ marginLeft: "-0.5%" }} id="ex1" role="tablist">
                                    <li className="nav-item tabad" role="presentation">
                                        <a className="nav-link active tabadminLink" data-mdb-toggle="tab" href="#ex2-tabs-1" role="tab" aria-controls="ex2-tabs-1" aria-selected="true">ALL PROJECTS</a>
                                    </li>
                                    <li className="nav-item tabad" role="presentation">
                                        <a className="nav-link tabadminLink" id="ex2-tabadmin-2" data-mdb-toggle="tab" href="#ex2-tabs-2" role="tab" aria-controls="ex2-tabs-2" aria-selected="false">ALL BLOGS</a>
                                    </li>
                                    {/* <li className="nav-item tabad" role="presentation">
                                        <a className="nav-link tabadminLink" data-mdb-toggle="tab" href="#ex2-tabs-3" role="tab" aria-controls="ex2-tabs-3" aria-selected="false">Another link</a>
                                    </li> */}
                                </ul>
                                {/* Tabs navs */}
                                {/* Tabs content */}
                                <div className="tab-content" id="ex2-content">
                                    <div className="tab-pane fade show active" id="ex2-tabs-1" role="tabpanel" aria-labelledby="ex2-tab-1">
                                        <div className="container border">
                                            <button type="button" className="btn btn-primary btn-rounded btnAddNewProject mt-3">Add New Project</button>
                                            <br /><br />
                                            {(this.state.projectloader == false) ? (
                                                <div>
                                                    <div className="container admin-container">
                                                        {/* Here the game starts */}
                                                        <div>
                                                            <h1 className="text-inverse mt-3">Upload a Project : -</h1>
                                                            <br />

                                                            <div>
                                                                <h3>Enter the Title of the project : <span className="text-red">*</span></h3>
                                                                <input type="text" placeholder="Enter the title for the blog" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <h3>Select A Category <span className="text-red">*</span></h3>

                                                            <div className="input-group input-group-md category_select">

                                                                <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>

                                                                <select style={{ fontSize: "15px", width: "200px" }} value={this.state.category}
                                                                    onChange={(e) => this.setProjectCategoryFunction(e)} className="form-control">
                                                                    <option value="Commercial Exterior">Commercial Exterior</option>
                                                                    <option value="Commercial Interior">Commercial Interior</option>
                                                                    <option value="Residential Exterior">Residential Exterior</option>
                                                                    <option value="Residential Interior">Residential Interior</option>
                                                                </select>
                                                            </div>
                                                            <br />




                                                            <h3>Enter the description of the project. <span className="text-red">*</span></h3>

                                                            <textarea name="" cols="70" rows="10" className="form-control paraAdmin" placeholder="For Example, A 5 marla hourse created by architects of Team over cs Pakistan." value={this.state.disc} onChange={(e) => this.setState({ disc: e.target.value })}></textarea>



                                                            {/* Here the uploaded image will be here */}
                                                            <div>
                                                                <br />
                                                                <h3>Upload Images for the project : <span className="text-red">*</span></h3>
                                                                <MDBProgress value={this.state.progress} className="my-2" height="20px" />
                                                                <label htmlFor="">Upload As many images as you want for project</label>
                                                                <input type="file" className="form-control" multiple onChange={(e) => this.handleUpload(e)} />
                                                                {/* <button className="btn btn-primary uploadBtn mt-3" onClick={(e) => this.testUpload(e)}>Upload</button> */}
                                                                <br />
                                                                <br />
                                                                <h4 className="ColorBloGText border">{this.state.disc}</h4>
                                                                <div className="border">
                                                                    {(false) ? (
                                                                        <div className="text-center">
                                                                            <div className="loader"></div>
                                                                        </div>
                                                                    ) : (
                                                                        <div>

                                                                            {this.state.ImageURLArray.map((v, i) => {
                                                                                return <li key={i} style={{ display: "inline-block", listStyle: "none" }}>
                                                                                    <div>
                                                                                        {/* Here the loop div is here */}
                                                                                        <img width={250} height={250} className="border ml-2 mt-2" src={v} alt={i} />
                                                                                        {/* Here the loop div is here */}
                                                                                    </div>

                                                                                </li>
                                                                            })}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {/* Here the uploaded image will be here */}

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Architects of the project : <span className="text-red">*</span></h3>
                                                                <input type="text" placeholder="Eg: Philip Stejskal Architecture,Ali Imran etc" value={this.state.architects} onChange={(e) => this.setState({ architects: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Area of the project(m<sup>2</sup>) : <span className="text-red">*</span></h3>
                                                                <input type="number" placeholder="Eg:  200 etc" value={this.state.area} onChange={(e) => this.setState({ area: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Select the date of completion of Project : <span className="text-red">*</span></h3>
                                                                <DatePicker
                                                                    onChange={(val) => this.setState({
                                                                        completionDate: val
                                                                    })}
                                                                    value={this.state.completionDate}
                                                                />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Manufacturers of the project : <span className="text-red">*</span></h3>
                                                                <input type="text" placeholder="Eg: Midland Brick,Barestone, CSR Gyprock, Fielders Prominence etc" value={this.state.manufacturers} onChange={(e) => this.setState({ manufacturers: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Structural Engineers of the project : <span className="text-red">*</span></h3>
                                                                <input type="text" placeholder="Eg: Andreotta Cardenosa Consulting Engineers etc" value={this.state.StructuralEngineers} onChange={(e) => this.setState({ StructuralEngineers: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Landscape Architects of the project : <span className="text-red">*</span></h3>
                                                                <input type="text" placeholder="Eg: Annghi Tran Landscape Architecture Studio etc" value={this.state.LandscapeAchitects} onChange={(e) => this.setState({ LandscapeAchitects: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Project Architects of the project : <span className="text-red">*</span></h3>
                                                                <input type="text" placeholder="Eg: Louise Allen, Julia Kiefer, Jaime Mayger, Philip Stejskal etc" value={this.state.ProjectArchitects} onChange={(e) => this.setState({ ProjectArchitects: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the City where the project is located : <span className="text-red">*</span></h3>
                                                                <input type="text" placeholder="Eg: Louise Allen, Julia Kiefer, Jaime Mayger, Philip Stejskal etc" value={this.state.City} onChange={(e) => this.setState({ City: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Country where the project is located : <span className="text-red">*</span></h3>
                                                                <input type="text" placeholder="Eg: Louise Allen, Julia Kiefer, Jaime Mayger, Philip Stejskal etc" value={this.state.Country} onChange={(e) => this.setState({ Country: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Google Map Link where the project is located : <span className="text-red">*</span></h3>
                                                                <input type="text" placeholder="Eg: https://www.google.com/maps?ll=31.476852,74.449119&z=16&t=m&hl=en&gl=US&mapclient=embed&cid=17223166234116770493 etc" value={this.state.GoogleMapLink} onChange={(e) => this.setState({ GoogleMapLink: e.target.value })} className="form-control title" aria-label="..." />
                                                                <br />
                                                                <iframe title='Map' id="mapAdmin" src={this.state.GoogleMapLink} allowFullScreen loading="lazy" />
                                                            </div>

                                                            {(this.state.title === "" || this.state.category === "" || this.state.disc === "" || this.state.architects == "" || this.state.area == 0 || this.state.manufacturers == "" || this.state.StructuralEngineers == "" || this.state.LandscapeAchitects == "" || this.state.ProjectArchitects == "" || this.state.City == "" || this.state.Country == "" || this.state.GoogleMapLink == "" || this.state.ImageURLArray.length == 0) ? (
                                                                <div>
                                                                    <h4 className="text-red">Please fill all the fields indicated as necessary with * sign to submit</h4>
                                                                    <button disabled={true} className="btn btn-success btn-block">Submit</button>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <h4 className="mt-2">You are ready to post the Project.</h4>
                                                                    <button className="btn btn-success btn-block" onClick={this.sendDataProject}>Submit</button>
                                                                </div>
                                                            )}
                                                            <br />
                                                            <div className="text-center">
                                                                <h3 style={{ fontWeight: "lighter" }}>You are successfully logged in</h3>
                                                                <button className="btn btn-danger" onClick={this.sign_out}>Sign Out</button>
                                                                <br />
                                                            </div>
                                                            <br />

                                                        </div>
                                                        <br />
                                                    </div>
                                                    {/* Here the game starts */}
                                                </div>
                                            ) : (
                                                <div>
                                                    <Loader text={"Please wait sending the data to the database......"} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="ex2-tabs-2" role="tabpanel" aria-labelledby="ex2-tab-2">
                                        <div className="container border">
                                            <button type="button" className="btn btn-warning btn-rounded btnAddNewProject mt-3">Add New Blog</button>
                                            <br /><br />
                                            {(this.state.blogloader === false) ? (
                                                <div>
                                                    <div className="container admin-container">
                                                        {/* Here the game starts */}
                                                        <div>
                                                            <h1 className="text-inverse mt-3">Upload a Blog : -</h1>
                                                            <br />

                                                            <div>
                                                                <h3>Enter the Title of the Blog : <span className="text-red">*</span></h3>
                                                                <input type="text" placeholder="Enter the title for the blog" value={this.state.BlogTitle} onChange={(e) => this.setState({ BlogTitle: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <h3>Select A Category <span className="text-red">*</span></h3>

                                                            <div className="input-group input-group-md category_select">

                                                                <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>

                                                                <select style={{ fontSize: "15px", width: "200px" }} value={this.state.BlogCategory}
                                                                    onChange={(e) => this.setBlogCategoryFunction(e)} className="form-control">
                                                                    <option value="3D">3D</option>
                                                                    <option value="Architect">Architect</option>
                                                                    <option value="Construction">Construction</option>
                                                                    <option value="Design">Design</option>
                                                                    <option value="Home Decoration">Home Decoration</option>
                                                                    <option value="Interior">Interior</option>
                                                                    <option value="Landscape">Landscape</option>
                                                                </select>
                                                            </div>
                                                            <br />

                                                            <h3>Write the Blog. <span className="text-red">*</span></h3>

                                                            {/* Modal */}
                                                            <div className="modal fade" id="exampleModal" tabIndex={1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                {(this.state.showInsertHeadingModal) ? (
                                                                    <div className="modal-dialog">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title" id="exampleModalLabel">INSERT HEADING</h5>
                                                                                <button type="button" className="btn-close" data-mdb-dismiss="modal" onClick={() => this.setState({ showInsertHeadingModal: false })} aria-label="Close" />
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <input type="text" placeholder="Heading eg:A project for falan falan" value={this.state.TempHeadingsBlog} onChange={(e) => this.setState({ TempHeadingsBlog: e.target.value })} className="form-control title" aria-label="..." />
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-secondary" onClick={() => this.setState({ showInsertHeadingModal: false })} data-mdb-dismiss="modal">
                                                                                    Close
                                                                                </button>
                                                                                <button type="button" onClick={() => this.setState({
                                                                                    BlogDescription: this.state.BlogDescription + `<h1 className="text-dark text-bold">${this.state.TempHeadingsBlog}</h1>`,
                                                                                    TempHeadingsBlog: "",
                                                                                    showInsertHeadingModal: false
                                                                                })}
                                                                                    data-mdb-dismiss="modal"
                                                                                    aria-label="Insert"
                                                                                    className="btn btn-primary"
                                                                                >Insert
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="modal-dialog">
                                                                        <div>Error</div>
                                                                    </div>
                                                                )}

                                                                {(this.state.showInsertParagraphModal) ? (
                                                                    <div className="modal-dialog">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title" id="exampleModalLabel">INSERT PARAGRAPH</h5>
                                                                                <button type="button" className="btn-close" onClick={() => this.setState({ showInsertParagraphModal: false })} data-mdb-dismiss="modal" aria-label="Close" />
                                                                            </div>
                                                                            <div className="modal-body">

                                                                                {/*Textarea with icon prefix*/}
                                                                                <div className="md-form">
                                                                                    <i className="fas fa-pencil-alt prefix" />
                                                                                    <textarea id="form10" value={this.state.TempHeadingsBlog} placeholder="Start writing the paragraph" onChange={(e) => this.setState({ TempHeadingsBlog: e.target.value })} className="md-textarea form-control" rows={3} />
                                                                                    <label htmlFor="form10"></label>
                                                                                </div>

                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" onClick={() => this.setState({ showInsertParagraphModal: false })} className="btn btn-secondary" data-mdb-dismiss="modal">
                                                                                    Close
                                                                                </button>
                                                                                <button type="button" onClick={() => this.setState({
                                                                                    BlogDescription: this.state.BlogDescription + `<p className="text-dark">${this.state.TempHeadingsBlog}</p>`,
                                                                                    TempHeadingsBlog: "",
                                                                                    showInsertParagraphModal: false
                                                                                })}
                                                                                    data-mdb-dismiss="modal"
                                                                                    aria-label="Insert"
                                                                                    className="btn btn-primary"
                                                                                >Insert
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div>Error</div>
                                                                )}


                                                                {(this.state.showInsertImageModal) ? (
                                                                    <div className="modal-dialog">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title" id="exampleModalLabel">INSERT IMAGE <span className="text-red">*</span><i className="fas fa-image mt-2 ml-2 text-primary fa-lg"></i></h5>
                                                                                <button type="button" className="btn-close" onClick={() => this.setState({ showInsertImageModal: false })} data-mdb-dismiss="modal" aria-label="Close" />
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <ol>
                                                                                    <li>

                                                                                        <h4>Enter an Image URL</h4>
                                                                                        <input type="text" style={{ fontSize: "18px" }} placeholder="Enter the Image URL" value={this.state.TempBlogImageURL} onChange={(e) => this.setState({ TempBlogImageURL: e.target.value })} className="form-control title" aria-label="..." />
                                                                                        <br />
                                                                                        <h5 className="text-center">OR <i className="fas fa-info-circle"></i></h5>
                                                                                        <br />
                                                                                    </li>
                                                                                    <li>
                                                                                        <h3>Upload Image from your Device: </h3>
                                                                                        <MDBProgress value={this.state.BlogTempImageProgress} className="my-2" height="20px" />
                                                                                        <label htmlFor="">Upload Image for blog</label>
                                                                                        <input type="file" className="form-control" onChange={(e) => this.handleTempImageUpload(e)} />
                                                                                        <br />
                                                                                    </li>
                                                                                    <li>
                                                                                        <h4>Enter an Image Alternative Text (Optional) but Recommended</h4>
                                                                                        <input type="text" style={{ fontSize: "18px" }} placeholder="Enter the Image Alternative Text" value={this.state.TempBlogImageALT} onChange={(e) => this.setState({ TempBlogImageALT: e.target.value })} className="form-control title" aria-label="..." />
                                                                                        <br />
                                                                                    </li>
                                                                                    <li>
                                                                                        <h4>Enter an Image Title (Optional) but Recommended</h4>
                                                                                        <input type="text" style={{ fontSize: "18px" }} placeholder="Enter the Image Alternative Text" value={this.state.TempBlogImageTitle} onChange={(e) => this.setState({ TempBlogImageTitle: e.target.value })} className="form-control title" aria-label="..." />
                                                                                    </li>
                                                                                </ol>
                                                                                <br />
                                                                                <img className="border img-fluid" src={this.state.TempBlogImageURL} title={this.state.TempBlogImageTitle} alt={this.state.TempBlogImageALT} />
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" onClick={() => this.setState({ showInsertImageModal: false })} className="btn btn-secondary" data-mdb-dismiss="modal">
                                                                                    Close
                                                                                </button>
                                                                                {(this.state.TempBlogImageURL === "") ? (
                                                                                    <button type="button"
                                                                                        disabled={true}
                                                                                        className="btn btn-primary"
                                                                                    >Insert
                                                                                    </button>
                                                                                ) : (
                                                                                    <button type="button" onClick={() => this.setState({
                                                                                        BlogDescription: this.state.BlogDescription + `<img className="img-fluid" src="${this.state.TempBlogImageURL}" alt="${this.state.TempBlogImageALT}" title="${this.state.TempBlogImageTitle}" /> <br />`,
                                                                                        TempHeadingsBlog: "",
                                                                                        showInsertImageModal: false,
                                                                                        TempBlogImageURL: "",
                                                                                        TempBlogImageTitle: "",
                                                                                        TempBlogImageALT: "",
                                                                                        BlogTempImageProgress: 0
                                                                                    })}
                                                                                        data-mdb-dismiss="modal"
                                                                                        aria-label="Insert"
                                                                                        className="btn btn-primary"
                                                                                    >Insert
                                                                                    </button>
                                                                                )}


                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div>Error</div>
                                                                )}

                                                            </div>
                                                            {/* Modal */}

                                                            {/* Here all the formatting will be done */}

                                                            <div className="border buttonsBlockBlogFormatting">
                                                                <button
                                                                    data-mdb-toggle="modal"
                                                                    data-mdb-target="#exampleModal"
                                                                    className="btn btn-primary"
                                                                    onClick={() => this.setState({
                                                                        showInsertHeadingModal: true
                                                                    })}
                                                                >Insert Heading
                                                                </button>

                                                                <button
                                                                    className="btn btn-danger"
                                                                    onClick={() => this.setState({
                                                                        BlogDescription: this.state.BlogDescription + `<br />`
                                                                    })}
                                                                >Line Break</button>

                                                                <button
                                                                    className="btn btn-warning"
                                                                    data-mdb-toggle="modal"
                                                                    data-mdb-target="#exampleModal"
                                                                    onClick={() => this.setState({
                                                                        showInsertParagraphModal: true
                                                                    })}
                                                                >Insert Paragraph</button>

                                                                <button
                                                                    className="btn btn-info"
                                                                    data-mdb-toggle="modal"
                                                                    data-mdb-target="#exampleModal"
                                                                    onClick={() => this.setState({
                                                                        showInsertImageModal: true
                                                                    })}
                                                                >Insert Image</button>

                                                                <button
                                                                    className='btn btn-danger'
                                                                    onClick={() => {
                                                                        this.setState({
                                                                            BlogDescription: ""
                                                                        })
                                                                        alert("Content Removed Successfully.")
                                                                    }

                                                                    }

                                                                    title="Will Remove All the written Code"
                                                                >
                                                                    Remove All (X)
                                                                </button>

                                                            </div>

                                                            {/* Here all the formatting will be done */}

                                                            <br />

                                                            <textarea name="" cols="70" rows="10" className="form-control paraAdmin" placeholder="Write the Blog Include Images,Videos,etc" value={this.state.BlogDescription} onChange={(e) => this.setState({ BlogDescription: e.target.value })}></textarea>

                                                            <div className="container border mt-2 mb-2" dangerouslySetInnerHTML={{ __html: this.state.BlogDescription }} />

                                                            {/* Here the uploaded image will be here */}
                                                            <div>
                                                                <br />
                                                                <h3>Upload the front Image for the Blog : <span className="text-red">*</span></h3>
                                                                <MDBProgress value={this.state.BlogFrontImageProgress} className="my-2" height="20px" />
                                                                <label htmlFor="">Upload A Image that will appear of the front of the Blog</label>
                                                                <input type="file" className="form-control" onChange={(e) => this.handleUploadBlogFrontImage(e)} />
                                                                {/* <button className="btn btn-primary uploadBtn mt-3" onClick={(e) => this.testUpload(e)}>Upload</button> */}
                                                                <br />
                                                                <br />
                                                                <h4 className="ColorBloGText border">{this.state.disc}</h4>
                                                                <div className="border">
                                                                    {/* Here the loop div is here */}
                                                                    <img className="border img-fluid ml-2 mt-2" src={this.state.BlogFrontImageURL} alt="Front Image of The Blog" />
                                                                </div>
                                                            </div>
                                                            {/* Here the uploaded image will be here */}

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Cover Para of the Blog : <span className="text-red">*</span></h3>
                                                                <textarea name="" cols="70" rows="10" className="form-control paraAdmin" placeholder="Write the Cover paragraph for the Blog" value={this.state.FrontParaBlog} onChange={(e) => this.setState({ FrontParaBlog: e.target.value })}></textarea>
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Author of the Blog : <span className="text-red">*</span></h3>
                                                                <input type="text" placeholder="Eg: Philip Stejskal Architecture,Ali Imran etc" value={this.state.BlogAuthor} onChange={(e) => this.setState({ BlogAuthor: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Hashtags of the Blog : <span className="text-red">*</span></h3>
                                                                <input type="text" placeholder="Eg: //#endregion etc" value={this.state.BlogHashTags} onChange={(e) => this.setState({ BlogHashTags: e.target.value })} className="form-control title" aria-label="..." />
                                                                <button className="btn btn-primary mt-3 mb-3" onClick={() => this.setState({
                                                                    BlogHashTagsArray: [...this.state.BlogHashTagsArray, this.state.BlogHashTags],
                                                                    BlogHashTags: ""
                                                                })}>Insert</button>

                                                                <br />


                                                                {this.state.BlogHashTagsArray.map((v, i) => {
                                                                    return <li key={i} style={{ display: "inline-block", listStyle: "none" }}>
                                                                        <div>
                                                                            {/* Here the loop div is here */}
                                                                            <a href={`blog/${v}`} className="border ml-2 mt-2 hastagsBlog">{v}</a>
                                                                            {/* Here the loop div is here */}
                                                                        </div>

                                                                    </li>
                                                                })}

                                                                <h4 className="border mt-2" dangerouslySetInnerHTML={{ __html: this.state.BlogHashTags }} />
                                                            </div>

                                                            <br />

                                                            {(this.state.BlogTitle == "" || this.state.BlogCategory == "" || this.state.BlogDescription == "" || this.state.BlogFrontImageURL == "" || this.state.BlogAuthor == "" || this.state.FrontParaBlog == "" || this.state.BlogHashTagsArray.length <= 2) ? (
                                                                <div>
                                                                    <h4 className="text-red">Please fill all the fields indicated as necessary with * sign to submit</h4>
                                                                    <button disabled={true} className="btn btn-success btn-block">Submit</button>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <h4 className="mt-2">You are ready to post the Blog.</h4>
                                                                    <button className="btn btn-success btn-block" onClick={this.sendDataBlog}>Submit</button>
                                                                </div>
                                                            )}
                                                            <br />
                                                            <div className="text-center">
                                                                <h3 style={{ fontWeight: "lighter" }}>You are successfully logged in</h3>
                                                                <button className="btn btn-danger" onClick={this.sign_out}>Sign Out</button>
                                                                <br />
                                                            </div>
                                                            <br />

                                                        </div>
                                                        <br />
                                                    </div>
                                                    {/* Here the game starts */}
                                                </div>
                                            ) : (
                                                <div>
                                                    <Loader text={"Please wait sending the data to the database......"} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* <div className="tab-pane fade" id="ex2-tabs-3" role="tabpanel" aria-labelledby="ex2-tab-3">
                            Tab 3 content
                        </div> */}
                                </div>
                                {/* Tabs content */}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div>
                            <div className="container text-center">
                                <img width="250px" src={logo} alt="Team Overc’s" />
                                <br /> <br />
                                {/* <label className="form-label">Email Address (required)</label> <br/> */}
                                <input type="email" name="email" placeholder="Email Address" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} className="form-control adminInput" />
                                <br />
                                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} className="form-control adminInput" />
                                <br />

                                <a href="" onClick={this.reset_password}>Forgot Password</a>
                                <br />
                                <button className="btn btn-primary btn-login" onClick={this.login}>Login</button>
                                <br />
                                <br />
                                <br />
                            </div>

                        </div>
                    </div>
                )
                }

                <br />
                <br />
                <Footer />
                {/* Projects section */}
            </div>
        )
    }
}

export default Admin;