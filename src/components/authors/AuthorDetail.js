import React, { useContext, useEffect } from "react"
import { AuthorContext } from "./AuthorProvider.js"
import { useParams, useHistory } from "react-router-dom"
import { Button } from "@material-ui/core"
import { Typography } from '@material-ui/core'
import { Container } from '@material-ui/core';


export const AuthorDetail = () => {

    const params = useParams()
    const history = useHistory()

    const { author, getAuthorById, deleteAuthor } = useContext(AuthorContext)

    useEffect(() => {
        getAuthorById(params.authorId)
    }, [])

    return (
        <Container style={{ backgroundColor: '#cfe8fc', height: '94vh', maxWidth: '100%' }}>
            <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <h1>{author.name}</h1>
                <Typography>Born on: {author.born_on}</Typography>
                <Typography>Died on: {author.died_on ? author.died_on : "NA"}</Typography>
                <Typography style={{alignSelf: 'flex-start'}}>Bio: {author.bio} </Typography>



            </Container>
                {(localStorage.getItem("isAdmin") === 'true') ?
                    <Button style={{alignSelf: 'flex-start', marginTop: '1%'}} color="primary" variant="contained" onClick={() => {
                        deleteAuthor(author.id)
                        history.push('/')
                    }
                    } >Delete Author</Button>
                    :
                    ''}
        </Container>
    )
}