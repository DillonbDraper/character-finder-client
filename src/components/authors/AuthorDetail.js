import React, { useContext, useEffect, useState } from "react"
import { AuthorContext } from "./AuthorProvider.js"
import { useParams, useHistory, Link } from "react-router-dom"
import { Button } from "@material-ui/core"
import { Typography } from '@material-ui/core'
import { Container } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';


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

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
        },
        listSection: {
            backgroundColor: 'inherit',
        },
        ul: {
            backgroundColor: 'inherit',
            padding: 0,
        },
    }));

    const classes = useStyles()



    return (
        <>
            <Container style={{ backgroundColor: '#cfe8fc', height: '94vh', maxWidth: '100%' }}>
                <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <h1>{author.name}</h1>
                    <Typography>Born on: {author.born_on}</Typography>
                    <Typography>Died on: {author.died_on ? author.died_on : "NA"}</Typography>
                    <Typography style={{ alignSelf: 'flex-start' }}>Bio: {author.bio} </Typography>



                </Container>
                <Container style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3%' }}>
                    <List className={classes.root} subheader={<li />}>
                        <ListSubheader>Works written by {author.name}:</ListSubheader>
                        {author.works ?
                            author.works.map((work) => (
                                <ListItem key={`${work.id}`}>
                                    <Link to={`/fictions/${work.id}`}>{work.title}</Link>
                                </ListItem>
                            )
                            ) : ""}
                    </List>

                    <List className={classes.root} subheader={<li />}>
                        <ListSubheader>Created the series:</ListSubheader>
                        {author.series ?
                            author.series.map((series) => (
                                <ListItem key={`${series.id}`}>
                                    <Link to={`/series/${series.id}`}>{series.title}</Link>
                                </ListItem>
                            )
                            ) : ""}
                    </List>

                    <List className={classes.root} subheader={<li />}>
                        <ListSubheader>Created the characters:</ListSubheader>
                        {author.characters ?
                            author.characters.map((char) => (
                                <ListItem key={`${char.id}`}>
                                    <Link to={`/characters/${char.id}`}>{char.name}</Link>
                                </ListItem>
                            )
                            ) : ""}
                    </List>
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