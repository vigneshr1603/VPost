import axios from 'axios';
import React, { Component } from 'react'

import { Link } from 'react-router-dom';
import signuplogo from '../assets/signuplogo.png'
import { url } from '../helpers/BaseUrl';
import EmptyNavbar from './components/EmptyNavbar';
export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            username: "",
            email:"",
            password: "",
            mobile:"",
            error_msg:"",
            div_class:""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    };
    
    validateEmail = (mailid) => {
        // eslint-disable-next-line
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mailid))
            return true;
        return false;
        
    }
    handleInputChange(event) {
        
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleError(val,val1){
        this.setState({
            error_msg:val,
            div_class:val1
        })
    }
    signup=()=>{
        this.handleError("","");
        if(this.state.username==="" || this.state.email==="" || this.state.password==="" ){
            this.handleError("Enter the details properly","border border-danger text-center text-danger alert alert-danger")
          
        }
        else if(this.validateEmail(this.state.email)===false){
            this.handleError("Enter a valid email address", "border border-danger text-center text-danger alert alert-danger");
      
        }
        else if(this.state.password.length<8){
            this.handleError("Length of password should be atleast 8", "border border-danger text-center text-danger alert alert-danger");
      
        }
        else{
        axios.post(url+"/auth/signup", this.state).then((response) => {
            if(response.data==="Created"){
                //Login navigation

                this.handleError("","");
                this.props.history.push("/login");
            }
            else{
                this.handleError(response.data.error,"border border-danger text-center text-danger alert alert-danger")
            }
        });
    }
    };
    render() {
        return (
            <div>
                <EmptyNavbar></EmptyNavbar>
             <section className="container min-container mt-4" >
                    <div className="card-panel p-sm-5 position-relative">
                        <div className="text-center">
                            <h2 className="mt-2">Sign Up!</h2><br></br>
                            <img alt="" width="12%" src={signuplogo}></img>

                        </div>
                        <form id="SignupForm" className="mt-4">

                        <div className="form-group position-relative">
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input className="form-control input-lg" value={this.state.name} onChange={this.handleInputChange} id="name" name="name" type="text" placeholder="Name" maxLength="50" required></input>
                                <i className="fa fa-user fa-lg position-absolute"></i>
                            </div>
                            <br></br>

                            <div className="form-group position-relative">
                                <label htmlFor="username" className="sr-only">Username</label>
                                <input className="form-control input-lg" value={this.state.username} onChange={this.handleInputChange} id="username" name="username" type="text" placeholder="Username" maxLength="20" required></input>
                                <i className="fa fa-user fa-lg position-absolute"></i>
                            </div>
                            <br></br>

                            <div className="form-group position-relative">
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input className="form-control input-lg" value={this.state.email} onChange={this.handleInputChange} id="email" name="email" type="text" placeholder="Email"maxLength="30" required></input>
                                <i className="fa fa-envelope fa-lg position-absolute"></i>
                            </div>
                            <br></br>

                            <div className="position-relative">
                                <label htmlFor="password" className="pull-left sr-only">Password</label>
                                <input className="form-control input-lg" value={this.state.password} onChange={this.handleInputChange} id="password" name="password" type="password"
                                    placeholder="Password" maxLength="15" required></input>
                                <i className="fa fa-lock fa-lg position-absolute"></i>
                            </div>

                            <div className="text-center my-4">
                                <button id="submitbtn" type="button" className="btn btn-primary" name="submitbtn" onClick={this.signup}>Sign Up</button>
                            </div>
                            <div className={this.state.div_class} >
                                {this.state.error_msg}
                            </div>
                        </form>
                        <p className="mt-3 text-center">Already have an account ? <Link to="/login" className="text-primary "><i>Login</i></Link></p>
                  
                    </div>
                </section>
            </div>
        )
    }
}

export default SignUp
