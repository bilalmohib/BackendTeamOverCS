import { useState, useEffect } from "react";
import firebase from "../../../firebase/index";
import 'firebase/firestore';
import { storage } from '../../../firebase/index';

import "./style.css";

const InividualProjectComponent = (props) => {
    const [status, setStatus] = useState(false);
    const [signedInUserData, setSignedInUserData] = useState(null)

    const [check, setCheck] = useState("");

    //New entities
    const [number, setNumber] = useState("");
    const [id, setId] = useState("");
    const [uid, setUid] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [ImageURLArray, setImageURLArray] = useState("");
    const [Architects, setArchitects] = useState("");
    const [ProjectClient, setProjectClient] = useState("");
    const [Area, setArea] = useState("");
    const [CompletionDate, setCompletionDate] = useState("");
    const [StructuralEngineers, setStructuralEngineers] = useState("");
    const [LandscapeArchitects, setLandscapeArchitects] = useState("");
    const [projectSiteLocation, setProjectSiteLocation] = useState("");
    const [GoogleMapLink, setGoogleMapLink] = useState("");
    const [Key, setKey] = useState("");
    const [timeSubmitted, setTimeSubmitted] = useState("");
    const [ProjectSector, setProjectSector] = useState("");
    const [ProjectService, setProjectService] = useState("");
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

    const deleteProject = (projectId) => {
        const db = firebase.firestore();
        db.collection("Projects").doc(projectId).delete().then(() => {
            console.log("Project successfully deleted!");
            props.reloadProject(true);
            alert("Project Deleted Successfully.")
        }).catch((error) => {
            console.error("Error removing Project: ", error);
            alert("Error Deleting Project.")
        });
        // alert(projectId)
    }

    const editProject = (
        number,
        id,
        uid,
        userEmail,
        Title,
        Description,
        ImageURLArray,
        Architects,
        ProjectClient,
        Area,
        CompletionDate,
        StructuralEngineers,
        LandscapeArchitects,
        projectSiteLocation,
        GoogleMapLink,
        Key,
        timeSubmitted,
        //New entities
        ProjectSector,
        ProjectService,
        ArchitecturalTeam,
        InteriorPersons,
        LandscapePersons,
        BuilderArchitects,
        PhotographyPersons
    ) => {
        setCheck(number)
        document.getElementById("check").innerHTML = number
        alert(`Will implement Soon ${check}`)
    }

    return (
        <div className="projectInividualComponent">
            <div>
                <h4><b>Project No. :</b> {props.number}</h4>
                <h4><b>Project ID :</b> {props.id}</h4>
                <h4><b>Project Title :</b> {props.Title}</h4>
                <h4><b>Project Client :</b> {props.ProjectClient}</h4>
                <h4><b>Project Scope :</b> {props.ProjectService}</h4>
                <h4><b>Site Location :</b> {props.projectSiteLocation}</h4>
                <h4><b>Project Size :</b> {props.Area}</h4>
                <h4><b>Project Size :</b> {props.Area}</h4>
                <h4><b>Project Description:</b> {props.Description} </h4>

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
                <button
                    type="button"
                    className="btn btn-edit btn-warning btn-lg"
                    // data-mdb-toggle="modal"
                    // data-mdb-target="#staticBackdrop"
                    onClick={
                        () => editProject(
                            props.number,
                            props.id,
                            props.uid,
                            props.userEmail,
                            props.Title,
                            props.Description,
                            props.ImageURLArray,
                            props.Architects,
                            props.ProjectClient,
                            props.Area,
                            props.CompletionDate,
                            props.StructuralEngineers,
                            props.LandscapeArchitects,
                            props.projectSiteLocation,
                            props.GoogleMapLink,
                            props.Key,
                            props.timeSubmitted,
                            //New entities
                            props.ProjectSector,
                            props.ProjectService,
                            props.ArchitecturalTeam,
                            props.InteriorPersons,
                            props.LandscapePersons,
                            props.BuilderArchitects,
                            props.PhotographyPersons
                        )}
                >
                    EDIT
                </button>
                <button type="button" data-mdb-toggle="modal"
                    data-mdb-target="#staticBackdrop">Launch</button>
            </div>

            {/* Modal to Edit Projects */}
            <div className="modal fade" id="staticBackdrop" data-mdb-backdrop="static" data-mdb-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Editing the project: <b>{props.Title}</b></h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <form>
                                <h4><b>Project No. :</b> <span id="check"></span></h4>
                                <h4><b>Project ID :</b> </h4>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        // value={projectsEditData.Title}
                                        // onChange={(e) => handleChange("Title", e)}
                                        id="recipient-name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Message:</label>
                                    {/* <textarea className="form-control" id="message-text" value={projectsEditData.Description} onChange={(e) => setProjectsEditData({ Description: e.target.value })} /> */}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Understood</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InividualProjectComponent;