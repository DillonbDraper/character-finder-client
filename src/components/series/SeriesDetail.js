import React, { useContext, useEffect, useState } from "react"
import { SeriesContext } from "./SeriesProvider.js"
import { useParams, useHistory } from "react-router-dom"
import { Button, Typography, Container } from "@material-ui/core"


export const SeriesDetail = () => {

    const params = useParams()
    const history = useHistory()

    const { series, getSeriesById, deleteSeries } = useContext(SeriesContext)

    useEffect(() => {
        getSeriesById(params.seriesId)
    }, [])

    return (
        <Container style={{ backgroundColor: '#cfe8fc', height: '94vh', maxWidth: '100%' }}>
            <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <h1>{series.title}</h1>
                <Typography>Description: {series.description} </Typography>
                {(localStorage.getItem("isAdmin") === 'true') ?
                    <Button style={{alignSelf: 'flex-start', marginTop: '2%'}} color="primary" variant="contained" onClick={() => {
                        deleteSeries(series.id)
                        history.push('/')
                    }
                    } >Delete Series</Button>
                    :
                    ''}
            </Container>

        </Container>
    )
}