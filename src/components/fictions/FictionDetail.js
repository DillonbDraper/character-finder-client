import React, { useContext, useEffect, useState } from "react"
import { FictionContext } from "./FictionProvider.js"
import { useParams, useHistory } from "react-router-dom"
import { Button } from "@material-ui/core"

export const FictionDetail = () => {

    const params = useParams()
    const history = useHistory()

    const { fiction, getFictionById, deleteFiction } = useContext(FictionContext)
    
    useEffect(() => {
        getFictionById(params.fictionId)
    }, [])

    return (
        <>
        <h1>{fiction.title}</h1>
        <p>By: {fiction.creators[0] ? fiction.creators[0].name : "Unknown"} </p>
        <p>{fiction.series ? fiction.series.title : "NA"} </p>
        <p>Genre: {fiction.genre.name}</p>
        <p>{fiction.description}</p>
        <p>Characters: {fiction.died_on ? fiction.died_on : "Unavailable"}</p>
        <p>Part of series: {fiction.series.title ? fiction.series.title : "NA"} </p>

        {(localStorage.getItem("isAdmin") === 'true') ?
                <Button color="primary" variant="contained" onClick={() => {
                    deleteFiction(fiction.id)
                    history.push('/')
                }
                } >Delete Book</Button> 
                : 
                ''}

        </>
    )
}