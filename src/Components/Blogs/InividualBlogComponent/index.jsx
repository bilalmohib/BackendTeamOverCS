import { useState, useEffect } from "react";
import firebase from "../../../firebase/index";
import 'firebase/firestore';
import { storage } from '../../../firebase/index';

import "./style.css";

const InividualBlogComponent = (props) => {
    const [status, setStatus] = useState(false);
    const [signedInUserData, setSignedInUserData] = useState(null);

    const [edit, setEdit] = useState(false);

    // BlogTitle: BlogTitle,
    // BlogSubmissionDate: BlogSubmissionDate,
    // BlogHashTagsArray: BlogHashTagsArray,
    // BlogDescription: BlogDescription,
    // BlogCoverPara: BlogCoverPara,
    // BlogCoverImageUrl: BlogCoverImageUrl,
    // BlogCategory: BlogCategory,
    // BlogAuthor: BlogAuthor

    const [BlogTitle, setBlogTitle] = useState(props.BlogTitle);
    const [BlogSubmissionDate, setBlogSubmissionDate] = useState(props.BlogSubmissionDate);
    const [BlogHashTagsArray, setBlogHashTagsArray] = useState(props.BlogHashTagsArray);
    const [BlogDescription, setBlogDescription] = useState(props.BlogDescription);
    const [BlogCoverPara, setBlogCoverPara] = useState(props.BlogCoverPara);
    const [BlogCoverImageUrl, setBlogCoverImageUrl] = useState(props.BlogCoverImageUrl);
    const [BlogCategory, setBlogCategory] = useState(props.BlogCategory);
    const [BlogAuthor, setBlogAuthor] = useState(props.BlogAuthor);

    const [currentBlogHashTag, setCurrentBlogHashTag] = useState("");

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

        //console.log("Blog Title is equal to : " + props.BlogTitle);
    })

    //Defining Firebase
    const db = firebase.firestore();

    const blogReference = db.collection("Blogs");

    //Defining Reference

    const deleteBlog = (blogId) => {
        blogReference.doc(blogId).delete().then(() => {
            console.log("Blog successfully deleted!");
            props.reloadBlog(true);
            alert("Blog Deleted Successfully.")
        }).catch((error) => {
            console.error("Error removing Blog: ", error);
            alert("Error Deleting Blog.")
        });
        // alert(blogId)
    }

    const updateBlog = (bid) => {
        const blogUpdatedData = {
            BlogTitle: BlogTitle,
            BlogSubmissionDate: BlogSubmissionDate,
            BlogHashTagsArray: BlogHashTagsArray,
            BlogDescription: BlogDescription,
            BlogCoverPara: BlogCoverPara,
            BlogCoverImageUrl: BlogCoverImageUrl,
            BlogCategory: BlogCategory,
            BlogAuthor: BlogAuthor
        }

        blogReference.doc(bid).update(blogUpdatedData)
            .then(() => {
                console.log("Blog successfully updated!");
                props.reloadBlog(true);
                // Set the edit state to false
                setEdit(false);
                alert(`Blog Updated Successfully with id=${bid}.`)
            }).catch((error) => {
                console.error("Error updating Blog: ", error);
                alert("Error Updating Blog.")
            });
    }

    return (
        <div className="InividualComponent">
            <div>
                <h4>
                    <b>Blog No. :</b> {props.number}
                </h4>
                <div className="mb-2">
                    <h4 className="headingAttr"> <b>Blog ID :</b> {props.id}</h4>
                </div>

                {/* 
                    // BlogTitle={element.BlogTitle} 
                */}

                <div style={{ marginTop: "20px" }} className="d-flex mt-2">
                    <h4 className="headingAttr"><b>Blog Title :</b></h4>
                    {(edit) ? (
                        <div className="container_input">
                            <input className="form-control editInput" placeholder="Enter the updated blog title here ...." type="text" value={BlogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
                        </div>
                    ) : (
                        <h4>{props.BlogTitle}</h4>
                    )}
                </div>
                {/* 
                    // BlogSubmissionDate={element.BlogSubmissionDate}
                */}
                <div className="d-flex mt-2">
                    <h4 className="headingAttr"><b>BlogSubmissionDate :</b></h4>
                    {(edit) ? (
                        <div className="container_input">
                            <input className="form-control editInput" placeholder="Enter the updated BlogSubmissionDate here ...." type="text" value={BlogSubmissionDate} onChange={(e) => setBlogSubmissionDate(e.target.value)} />
                        </div>
                    ) : (
                        <h4>{props.BlogSubmissionDate}</h4>
                    )}
                </div>
                {/* 
                    // BlogHashTagsArray={element.BlogHashTagsArray}  
                */}
                <div className="d-flex mt-2">
                    <h4 className="headingAttr"><b>BlogHashTagsArray :</b></h4>
                    {(edit) ? (
                        <div className="container_input">
                            <input className="form-control editInput" placeholder="Enter the new Blog Hash Tags here ...." type="text" value={currentBlogHashTag} onChange={(e) => setCurrentBlogHashTag(e.target.value)} />
                            <button className="btn btn-primary">Add Hash Tag</button>
                        </div>
                    ) : (
                        <h4>
                            {
                                (props.BlogHashTagsArray).map((element, index) => {
                                    return (
                                        <div key={index}>
                                            <h4>{element}</h4>
                                        </div>
                                    )
                                })
                            }
                        </h4>
                    )}
                </div>
                {/* 
                    // BlogDescription={element.BlogDescription}
                */}
                <div className="d-flex mt-2">
                    <h4 className="headingAttr"><b>BlogDescription :</b></h4>
                    {(edit) ? (
                        <div className="container_input">
                            <textarea rows={10} cols={5} className="form-control editInput" placeholder="Enter the updated blog description here ...." type="text" value={BlogDescription} onChange={(e) => setBlogDescription(e.target.value)} />
                        </div>
                    ) : (
                        <div className="border w-100" dangerouslySetInnerHTML={{ __html: props.BlogDescription }} />
                    )}
                </div>
                {/* 
                    // BlogCoverPara={element.BlogCoverPara}
                */}
                <div className="d-flex mt-2">
                    <h4 className="headingAttr"><b>BlogCoverPara :</b></h4>
                    {(edit) ? (
                        <div className="container_input">
                            <input className="form-control editInput" placeholder="Enter the updated blog cover para here ...." type="text" value={BlogCoverPara} onChange={(e) => setBlogCoverPara(e.target.value)} />
                        </div>
                    ) : (
                        <h4>{props.BlogCoverPara}</h4>
                    )}
                </div>
                {/* 
                    // BlogCoverImageUrl={element.BlogCoverImageUrl} 
                */}
                <div className="d-flex mt-2">
                    <h4 className="headingAttr"><b>BlogCoverImageUrl :</b></h4>
                    {(edit) ? (
                        <div className="container_input">
                            <textarea rows="3" cols="3" className="form-control editInput" placeholder="Enter the updated blog cover image url here ...." type="text" value={BlogCoverImageUrl} onChange={(e) => setBlogCoverImageUrl(e.target.value)} />
                        </div>
                    ) : (
                        <div>
                            <img src={props.BlogCoverImageUrl} alt="BlogCoverImageUrl" style={{ width: "100%", height: "auto" }} />
                        </div>
                    )}
                </div>
                {/* 
                    // BlogCategory={element.BlogCategory}
                */}
                <div className="d-flex mt-2">
                    <h4 className="headingAttr"><b>BlogCategory :</b></h4>
                    {(edit) ? (
                        <div className="container_input">
                            <textarea rows="3" cols="3" className="form-control editInput" placeholder="Enter the updated blog category here ...." type="text" value={BlogCategory} onChange={(e) => setBlogCategory(e.target.value)} />
                        </div>
                    ) : (
                        <h4>{props.BlogCategory}</h4>
                    )}
                </div>
                {/* 
                    // BlogAuthor={element.BlogAuthor}   
                */}
                <div className="d-flex mt-2">
                    <h4 className="headingAttr"><b>BlogAuthor :</b></h4>
                    {(edit) ? (
                        <div className="container_input">
                            <textarea rows="3" cols="3" className="form-control editInput" placeholder="Enter the updated blog author here ...." type="text" value={BlogAuthor} onChange={(e) => setBlogAuthor(e.target.value)} />
                        </div>
                    ) : (
                        <h4>{props.BlogAuthor}</h4>
                    )}
                </div>
                <br />

                <h1 className="text-danger">Will have a look here latter on</h1>
            </div>

            <br />

            <div className="d-flex justify-content-evenly">
                <button className="btn btn-delete btn-danger btn-lg" onClick={() => deleteBlog(props.id)}>DELETE</button>
                {(edit) ? (
                    <button
                        type="button"
                        className="btn btn-edit btn-success btn-lg"
                        onClick={() => updateBlog(props.id)}>
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
export default InividualBlogComponent;