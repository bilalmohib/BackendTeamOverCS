import { useState, useEffect } from "react";
import firebase from "../../../firebase/index";
import 'firebase/firestore';
import { storage } from '../../../firebase/index';

import "./style.css";

const InividualProjectComponent = (props) => {
    const [status, setStatus] = useState(false);
    const [signedInUserData, setSignedInUserData] = useState(null);

    const [edit, setEdit] = useState(false);

    //New entities
    const [Title, setTitle] = useState(props.Title);
    const [Description, setDescription] = useState(props.Description);
    const [ImageURLArray, setImageURLArray] = useState("");
    const [Architects, setArchitects] = useState("");
    const [ProjectClient, setProjectClient] = useState(props.ProjectClient);
    const [Area, setArea] = useState(props.Area);
    const [CompletionDate, setCompletionDate] = useState("");
    const [StructuralEngineers, setStructuralEngineers] = useState("");
    const [LandscapeArchitects, setLandscapeArchitects] = useState("");
    const [projectSiteLocation, setProjectSiteLocation] = useState(props.projectSiteLocation);
    const [GoogleMapLink, setGoogleMapLink] = useState("");
    const [Key, setKey] = useState("");
    const [timeSubmitted, setTimeSubmitted] = useState("");
    const [ProjectSector, setProjectSector] = useState("");
    const [ProjectService, setProjectService] = useState(props.ProjectService);
    const [ArchitecturalTeam, setArchitecturalTeam] = useState("");
    const [InteriorPersons, setInteriorPersons] = useState("");
    const [LandscapePersons, setLandscapePersons] = useState("");
    const [BuilderArchitects, setBuilderArchitects] = useState("");
    const [PhotographyPersons, setPhotographyPersons] = useState("");

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setStatus(true);
                setSignedInUserData(user);
                // setStatus(true);
            }
            else {
                setStatus(false);
                setSignedInUserData(null);
            }
        })

        //console.log("Title is equal to : " + projectsEditData.Title)
    })

    //Defining Firebase
    const db = firebase.firestore();

    const projectReference = db.collection("Projects");

    //Defining Reference

    const deleteProject = (projectId) => {
        projectReference.doc(projectId).delete().then(() => {
            console.log("Project successfully deleted!");
            props.reloadProject(true);
            alert("Project Deleted Successfully.")
        }).catch((error) => {
            console.error("Error removing Project: ", error);
            alert("Error Deleting Project.")
        });
        // alert(projectId)
    }

    const updateProject = (pid) => {
        const projectUpdatedData = {
            Title: Title,
            ProjectClient: ProjectClient,
            ProjectService: ProjectService,
            projectSiteLocation: projectSiteLocation,
            Area: Area,
            Description: Description,
        }

        projectReference.doc(pid).update(projectUpdatedData)
            .then(() => {
                console.log("Project successfully updated!");
                props.reloadProject(true);
                // Set the edit state to false
                setEdit(false);
                alert(`Project Updated Successfully with id=${pid}.`)
            }).catch((error) => {
                console.error("Error updating Project: ", error);
                alert("Error Updating Project.")
            });
    }

    return (
        <div className="InividualComponent">
            <div>
                <h4>
                    <b>Project No. :</b> {props.number}
                </h4>
                <div className="mb-2">
                    <h4 className="headingAttr"> <b>Project ID :</b> {props.id}</h4>
                </div>
                <div style={{ marginTop: "20px" }} className="d-flex mt-2">
                    <h4 className="headingAttr"><b>Project Title :</b></h4>
                    {(edit) ? (
                        <div className="container_input">
                            <input className="form-control editInput" placeholder="Enter the updated project title here ...." type="text" value={Title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                    ) : (
                        <h4>{props.Title}</h4>
                    )}
                </div>
                <div className="d-flex mt-2">
                    <h4 className="headingAttr"><b>Project Client :</b></h4>
                    {(edit) ? (
                        <div className="container_input">
                            <input className="form-control editInput" placeholder="Enter the updated project client here ...." type="text" value={ProjectClient} onChange={(e) => setProjectClient(e.target.value)} />
                        </div>
                    ) : (
                        <h4>{props.ProjectClient}</h4>
                    )}
                </div>
                <div className="d-flex mt-2">
                    <h4 className="headingAttr"><b>Project Scope :</b></h4>
                    {(edit) ? (
                        <div className="container_input">
                            <input className="form-control editInput" placeholder="Enter the updated project scope here ...." type="text" value={ProjectService} onChange={(e) => setProjectService(e.target.value)} />
                        </div>
                    ) : (
                        <h4>{props.ProjectService}</h4>
                    )}
                </div>
                <div className="d-flex mt-2">
                    <h4 className="headingAttr"><b>Site Location :</b></h4>
                    {(edit) ? (
                        <div className="container_input">
                            <input className="form-control editInput" placeholder="Enter the updated project location here ...." type="text" value={projectSiteLocation} onChange={(e) => setProjectSiteLocation(e.target.value)} />
                        </div>
                    ) : (
                        <h4>{props.projectSiteLocation}</h4>
                    )}
                </div>
                <div className="d-flex mt-2">
                    <h4 className="headingAttr"><b>Project Size :</b></h4>
                    {(edit) ? (
                        <div className="container_input">
                            <input className="form-control editInput" placeholder="Enter the updated project size here ...." type="text" value={Area} onChange={(e) => setArea(e.target.value)} />
                        </div>
                    ) : (
                        <h4>{props.Area}</h4>
                    )}
                </div>
                <div className="d-flex mt-2">
                    <h4 className="headingAttr"><b>Project Description:</b></h4>
                    {(edit) ? (
                        <div className="container_input">
                            <textarea rows="3" cols="3" className="form-control editInput" placeholder="Enter the updated project Description here ...." type="text" value={Description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    ) : (
                        <h4>{props.Description}</h4>
                    )}
                </div>

                <br />

                {props.ImageURLArray.map((v, i) => {
                    return <li key={i} style={{ display: "inline-block", listStyle: "none" }}>
                        <div>
                            {/* Here the loop div is here */}
                            <img width={350} height={250} className="border ml-2 mb-2" src={v} alt={i} />
                            {/* Here the loop div is here */}
                        </div>
                    </li>
                })}
            </div>

            <br />

            <div className="d-flex justify-content-evenly">
                <button className="btn btn-delete btn-danger btn-lg" onClick={() => deleteProject(props.id)}>DELETE</button>
                {(edit) ? (
                    <button
                        type="button"
                        className="btn btn-edit btn-success btn-lg"
                        onClick={() => updateProject(props.id)}>
                        UPDATE
                    </button>
                ) : (
                    <button
                        type="button"
                        className="btn btn-edit btn-warning btn-lg"
                        onClick={() => setEdit(true)}>
                        EDIT
                    </button>
                )}
            </div>
        </div>
    )
}
export default InividualProjectComponent;