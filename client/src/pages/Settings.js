import axios from 'axios'
import React from 'react'
import Navbar from './components/Navbar'
import { useState } from 'react'
import Swal from 'sweetalert2';
import { url } from '../helpers/BaseUrl';
function Settings() {

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const changePassword = () => {
        if (password === confirmPassword && confirmPassword.length >= 8) {
            axios.post(url+"/auth/password",
                {
                    password: password
                },
                {
                    headers: {
                        accessToken: sessionStorage.getItem("accessToken"),
                    },
                }

            ).then((response) => {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    html:
                        'Password reset successful!',
                    showCloseButton: false,
                    showCancelButton: false,
                    showConfirmButton: false,
                    focusConfirm: false,
                    timer: 2000
                })
                setPassword("")
                setConfirmPassword("")
            });

        }
        else {
            if (password !== confirmPassword) {
                Swal.fire({
                    title: 'Failed',
                    icon: 'error',
                    html:
                        'Passwords dont match',
                    showCloseButton: false,
                    showCancelButton: false,
                    showConfirmButton: false,
                    focusConfirm: false,
                    timer: 2000
                })
            }
            else {
                Swal.fire({
                    title: 'Failed',
                    icon: 'error',
                    html:
                        'Password length should be atleast 8',
                    showCloseButton: false,
                    showCancelButton: false,
                    showConfirmButton: false,
                    focusConfirm: false,
                    timer: 2000
                })
            }

        }
    }
    return (
        <div>
            <Navbar></Navbar><br></br><br></br>
            <div className="container">
                <div className="col-md-6 card">
                    <div className="card-body">
                        <h3 className="card-title">Change Password</h3>
                        <label htmlFor="password">New password</label>
                        <input onChange={(event) => { setPassword(event.target.value); }} type="password" id="password" className="form-control mt-2"></input>
                        <label htmlFor="con-password" className="mt-4">Confirm password</label>
                        <input type="password" onChange={(event) => { setConfirmPassword(event.target.value); }} id="con-password" className="form-control mt-2"></input>
                        <button type="button" className="btn btn-primary mt-4" onClick={() => changePassword()}>Change Password</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Settings
