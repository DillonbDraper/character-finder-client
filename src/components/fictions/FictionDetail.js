import React, { useContext, useEffect, useState } from "react"
import { FictionContext } from "./FictionProvider.js"
import { useParams, useHistory, Link } from "react-router-dom"
import { Button } from "@material-ui/core"
import { Typography } from '@material-ui/core'
import { Container } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export const FictionDetail = () => {

    const params = useParams()
    const history = useHistory()

    const { fiction, getFictionById, deleteFiction } = useContext(FictionContext)

    const [open, setOpen] = useState(false);


    useEffect(() => {
        getFictionById(params.fictionId)
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteConfirm = () => {
        setOpen(false)
        deleteFiction(fiction.id)
        history.push('/')
    }

    return (
        <Container style={{ backgroundColor: '#cfe8fc', height: '94vh', maxWidth: '100%' }}>

            <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>{fiction.title}</h1>
                <Typography>Published on: {fiction.date_published} </Typography>
                <Typography>By: {fiction.creators ? fiction.creators.map(creator=> {
                    return <Link to={`/authors/${creator.id}`}>{creator.name}</Link>
                }): "Unknown"} </Typography>
                <Typography>Genre: {fiction.genre.name}</Typography>
                <Typography>Characters: {fiction.characters ? fiction.characters[0].name : "Unavailable"}</Typography>
                <Typography>Part of the series: {fiction.series[0] ? <Link to={`/series/${fiction.series[0].id}`}>{fiction.series[0].title}</Link> : "NA"} </Typography>
                <Typography style={{ alignSelf: 'flex-start', marginTop: '2%' }}>Description: {fiction.description}</Typography>

<Container style={{paddingLeft: '50%', marginTop: '2%'}}>
                <Typography>The following characters in our database appear this work:</Typography>
                <ul>
                {fiction.characters ? fiction.characters.map(character => {
                    return <li><Link to={`/characters/${character.id}`}>{character.name}</Link></li>
                }) : ""}
                
                </ul>
</Container>
            </Container>
            {(localStorage.getItem("isAdmin") === 'true') ?
                <Button style={{ marginTop: '2%', marginLeft: '1%' }} color="primary" variant="contained" onClick={handleClickOpen} >Delete Book</Button>
                :
                ''}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Permanently delete Book?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action will permanently delete this book from the database for all users.  Are you sure you want to do this?
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