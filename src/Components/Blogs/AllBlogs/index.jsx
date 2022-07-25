import { useState, useEffect } from "react";
import firebase from "../../../firebase/index";
import 'firebase/firestore';
import { storage } from '../../../firebase/index';

//Importing components
import InividualBlogComponent from "../InividualBlogComponent";

const AllBlogs = () => {

    const [status, setStatus] = useState(false);
    const [signedInUserData, setSignedInUserData] = useState(null)
    const [loading, setLoading] = useState(false);
    const [blogReload, setBlogReload] = useState(false);
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

        console.log("All the Blogs Data in the Blogs Component is : ", firestoreData);

        const db = firebase.firestore();
        db.collection(`Blogs`)
            .get()
            .then(snapshot => {
                let data = [];
                snapshot.forEach(element => {
                    data.push(Object.assign({
                        "id": element.id,
                        "uid": element.uid,
                        "userEmail": element.userEmail,
                        "BlogTitle": element.BlogTitle,
                        "BlogSubmissionDate": element.BlogSubmissionDate,
                        "BlogHashTagsArray": element.BlogHashTagsArray,
                        "BlogDescription": element.BlogDescription,
                        "BlogCoverPara": element.BlogCoverPara,
                        "BlogCoverImageUrl": element.BlogCoverImageUrl,
                        "BlogCategory": element.BlogCategory,
                        "BlogAuthor": element.BlogAuthor,
                    }, element.data()))
                })
                console.log("All data of blogs from cloud is equal to ==> ", data)

                if (firestoreData.length !== data.length || blogReload == true) {
                    setFirestoreData(data);
                    setLoading(true);
                    setBlogReload(false);
                    console.log("Updated ...");
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
                            All the Blogs are listed here.You can <span className="text-danger">Delete</span> them or <span className="text-warning">Edit</span> them.
                        </b>
                    </h2>
                    <br />
                    {firestoreData.map((element, i) => {
                        return (
                            <div key={i}>
                                <InividualBlogComponent
                                    number={(i + 1)}
                                    id={element.id}
                                    uid={element.uid}
                                    userEmail={element.userEmail}
                                    BlogTitle={element.BlogTitle}
                                    BlogSubmissionDate={element.BlogSubmissionDate}
                                    BlogHashTagsArray={element.BlogHashTagsArray}
                                    BlogDescription={element.BlogDescription}
                                    BlogCoverPara={element.BlogCoverPara}
                                    BlogCoverImageUrl={element.BlogCoverImageUrl}
                                    BlogCategory={element.BlogCategory}
                                    BlogAuthor={element.BlogAuthor}
                                    reloadBlog={setBlogReload}
                                />
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default AllBlogs;