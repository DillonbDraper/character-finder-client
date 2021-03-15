import React, { useContext, useEffect } from "react"
import { Route } from "react-router-dom"
import { CharacterProvider } from "./characters/CharacterProvider"
import { FictionProvider } from "./fictions/FictionProvider"
import { SeriesProvider } from "./series/SeriesProvider"
import { AuthorProvider } from "./authors/AuthorProvider"
import { CharacterList } from "./characters/CharacterList"
import { CharacterDetail } from "./characters/CharacterDetail"
import { AuthorDetail } from "./authors/AuthorDetail"
import { FictionDetail } from "./fictions/FictionDetail"
import { SeriesDetail } from "./series/SeriesDetail"
import { SeriesForm } from "./series/SeriesForm"
import { FictionForm } from "./fictions/FictionForm"
import { AuthorForm } from "./authors/AuthorForm"
import { CharacterForm } from "./characters/CharacterForm"
import { CreationHub } from "./CreationHub"


export const ApplicationViews = (props) => {
    return (

        <>

            <CharacterProvider>
                <AuthorProvider>
                    <FictionProvider>
                        <SeriesProvider>
                            <Route exact path="/" render={
                                () =>
                                    <CharacterList />
                            } />

                            <Route exact path="/characters:character_id(\d+)/" render={
                                () =>
                                    <CharacterDetail />
                            } />


                            <Route exact path="/authors:author_id(\d+)/" render={
                                () =>
                                    <AuthorDetail />
                            } />


                            <Route exact path="/fictions:fiction_id(\d+)/" render={
                                () =>
                                    <FictionDetail />
                            } />


                            <Route exact path="/series/:series_id(\d+)/" render={
                                () =>
                                    <SeriesDetail />
                            } />
                        </SeriesProvider>
                    </FictionProvider>
                </AuthorProvider>
            </CharacterProvider>

        </>
    )
}