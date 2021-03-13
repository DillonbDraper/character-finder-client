import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./components/ApplicationViews"
import { Navbar } from "./components/nav/Navbar.js"
import { Login } from "./components/auth/Login.js"
import { Register } from "./components/auth/Register.js"


export const Lithub = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("app_user")) {
                return <>
                    <Navbar />
                    {/* <ApplicationViews /> */}
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={() => {
            if (localStorage.getItem("app_user")) {
                return <Redirect to="/" />
            } else {
                return <Login />
            }
        }} />

        <Route path="/register" render={() => {
            if (localStorage.getItem("app_user")) {
                return <Redirect to="/" />
            } else {
                return <Register />
            }
        }} />
    </>
)
