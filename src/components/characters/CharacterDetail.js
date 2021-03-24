import React, { useContext, useEffect, useState } from "react"
import { CharacterContext } from "./CharacterProvider.js"
import { useParams, useHistory, Link } from "react-router-dom"
import { Container } from '@material-ui/core';
import { Button } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export const CharacterDetail = () => {

    const params = useParams()
    const history = useHistory()

    const { character, getCharacterById, secondCharacter, checkForMatchOriginal, deleteCharacter, destroyAllPersonalVersions } = useContext(CharacterContext)

    const [personalView, setPersonalView] = useState(false)
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getCharacterById(params.characterId).then(() => {
            checkForMatchOriginal(params.characterId)
        })
    }, [])


    useEffect(() => {
        console.log(secondCharacter)
        if (secondCharacter.id !== 0) {
            setPersonalView(true)
        } else {
            setPersonalView(false)
        }
    }, [secondCharacter])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteConfirm = () => {
        if (personalView) {
            deleteCharacter(secondCharacter.id)
        } else if (!personalView) {
            destroyAllPersonalVersions(character.id).then(() => deleteCharacter(character.id))
        }
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
        <Container style={{ backgroundColor: '#cfe8fc', height: '94vh', maxWidth: '100%' }}>
            { secondCharacter.age ?
                <Button style={{marginTop: '2%'}} color="primary" variant="contained" onClick={() => { personalView ? setPersonalView(false) : setPersonalView(true) }}>Toggle view</Button>
                :
                ""

            }
            { personalView ?
                <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2>My version of</h2>
                    <h1>{secondCharacter.name}</h1>
                    <img style={{maxWidth: '15%', height: 200}} src={secondCharacter.image ? secondCharacter.image : ''}></img>
                    <Typography>AKA: {secondCharacter.alias} </Typography>
                    <Typography>Created by: {secondCharacter.creators[0] ? <Link to={`/authors/${secondCharacter.creators[0].id}`}>{secondCharacter.creators[0].name}</Link> : 'NA'} </Typography>
                    <Typography>Age: {secondCharacter.age}</Typography>
                    <Typography>Born on: {secondCharacter.born_on}</Typography>
                    <Typography>Died on: {secondCharacter.died_on ? character.died_on : "NA"}</Typography>
                    <Container style={{ maxWidth: '75%', marginTop: '2%', marginBottom: '2%', display: 'flex', justifyContent: 'space-between' }}>
                        <List className={classes.root} subheader={<li />}>
                            <ListSubheader>Appears in:</ListSubheader>
                            {secondCharacter.works ?
                                secondCharacter.works.map((book) => (
                                    <ListItem key={`book-${book.id}`}>
                                        <Link to={`/fictions/${book.id}`}>{book.title}</Link>
                                    </ListItem>
                                )
                                ) : ""}
                        </List>
                        <List className={classes.root} subheader={<li />}>
                            <ListSubheader>As a part of the series:</ListSubheader>
                            {secondCharacter.series ?
                                secondCharacter.series.map((series) => (
                                    <ListItem key={`series-${series.id}`}>
                                        <Link to={`/series/${series.id}`}>{series.title}</Link>
                                    </ListItem>
                                )
                                ) : <ListItem key={`blank-series-key`}>
                                    <p>NA</p>
                            </ListItem>}
                        </List>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Related Characters</TableCell>
                                        <TableCell align="right">Characters</TableCell>
                                        <TableCell align="right">Relationships</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {secondCharacter.associations.map((association) => (
                                        <TableRow key={`association-${association.id}`}>
                                            <TableCell component="th" scope="row">
                                                {association.char_two ? association.char_two.name : association.char_one.name}
                                            </TableCell>
                                            <TableCell align="right">{association.description ? association.description : ""}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Container>
                    <Typography style={{ marginTop: '1%' }}>Bio: {secondCharacter.bio} </Typography>
                    <Button color="primary" variant="contained" style={{ alignSelf: 'flex-start', marginTop: '3%' }} onClick={() => history.push(`/character-form/${secondCharacter.id}`)}>Revise Edits</Button>
                </Container>

                :
                <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2>Public Version of </h2>
                    <h1>{character.name}</h1>
                    <img style={{maxWidth: '15%', height: 200}} src={character.image ? character.image : ''}></img>
                    <Typography>AKA: {character.alias} </Typography>
                    <Typography>Created by: {character.creators.length > 0 ? <Link to={`/authors/${character.creators[0].id}`}>{character.creators[0].name}</Link> : 'NA'} </Typography>
                    <Typography>Age: {character.age}</Typography>
                    <Typography>Born on: {character.born_on}</Typography>
                    <Typography>Died on: {character.died_on ? character.died_on : "NA"}</Typography>
                    <Container style={{ maxWidth: '75%', marginTop: '2%', marginBottom: '2%', display: 'flex', justifyContent: 'space-between' }}>
                        <List className={classes.root} subheader={<li />}>
                            <ListSubheader>Appears in:</ListSubheader>
                            {character.works ?
                                character.works.map((book) => (
                                    <ListItem key={`book-${book.id}`}>
                                        <Link to={`/fictions/${book.id}`}>{book.title}</Link>
                                    </ListItem>
                                )
                                ) : ""}
                        </List>
                        <List className={classes.root} subheader={<li />}>
                            <ListSubheader>As a part of the series:</ListSubheader>
                            {character.series ?
                                character.series.map((series) => (
                                    <ListItem key={`series-${series.id}`}>
                                        <Link to={`/series/${series.id}`}>{series.title}</Link>
                                    </ListItem>
                                )
                                ) : <ListItem key={`blank-series-key`}>
                                    <p>NA</p>
                            </ListItem>}
                        </List>


                                    </Container>
                                    <Typography style={{alignSelf: 'flex-start'}}>Known Character Relationships:</Typography>
                        <TableContainer style={{maxWidth: '55%', alignSelf: 'flex-start'}} component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Characters</TableCell>
                                        <TableCell>Relationship</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {character.associations ? character.associations.map((association) => (
                                        <TableRow key={`association-${association.id}`}>
                                            <TableCell component="th" scope="row">
                                                {association.char_two ? association.char_two.name : association.char_one.name}
                                            </TableCell>
                                            <TableCell >{association.description ? association.description : ""}</TableCell>
                                        </TableRow>
                                    ) ) :""}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    <Typography style={{ marginTop: '1%', alignSelf: "flex-start" }}>Bio: {character.bio} </Typography>
                    {
                        !secondCharacter.age ?
                            <Button color="primary" style={{ alignSelf: 'flex-start', marginTop: '1%' }} variant="contained" onClick={() => history.push(`/character-form/${character.id}`)}>Enter Edit Mode</Button>
                            : ""

                    }
                </Container>
            }

            {(localStorage.getItem("isAdmin") === 'true') ?
                <Button style={{ marginTop: '1%', marginLeft: '1%' }} color="primary" variant="contained" onClick={handleClickOpen}>Delete Character</Button>
                : ''}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Permanently delete Character?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action will permanently delete this character from the database for all users.  Are you sure you want to do this?
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

        </Container >
    )
}