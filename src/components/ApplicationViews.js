import React, { useContext, useEffect } from "react"
import { Route } from "react-router-dom"
import { CharacterProvider } from "./characters/CharacterProvider"
import { CharacterList } from "./characters/CharacterList"

export const ApplicationViews = (props) => {
    return (

        <>

            <CharacterProvider>
                <Route exact path="/" render={
                    () =>
                        <CharacterList />
                } />
            </CharacterProvider>

        </>
    )
}