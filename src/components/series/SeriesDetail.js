import React, { useContext, useEffect, useState } from "react"
import { SeriesContext } from "./SeriesProvider.js"
import { useParams } from "react-router-dom"

export const SeriesDetail = () => {

    const params = useParams()

    const { series, getSeriesById } = useContext(SeriesContext)
    
    useEffect(() => {
        getSeriesById(params.seriesId)
    },[])

    return (
        <>
        <h1>{series.title}</h1>
        <p>Description: {series.description} </p>
        </>
    )
}