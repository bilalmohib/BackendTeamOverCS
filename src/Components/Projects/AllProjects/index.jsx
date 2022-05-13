import { useState, useEffect } from "react";
import firebase from "../../../firebase/index";
import 'firebase/firestore';
import { storage } from '../../../firebase/index';

//Importing components
import InividualProjectComponent from "../InividualProjectComponent";

const AllProjects = () => {

    const [status, setStatus] = useState(false);
    const [signedInUserData, setSignedInUserData] = useState(null)
    const [loading, setLoading] = useState(false);
    const [projectReload, setProjectReload] = useState(false);
    const [firestoreData, setFirestoreData] = useState([]);

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

        console.log("All the Projects Data in the Projects Component is : ", firestoreData);

        const db = firebase.firestore();
        db.collection(`Projects`)
            .get()
            .then(snapshot => {
                let data = [];
                snapshot.forEach(element => {
                    data.push(Object.assign({
                        "id": element.id,
                        "uid": element.uid,
                        "userEmail": element.userEmail,
                        "Title": element.Title,
                        "Description": element.Description,
                        "ImageURLArray": element.ImageURLArray,
                        "Architects": element.Architects,
                        "ProjectClient": element.ProjectClient,
                        "Area": element.Area,
                        "CompletionDate": element.CompletionDate,
                        "StructuralEngineers": element.StructuralEngineers,
                        "LandscapeArchitects": element.LandscapeArchitects,
                        "projectSiteLocation": element.projectSiteLocation,
                        "GoogleMapLink": element.GoogleMapLink,
                        "Key": element.Key,
                        "timeSubmitted": element.timeSubmitted,
                        //New entities
                        "ProjectSector": element.ProjectSector,
                        "ProjectService": element.ProjectService,
                        "ArchitecturalTeam": element.ArchitecturalTeam,
                        "InteriorPersons": element.InteriorPersons,
                        "LandscapePersons": element.LandscapePersons,
                        "BuilderArchitects": element.BuilderArchitects,
                        "PhotographyPersons": element.PhotographyPersons
                    }, element.data()))
                })
                console.log("data of projects from cloud is equal to ==> ", data)
                ///////////////////////////////Here is the code for sending notifications
                ///////////////////////////////Here is the code for sending notifications

                ///////////////////////////////Here is the code for sending notifications
                ///////////////////////////////Here is the code for sending notifications

                if (firestoreData.length !== data.length || projectReload == true) {
                    setFirestoreData(data);
                    setLoading(true);
                    setProjectReload(false);
                    console.log("Updated")
                }
            }).catch(err => {
                console.log(err)
            })
    })

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 border">
                    <h2 className="text-dark text-bold">
                        <b>
                            All the projects are listed here.You can <span className="text-danger">Delete</span> them or <span className="text-warning">Edit</span> them.
                        </b>
                    </h2>
                    <br />
                    {firestoreData.map((element, i) => {
                        return (
                            <div key={i}>
                                <InividualProjectComponent
                                    number={(i + 1)}
                                    id={element.id}
                                    uid={element.uid}
                                    userEmail={element.userEmail}
                                    Title={element.Title}
                                    reloadProject={setProjectReload}
                                    Description={element.Description}
                                    ImageURLArray={element.ImageURLArray}
                                    Architects={element.Architects}
                                    ProjectClient={element.ProjectClient}
                                    Area={element.Area}
                                    CompletionDate={element.CompletionDate}
                                    StructuralEngineers={element.StructuralEngineers}
                                    LandscapeArchitects={element.LandscapeArchitects}
                                    projectSiteLocation={element.projectSiteLocation}
                                    GoogleMapLink={element.GoogleMapLink}
                                    Key={element.Key}
                                    timeSubmitted={element.timeSubmitted}
                                    //New entities
                                    ProjectSector={element.ProjectSector}
                                    ProjectService={element.ProjectService}
                                    ArchitecturalTeam={element.ArchitecturalTeam}
                                    InteriorPersons={element.InteriorPersons}
                                    LandscapePersons={element.LandscapePersons}
                                    BuilderArchitects={element.BuilderArchitects}
                                    PhotographyPersons={element.PhotographyPersons}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default AllProjects;