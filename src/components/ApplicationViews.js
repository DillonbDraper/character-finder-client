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
import { GenreProvider } from "./genres/GenreProvider"


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

                            <Route exact path="/characters/:characterId(\d+)/" render={
                                () =>
                                    <CharacterDetail />
                            } />


                            <Route exact path="/authors/:authorId(\d+)/" render={
                                () =>
                                    <AuthorDetail />
                            } />


                            <Route exact path="/fictions/:fictionId(\d+)/" render={
                                () =>
                                    <FictionDetail />
                            } />


                            <Route exact path="/series/:seriesId(\d+)/" render={
                                () =>
                                    <SeriesDetail />
                            } />

                            <GenreProvider>
                                <Route exact path="/series-form" render={
                                    props =>
                                        <SeriesForm {...props} />
                                } />

                                <Route exact path="/author-form" render={
                                    props =>
                                        <AuthorForm {...props} />
                                } />
                                <Route exact path="/book-form" render={
                                    props =>
                                        <FictionForm {...props} />
                                } />
                            </GenreProvider>
                            <Route exact path="/character-form" render={
                                props =>
                                    <CharacterForm {...props} />
                            } />
                        </SeriesProvider>
                    </FictionProvider>
                </AuthorProvider>
            </CharacterProvider>

            <Route exact path="/creation-hub" render={
                () =>
                    <CreationHub />
            } />
        </>
    )
}