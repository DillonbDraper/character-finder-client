import React, { useContext, useEffect } from "react"
import { AuthorContext } from "./AuthorProvider.js"
import { useParams, useHistory } from "react-router-dom"
import { Button } from "@material-ui/core"


export const AuthorDetail = () => {

    const params = useParams()
    const history = useHistory()

    const { author, getAuthorById, deleteAuthor } = useContext(AuthorContext)

    useEffect(() => {
        getAuthorById(params.authorId)
    }, [])

    return (
        <>
            <h1>{author.name}</h1>
            <p>Born on: {author.born_on}</p>
            <p>Died on {author.died_on ? author.died_on : "NA"}</p>
            <p>Bio: {author.bio} </p>

            {(localStorage.getItem("isAdmin") === 'true') ?
                <Button color="primary" variant="contained" onClick={() => {
                    deleteAuthor(author.id)
                    history.push('/')
                }
                } >Delete Author</Button> 
                : 
                ''}



        </>
    )
}