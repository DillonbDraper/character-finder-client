import React, { useContext, useEffect } from "react"
import { Route } from "react-router-dom"
import "./AppViews.css"

export const ApplicationViews = (props) => {
    return (

        <>

                                <Route exact path="/" render={
                                    props =>
                                    <CharacterList {...props} />
                                } />


        </>
    )
}