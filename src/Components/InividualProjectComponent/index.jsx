import { useState, useEffect } from "react";
import firebase from "../../firebase/index";
import 'firebase/firestore';
import { storage } from '../../firebase/index';

import "./style.css";

const InividualProjectComponent = (props) => {
    const [status, setStatus] = useState(false);
    const [signedInUserData, setSignedInUserData] = useState(null)

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

    const editProject = (projectId) => {
        alert("Will implement Soon", projectId)
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
                <button className="btn btn-edit btn-warning btn-lg" onClick={() => editProject(props.id)}>EDIT</button>
            </div>
        </div>
    )
}
export default InividualProjectComponent;