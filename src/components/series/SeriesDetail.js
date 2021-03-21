import React, { useContext, useEffect, useState } from "react"
import { SeriesContext } from "./SeriesProvider.js"
import { useParams, useHistory } from "react-router-dom"
import { Button } from "@material-ui/core"


export const SeriesDetail = () => {

    const params = useParams()
    const history = useHistory()

    const { series, getSeriesById, deleteSeries } = useContext(SeriesContext)
    
    useEffect(() => {
        getSeriesById(params.seriesId)
    },[])

    return (
        <>
        <h1>{series.title}</h1>
        <p>Description: {series.description} </p>
        {(localStorage.getItem("isAdmin") === 'true') ?
                <Button color="primary" variant="contained" onClick={() => {
                    deleteSeries(series.id)
                    history.push('/')
                }
                } >Delete Series</Button> 
                : 
                ''}

        </>
    )
}