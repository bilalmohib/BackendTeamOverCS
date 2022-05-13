import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import Footer from "../../Components/Footer";
import Loader from "../../Components/Loader";

import DatePicker from 'react-date-picker';

import logo from "../../assets/logo copy.png"

import "./style.css";

import firebase from "../../firebase/index";
import 'firebase/firestore';
import { storage } from '../../firebase/index';

import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBProgress } from 'mdbreact';
import AllProjects from '../../Components/Projects/AllProjects';

const currentDate = new Date();

class Projects extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            status: null,
            // Here the important attributes start
            title: "",
            projectClient: "",
            areaHeight: 0,
            areaWidth: 0,
            areaUnit: "",
            category: "",
            disc: "",
            architects: "",
            completionDate: currentDate,
            StructuralEngineers: "",
            projectSector: "",
            projectService: "",
            LandscapeArchitects: "",
            ProjectArchitects: "",
            builderArchitects: "",
            photographyPersons: "",
            interiorArchitects: "",
            projectSiteLocation: "",
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
        console.log("Title is : ", this.state.title)
        console.log("Project Sector is : ", this.state.projectSector);
        console.log("Project Service is : ", this.state.projectService);
        console.log("Project Client is : ", this.state.projectClient);
        console.log("Area Height is : ", this.state.areaHeight);
        console.log("Area Width is : ", this.state.areaWidth);
        console.log("Area Unit is : ", this.state.areaUnit);
        console.log("Description is : ", this.state.disc);
        console.log("Architects is : ", this.state.architects)
        console.log("Structural Engineers are : ", this.state.StructuralEngineers)
        console.log("Landscape Architects are : ", this.state.LandscapeArchitects)
        console.log("projectSiteLocation is : ", this.state.projectSiteLocation)
        console.log("Google Map Link is : ", this.state.GoogleMapLink)
        console.log("ImageURLArray is : ", this.state.ImageURLArray)
        console.log("ProjectArchitects is : ", this.state.ProjectArchitects)
        console.log("InteriorArchitects is : ", this.state.interiorArchitects)
        console.log("BuilderArchitects is : ", this.state.builderArchitects)
        console.log("PhotographyPersons is : ", this.state.photographyPersons)

    }

    setProjectCategoryFunction = (e) => {
        let selectCategory = e.target.value
        alert(`${selectCategory} is the Category you selected`);
        // setCategory(selectCategory);
        this.setState({
            category: selectCategory
        })
    }

    setProjectSectorFunction = (e) => {
        let selectSector = e.target.value
        alert(`${selectSector} is the Category you selected`);
        // setSector(selectSector);
        this.setState({
            projectSector: selectSector
        })
    }

    setProjectServiceFunction = (e) => {
        let selectService = e.target.value
        alert(`${selectService} is the Category you selected`);
        // setSector(selectService);
        this.setState({
            projectService: selectService
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

        // alert("Submitting your project.Please wait for atleast 5 seconds.......")

        //Initializing the database varaible db
        const db = firebase.firestore();
        // Initializing the ref for blog submission to database
        const projectsDbReference = db.collection(`Projects/`);

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

        let projectAreaCombined = (this.state.areaHeight).toString() + (this.state.areaWidth).toString() + (this.state.areaUnit).toString();

        let projectDataObject = {
            Title: this.state.title,
            Description: this.state.disc,
            ImageURLArray: this.state.ImageURLArray,
            Architects: this.state.architects,
            ProjectClient: this.state.projectClient,
            Area: projectAreaCombined,
            CompletionDate: completionDate,
            StructuralEngineers: this.state.StructuralEngineers,
            LandscapeArchitects: this.state.LandscapeArchitects,
            projectSiteLocation: this.state.projectSiteLocation,
            GoogleMapLink: this.state.GoogleMapLink,
            Key: key,
            timeSubmitted: dateTime,
            //New entities
            ProjectSector: this.state.projectSector,
            ProjectService: this.state.projectService,
            ArchitecturalTeam: this.state.ProjectArchitects,
            InteriorPersons: this.state.interiorArchitects,
            LandscapePersons: this.state.LandscapeArchitects,
            BuilderArchitects: this.state.builderArchitects,
            PhotographyPersons: this.state.photographyPersons
        }

        console.log("Project Data Object is ========> ", projectDataObject)

        projectsDbReference.add(projectDataObject).then(() => {
            //Here when the data is sent successfully this function will be triggered
            console.log("Project Data sent Successfully");
            //Alert the user that blog is submitted
            alert("Congratulations!.Your Project is Submitted Successfully.");
            //Clear the states
            this.setState({
                // Here the attributes start for the blog
                title: "",
                disc: "",
                ImageURLArray: [],
                architects: "",
                projectClient: "",
                areaHeight: 0,
                areaWidth: 0,
                progress: 0,
                areaUnit: "",
                completionDate: new Date(),
                StructuralEngineers: "",
                LandscapeArchitects: "",
                projectSiteLocation: "",
                GoogleMapLink: "",
                key: "",
                dateTime: "",
                //New entities
                projectSector: "",
                projectService: "",
                ProjectArchitects: "",
                interiorArchitects: "",
                LandscapeArchitects: "",
                builderArchitects: "",
                photographyPersons: ""
            })
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
            alert("Please wait submitting the blog data.");
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
                        <Header />
                    </div>
                </div>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                {/* MODAL */}
                <div className="modal fade" id="exampleModal" tabIndex={1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Project Submission</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="text-info">
                                    <h1>"Please wait for 5 seconds atleast.We are saving your project to cloud.Thanks!"</h1>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal">Acknowledged</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* MODAL */}

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
                                        <a className="nav-link active tabadminLink" data-mdb-toggle="tab" href="#ex2-tabs-1" role="tab" aria-controls="ex2-tabs-1" aria-selected="true">All Projects</a>
                                    </li>
                                    <li className="nav-item tabad" role="presentation">
                                        <a className="nav-link tabadminLink" id="ex2-tabadmin-2" data-mdb-toggle="tab" href="#ex2-tabs-2" role="tab" aria-controls="ex2-tabs-2" aria-selected="false">Add New Projects</a>
                                    </li>
                                </ul>
                                {/* Tabs navs */}
                                {/* Tabs content */}
                                <div className="tab-content" id="ex2-content">
                                    <div className="tab-pane fade show active" id="ex2-tabs-1" role="tabpanel" aria-labelledby="ex2-tab-1">
                                        <div className="container border">
                                            {(this.state.projectloader == false) ? (
                                                <div>
                                                    <div className="container admin-container">
                                                        {/* Here the game starts */}
                                                        <div>
                                                            <br />
                                                            <AllProjects />
                                                            <br />
                                                        </div>
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
                                            {(this.state.blogloader === false) ? (
                                                <div>
                                                    <div className="container admin-container">
                                                        {/* Here the game starts */}
                                                        {/* Here the game starts */}
                                                        <div>
                                                            <h1 className="text-inverse mt-3">Upload a Project : -</h1>
                                                            <br />

                                                            <div>
                                                                <h3>Enter the Title of the project : <span className="text-red">*</span></h3>
                                                                <input type="text" placeholder="Enter the title for the blog" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Client name  : <span className="text-red">*</span></h3>
                                                                <input type="text" placeholder="Enter the Project's Client name" value={this.state.projectClient} onChange={(e) => this.setState({ projectClient: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <h3>Select A Sector for the Project</h3>

                                                            <div className="input-group input-group-md category_select">

                                                                <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>

                                                                <select style={{ fontSize: "15px", width: "200px" }} value={this.state.projectSector}
                                                                    onChange={(e) => this.setProjectSectorFunction(e)} className="form-control">
                                                                    <option value="Residential">Residential</option>
                                                                    <option value="Commercial">Commercial</option>
                                                                    <option value="Public Building">Public Building</option>
                                                                    <option value="Farm House">Farm House</option>
                                                                </select>
                                                            </div>

                                                            <br />

                                                            <h3>Select A Service for the Project <span className="text-red">*</span></h3>

                                                            <div className="input-group input-group-md category_select">

                                                                <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>

                                                                <select style={{ fontSize: "15px", width: "200px" }} value={this.state.projectService}
                                                                    onChange={(e) => this.setProjectServiceFunction(e)} className="form-control">
                                                                    <option value="Architectural">Architectural</option>
                                                                    <option value="Interior">Interior</option>
                                                                    <option value="Furniture">Landscaping</option>
                                                                    <option value="Construction">Construction</option>
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
                                                                <h3>Enter the Architectural team for the project :</h3>
                                                                <input type="text" placeholder="Eg: Philip Stejskal Architecture,Ali Imran etc" value={this.state.architects} onChange={(e) => this.setState({ architects: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Interiors team for the project :</h3>
                                                                <input type="text" placeholder="Eg: Brian Brady etc" value={this.state.interiorArchitects} onChange={(e) => this.setState({ interiorArchitects: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Landscape Architects of the project : </h3>
                                                                <input type="text" placeholder="Eg: Annghi Tran Landscape Architecture Studio etc" value={this.state.LandscapeArchitects} onChange={(e) => this.setState({ LandscapeArchitects: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Builders of the project :</h3>
                                                                <input type="text" placeholder="Eg: Annghi Tran Landscape Architecture Studio etc" value={this.state.builderArchitects} onChange={(e) => this.setState({ builderArchitects: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Photography by :</h3>
                                                                <input type="text" placeholder="Eg: Joshua McHugh etc" value={this.state.photographyPersons} onChange={(e) => this.setState({ photographyPersons: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Area of the project(m<sup>2</sup>) : <span className="text-red">*</span></h3>
                                                                <div className="d-flex justify-content-evenly">
                                                                    <div className="d-flex justify-content-evenly">
                                                                        <div>
                                                                            <span>Height:</span> <input type="number" placeholder="Eg:  2000m" value={this.state.areaHeight} onChange={(e) => this.setState({ areaHeight: e.target.value })} className="form-control title" aria-label="..." />
                                                                        </div>
                                                                        <div className='ml-3'>
                                                                            <span>Width:</span> <input type="number" placeholder="Eg:  5000m" value={this.state.areaWidth} onChange={(e) => this.setState({ areaWidth: e.target.value })} className="form-control title" aria-label="..." />
                                                                        </div>
                                                                    </div>
                                                                    <div className='w-50'>
                                                                        <span>Area Unit:</span> <input type="text" placeholder="Eg:  Marla,Kanals,Square Feet" value={this.state.areaUnit} onChange={(e) => this.setState({ areaUnit: e.target.value })} className="form-control title" aria-label="..." />
                                                                    </div>
                                                                </div>

                                                                <br />

                                                                <h5 className='text-warning'>Entered Area is : {this.state.areaHeight} * {this.state.areaWidth} {this.state.areaUnit}</h5>

                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Select the date of completion of Project :</h3>
                                                                <DatePicker
                                                                    onChange={(val) => this.setState({
                                                                        completionDate: val
                                                                    })}
                                                                    value={this.state.completionDate}
                                                                />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Structural Engineers of the project :</h3>
                                                                <input type="text" placeholder="Eg: Andreotta Cardenosa Consulting Engineers etc" value={this.state.StructuralEngineers} onChange={(e) => this.setState({ StructuralEngineers: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Project Architects of the project :</h3>
                                                                <input type="text" placeholder="Eg: Louise Allen, Julia Kiefer, Jaime Mayger, Philip Stejskal etc" value={this.state.ProjectArchitects} onChange={(e) => this.setState({ ProjectArchitects: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Project Site : <span className="text-red">*</span></h3>
                                                                <input type="text" placeholder="Eg: Louise Allen, Julia Kiefer, Jaime Mayger, Philip Stejskal etc" value={this.state.projectSiteLocation} onChange={(e) => this.setState({ projectSiteLocation: e.target.value })} className="form-control title" aria-label="..." />
                                                            </div>

                                                            <br />

                                                            <div>
                                                                <h3>Enter the Google Map Link where the project is located :</h3>
                                                                <input type="text" placeholder="Eg: https://www.google.com/maps?ll=31.476852,74.449119&z=16&t=m&hl=en&gl=US&mapclient=embed&cid=17223166234116770493 etc" value={this.state.GoogleMapLink} onChange={(e) => this.setState({ GoogleMapLink: e.target.value })} className="form-control title" aria-label="..." />
                                                                <br />
                                                                <iframe title='Map' id="mapAdmin" src={this.state.GoogleMapLink} allowFullScreen loading="lazy" />
                                                            </div>

                                                            {/* ProjectSector: this.state.projectSector, */}
                                                            {/* ProjectService: this.state.projectService,
                                                                ArchitecturalTeam: this.state.ProjectArchitects,
                                                                InteriorPersons: this.state.interiorArchitects,
                                                                LandscapePersons: this.state.LandscapeArchitects,
                                                                BuilderArchitects: this.state.builderArchitects,
                                                                PhotographyPersons: this.state.photographyPersons */}

                                                            {(
                                                                this.state.title === ""
                                                                ||
                                                                this.state.projectService === ""
                                                                ||
                                                                this.state.projectClient === ""
                                                                ||
                                                                this.state.areaHeight === 0
                                                                ||
                                                                this.state.areaWidth === 0
                                                                ||
                                                                this.state.areaUnit === ""
                                                                ||
                                                                this.state.disc === ""
                                                                ||
                                                                this.state.projectSiteLocation == ""
                                                                ||
                                                                this.state.ImageURLArray.length == 0
                                                            ) ? (
                                                                <div>
                                                                    <h4 className="text-red">Please fill all the fields indicated as necessary with * sign to submit</h4>
                                                                    <button disabled={true} className="btn btn-success btn-block">Submit</button>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <h4 className="mt-2">You are ready to post the Project.</h4>
                                                                    <button className="btn btn-success btn-block" type="button" data-toggle="modal" data-target="#exampleModal" onClick={this.sendDataProject}>Submit</button>
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

export default Projects;