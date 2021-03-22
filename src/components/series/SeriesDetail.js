import React, { useContext, useEffect, useState } from "react"
import { SeriesContext } from "./SeriesProvider.js"
import { useParams, useHistory } from "react-router-dom"
import { Button, Typography, Container } from "@material-ui/core"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export const SeriesDetail = () => {

    const params = useParams()
    const history = useHistory()

    const { series, getSeriesById, deleteSeries } = useContext(SeriesContext)

    const [open, setOpen] = useState(false);


    useEffect(() => {
        getSeriesById(params.seriesId)
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteConfirm = () => {
        setOpen(false)
        deleteSeries(series.id)
        history.push('/')

    }

    return (
        <Container style={{ backgroundColor: '#cfe8fc', height: '94vh', maxWidth: '100%' }}>
            <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <h1>{series.title}</h1>
                <Typography>Description: {series.description} </Typography>
                {(localStorage.getItem("isAdmin") === 'true') ?
                    <Button style={{alignSelf: 'flex-start', marginTop: '2%'}} color="primary" variant="contained" onClick={handleClickOpen}
                     >Delete Series</Button>
                    :
                    ''}
            </Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Permanently delete Series?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action will permanently delete this series from the database for all users.  Are you sure you want to do this?
              </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Go back
              </Button>
                    <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
                        Confirm Delete
              </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}