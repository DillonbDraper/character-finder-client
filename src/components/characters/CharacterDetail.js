import React, { useContext, useEffect, useState } from "react"
import { CharacterContext } from "./CharacterProvider.js"
import { useParams, useHistory, Link } from "react-router-dom"
import { Container } from '@material-ui/core';
import { Button } from '@material-ui/core'
import { Typography } from '@material-ui/core'
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
            checkForMatchOriginal(params.characterId).then(() => {
                if (secondCharacter.age) {
                    setPersonalView(true)
                }
            })
        })
    }, [])

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


    return (
        <Container style={{ backgroundColor: '#cfe8fc', height: '94vh', maxWidth: '100%' }}>
            { secondCharacter.age ?
                <Button color="primary" variant="contained" onClick={() => { personalView ? setPersonalView(false) : setPersonalView(true) }}>Toggle view</Button>
                :
                ""

            }
            { personalView ?
                <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2>My version of</h2>
                    <h1>{secondCharacter.name}</h1>
                    <Typography>AKA: {secondCharacter.alias} </Typography>
                    <Typography>Created by: {secondCharacter.creators[0] ? <Link to={`/authors/${secondCharacter.creators[0].id}`}>{secondCharacter.creators[0].name}</Link> : 'NA'} </Typography>
                    <Typography>Age: {secondCharacter.age}</Typography>
                    <Typography>Born on: {secondCharacter.born_on}</Typography>
                    <Typography>Died on {secondCharacter.died_on ? character.died_on : "NA"}</Typography>
                    <Container maxWidth='xl' style={{ marginLeft: '65%', marginTop: '5%' }}>
                        <Typography>Appears in:</Typography>
                        <ul>
                            {secondCharacter.works ? secondCharacter.works.map(fiction => {
                                return <li><Link to={`/fictions/${fiction.id}`}>{fiction.title}</Link></li>
                            }) : ""}
                        </ul>
                    </Container>
                    <Typography style={{ marginTop: '1%' }}>Bio: {secondCharacter.bio} </Typography>
                    <Button color="primary" variant="contained" style={{ alignSelf: 'flex-start', marginTop: '3%' }} onClick={() => history.push(`/character-form/${secondCharacter.id}`)}>Revise Edits</Button>
                </Container>

                :
                <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2>Public Version of </h2>
                    <h1>{character.name}</h1>
                    <Typography>AKA: {character.alias} </Typography>
                    <Typography>Created by: {character.creators[0] ? <Link to={`/authors/${character.creators[0].id}`}>{character.creators[0].name}</Link> : 'NA'} </Typography>
                    <Typography>Age: {character.age}</Typography>
                    <Typography>Born on: {character.born_on}</Typography>
                    <Typography>Died on {character.died_on ? character.died_on : "NA"}</Typography>
                    <Container maxWidth='xl' style={{ marginLeft: '65%', marginTop: '5%' }}>
                        <Typography>Appears in:</Typography>
                        <ul>
                            {character.works ? character.works.map(fiction => {
                                return <li><Link to={`/fictions/${fiction.id}`}>{fiction.title}</Link></li>
                            }) : ""}
                        </ul>
                    </Container>
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