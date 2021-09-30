import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import loginlogo from '../assets/loginlogo.png'
import { url } from '../helpers/BaseUrl';
import EmptyNavbar from './components/EmptyNavbar';
export class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error_msg: "",
            div_class: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    };


    handleInputChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleError(val, val1) {
        this.setState({
            error_msg: val,
            div_class: val1
        })
    }
    login = () => {
        this.handleError("", "");
        if (this.state.password === "" || this.state.username === "") {
            this.handleError("Enter login details properly.", "border border-danger text-center text-danger alert alert-danger");
        }
        else {
            axios.post(url+"/auth/login", this.state).then((response) => {

                if (!response.data.error) {
                    this.handleError("", "");
                    sessionStorage.setItem("accessToken", response.data);
                    this.props.history.push("/home");

                }
                else {
                    this.handleError(response.data.error, "border border-danger text-center text-danger alert alert-danger");
                }
            });
        }
    }

    render() {
        return (

            <div>
                <EmptyNavbar></EmptyNavbar>
                <section className="container min-container py-md-5 mt-4">
                    <div className="card-panel p-sm-5 position-relative">
                        <div className="text-center">
                            <h2 className="mt-2">Login!</h2><br></br>
                            <img alt="" width="12%" src={loginlogo}></img>

                        </div>
                        <form id="LoginForm" className="mt-5">


                            <div className="form-group position-relative">
                                <label htmlFor="username" className="sr-only">Name</label>
                                <input className="form-control input-lg" value={this.state.username} onChange={this.handleInputChange} id="username" name="username" type="text" placeholder="Username" maxLength="20" required></input>
                                <i className="fa fa-user fa-lg position-absolute"></i>
                            </div>
                            <br></br>



                            <div className="position-relative">
                                <label htmlFor="password" className="pull-left sr-only">Password</label>
                                <input className="form-control input-lg" value={this.state.password} onChange={this.handleInputChange} id="password" name="password" type="password"
                                    placeholder="Password" maxLength="15" required></input>
                                <i className="fa fa-lock fa-lg position-absolute"></i>
                            </div>

                            <div className="text-center my-4">
                                <button id="submitbtn" type="button" className="btn btn-primary" name="submitbtn" onClick={this.login}>Login <span><i className="fa fa-sign-in"></i></span></button>
                            </div>
                            <div className={this.state.div_class} >
                                {this.state.error_msg}
                            </div>
                        </form>
                        <p className="mt-3 text-center">New User ? <Link to="/signup" className="text-primary "><i>Sign up</i></Link></p>
                    </div>
                </section>
            </div>
        )
    } 
}

export default Login
