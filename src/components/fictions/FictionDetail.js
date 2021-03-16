import React, { useContext, useEffect, useState } from "react"
import { FictionContext } from "./FictionProvider.js"
import { useParams } from "react-router-dom"

export const FictionDetail = () => {

    const params = useParams()

    const { fiction, getFictionById } = useContext(FictionContext)
    
    useEffect(() => {
        getFictionById(params.fictionId)
    }, [])

    return (
        <>
        <h1>{fiction.title}</h1>
        <p>By: {fiction.creators[0].name} </p>
        <p>{fiction.series !== {} ? fiction.series.title : ""} </p>
        <p>Born on: {fiction.genre.name}</p>
        <p>Died on {fiction.died_on ? fiction.died_on : "NA"}</p>
        <p>Bio: {fiction.description} </p>
        </>
    )
}