import React, { useContext, useEffect, useState } from "react"
import { AuthorContext } from "./AuthorProvider.js"
import { useParams, useHistory } from "react-router-dom"
import { Button } from "@material-ui/core"
import { Typography } from '@material-ui/core'
import { Container } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export const AuthorDetail = () => {

    const params = useParams()
    const history = useHistory()

    const { author, getAuthorById, deleteAuthor } = useContext(AuthorContext)

    const [open, setOpen] = useState(false);


    useEffect(() => {
        getAuthorById(params.authorId)
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteConfirm = () => {
        deleteAuthor(author.id)
        setOpen(false)
        history.push('/')
    }


    return (
        <>
            <Container style={{ backgroundColor: '#cfe8fc', height: '94vh', maxWidth: '100%' }}>
                <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <h1>{author.name}</h1>
                    <Typography>Born on: {author.born_on}</Typography>
                    <Typography>Died on: {author.died_on ? author.died_on : "NA"}</Typography>
                    <Typography style={{ alignSelf: 'flex-start' }}>Bio: {author.bio} </Typography>



                </Container>
                {(localStorage.getItem("isAdmin") === 'true') ?
                    <Button style={{ alignSelf: 'flex-start', marginTop: '1%' }} color="primary" variant="contained" onClick={handleClickOpen}
                     >Delete Author</Button>
                    :
                    ''}
            </Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Permanently delete Author?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action will permanently delete this author from the database for all users.  Are you sure you want to do this?
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
        </>
    )
}