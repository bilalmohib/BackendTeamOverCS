import React, { useState, useEffect } from 'react';

import { Link, useHistory } from "react-router-dom";

import { connect } from "react-redux"
import { setCurrentKey } from '../store/action/index';

import '../css/Projects.css';

function ProjectsList(props) {

    const history = useHistory();
    const handleRowClick = (e) => {
        props.setCurrentKey(props.index)
        //   props.set/////////////////////////////////
        history.push(`/${e}`);
        // alert(e.target.innerText)
    }

    useEffect(() => {
        console.log("The key is here/::::::", props.SET_KEY)
    })

    return (
        <div className="portfolio">
            <figure>
                <img src={props.ImageURL} />
                <h3 className="InfoBlock">{props.title}<br /><span className="info"> {props.category} </span></h3><figcaption><a id="fp" onClick={() => handleRowClick('project/details')}>+</a></figcaption>
            </figure>
        </div>
    )
}

const mapStateToProps = (state) => ({
    SET_KEY: state.app.SET_KEY,
    projects_data: state.app.GET_SELL,
})
//updating the data of the state
const mapDispatchToProp = (dispatch) => ({
    setCurrentKey: (data) => dispatch(setCurrentKey(data)),
})
//updating the data of the state
export default connect(mapStateToProps, mapDispatchToProp)(ProjectsList);