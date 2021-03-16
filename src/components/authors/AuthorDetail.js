import React, { useContext, useEffect, useState } from "react"
import { AuthorContext } from "./AuthorProvider.js"
import { useParams } from "react-router-dom"

export const AuthorDetail = () => {

    const params = useParams()

    const { author, getAuthorById } = useContext(AuthorContext)
    
    useEffect(() => {
        getAuthorById(params.authorId)
    },[])

    return (
        <>
        <h1>{author.name}</h1>
        <p>Born on: {author.born_on}</p>
        <p>Died on {author.died_on ? author.died_on : "NA"}</p>
        <p>Bio: {author.bio} </p>
        </>
    )
}