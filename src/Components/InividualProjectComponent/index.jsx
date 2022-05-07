import "./style.css";

const InividualProjectComponent = (props) => {

    const deleteProject = () => {
        alert("Project is deleted")
    }

    const editProject = () => {
        alert("Project is Edited")
    }

    return (
        <div className="projectInividualComponent">
            <div>
                <h4><b>Project Title :</b> {props.Title}</h4>
                <h4><b>Project Client :</b> {props.ProjectClient}</h4>
                <h4><b>Project Scope :</b> {props.ProjectService}</h4>
                <h4><b>Site Location :</b> {props.projectSiteLocation}</h4>
                <h4><b>Project Size :</b> {props.Area}</h4>
                <h4><b>Project Size :</b> {props.Area}</h4>
                <h4><b>Project Description:</b> {props.Description} </h4>
            </div>
            <div className="d-flex justify-content-evenly">
                <button className="btn btn-delete btn-danger btn-lg" onClick={deleteProject}>DELETE</button>
                <button className="btn btn-edit btn-warning btn-lg" onClick={editProject}>EDIT</button>
            </div>
        </div>
    )
}
export default InividualProjectComponent;