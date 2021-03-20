import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"
export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const history = useHistory()

    const handleRegister = (e) => {
        e.preventDefault()
        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "firstName": firstName.current.value,
                "lastName": lastName.current.value
                
            }
            return fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("app_user", res.token)
                        localStorage.setItem("isAdmin", res.staff)

                        history.push("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }
    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="inputFirstName"> First Name </label>
                    <input ref={firstName} type="name" name="firstName" className="form-control" placeholder="John" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputLastName"> Last Name </label>
                    <input ref={lastName} type="name" name="lastName" className="form-control" placeholder="Doe" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputUsername"> username </label>
                    <input ref={username} type="username" name="email" className="form-control" placeholder="Bookreaderperson" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}