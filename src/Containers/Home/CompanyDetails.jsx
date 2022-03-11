import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { connect } from "react-redux";
import { setTodoList } from '../../store/action/index';

import { Link, useHistory } from "react-router-dom"
import '../../Styling/CompanyDetails.css';

const CompanyDetails = (props) => {
    // const changeKey = (e) => {
    //     props.setCurrentKey(e);
    //     console.log("The Key is : ", props.SET_KEY);
    // }

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            {/* Company Details */}
            <section className="cd">
                <div className="container">
                    <div className="row cr paddingMobileCD">
                        <div className="col-sm-4 ct">
                            <h1 className="count">
                                <CountUp start={0} end={9} delay={0} duration={3}>
                                    {({ countUpRef }) => (
                                        <span ref={countUpRef} />
                                    )}
                                </CountUp>
                            </h1>
                            <p className="countp">Year of Expereince</p>
                        </div>
                        <div className="col-sm-4 ct">
                            <h1 className="count">
                                <CountUp start={0} end={70} delay={0} duration={3}>
                                    {({ countUpRef }) => (
                                        <span ref={countUpRef} />
                                    )}
                                </CountUp>
                            </h1>
                            <p className="countp">Staff</p>
                        </div>
                        <div className="col-sm-4 ct">
                            <h1 className="count">
                            <CountUp start={0} end={600} delay={0} duration={3}>
                                    {({ countUpRef }) => (
                                        <span ref={countUpRef} />
                                    )}
                                </CountUp>+
                            </h1>
                            <p className="countp">Projects</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Company Details */}
        </div >
    )
}

export default CompanyDetails;