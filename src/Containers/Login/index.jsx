import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Loader from "../../Components/Loader";

import DatePicker from 'react-date-picker';

import logo from "../../assets/logo copy.png"

import { Link, useHistory } from "react-router-dom"

import firebase from "../../firebase/index";
import 'firebase/firestore';
import { storage } from '../../firebase/index';

const currentDate = new Date();

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            status: null,
        };
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

                <br />
                <br />
                <Footer />
                {/* Projects section */}
            </div>
        )
    }
}

export default Login;