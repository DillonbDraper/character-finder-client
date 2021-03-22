import React, { useContext, useEffect, useState } from "react"
import { FictionContext } from "./FictionProvider.js"
import { useParams, useHistory } from "react-router-dom"
import { Button } from "@material-ui/core"
import { Typography } from '@material-ui/core'
import { Container } from '@material-ui/core';


export const FictionDetail = () => {

    const params = useParams()
    const history = useHistory()

    const { fiction, getFictionById, deleteFiction } = useContext(FictionContext)

    useEffect(() => {
        getFictionById(params.fictionId)
    }, [])

    return (
        <Container style={{ backgroundColor: '#cfe8fc', height: '94vh', maxWidth: '100%' }}>

            <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>{fiction.title}</h1>
                <Typography>Published on: {fiction.date_published} </Typography>
                <Typography>By: {fiction.creators ? fiction.creators[0].name : "Unknown"} </Typography>
                <Typography>Genre: {fiction.genre.name}</Typography>
                <Typography>Characters: {fiction.characters ? fiction.characters[0].name : "Unavailable"}</Typography>
                <Typography>Part of the series: {fiction.series[0] ? fiction.series[0].title : "NA"} </Typography>
                <Typography style={{alignSelf: 'flex-start'}}>Description: {fiction.description}</Typography>


            </Container>
                {(localStorage.getItem("isAdmin") === 'true') ?
                    <Button style={{marginTop: '2%', marginLeft: '1%'}} color="primary" variant="contained" onClick={() => {
                        deleteFiction(fiction.id)
                        history.push('/')
                    }
                    } >Delete Book</Button>
                    :
                    ''}
        </Container>


    )
}