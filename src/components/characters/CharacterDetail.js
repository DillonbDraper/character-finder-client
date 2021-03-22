import React, { useContext, useEffect, useState } from "react"
import { CharacterContext } from "./CharacterProvider.js"
import { useParams, useHistory } from "react-router-dom"
import { Container } from '@material-ui/core';
import { Button } from '@material-ui/core'
import { Typography } from '@material-ui/core'


export const CharacterDetail = () => {

    const params = useParams()
    const history = useHistory()

    const { character, getCharacterById, secondCharacter, checkForMatchOriginal, deleteCharacter, destroyAllPersonalVersions } = useContext(CharacterContext)

    const [personalView, setPersonalView] = useState(false)

    useEffect(() => {
        getCharacterById(params.characterId).then(() => {
            checkForMatchOriginal(params.characterId).then( () => {
            if ( secondCharacter.age ) {
                setPersonalView(true)
            }})
        })
    }, [])

    return (
        <Container style={{backgroundColor: '#cfe8fc', height: '94vh', maxWidth: '100%'}}>
            { secondCharacter.age ?
                <Button color="primary" variant="contained" onClick={() => {personalView ? setPersonalView(false) : setPersonalView(true)}}>Toggle view</Button>
                :
                ""

            }
            { personalView ?
                <Container maxWidth="xl" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h2>My version of</h2>
                    <h1>{secondCharacter.name}</h1>
                    <Typography>AKA: {secondCharacter.alias} </Typography>
                    <Typography>Age: {secondCharacter.age}</Typography>
                    <Typography>Born on: {secondCharacter.born_on}</Typography>
                    <Typography>Died on {secondCharacter.died_on ? character.died_on : "NA"}</Typography>
                    <Typography style={{marginTop: '1%'}}>Bio: {secondCharacter.bio} </Typography>
                    <Button color="primary" variant="contained" style={{alignSelf: 'flex-start', marginTop: '3%'}} onClick={() => history.push(`/character-form/${secondCharacter.id}`)}>Revise Edits</Button>
                </Container>

                :
                <Container maxWidth="xl" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h2>Public Version of </h2>
                    <h1>{character.name}</h1>
                    <Typography>AKA: {character.alias} </Typography>
                    <Typography>Age: {character.age}</Typography>
                    <Typography>Born on: {character.born_on}</Typography>
                    <Typography>Died on {character.died_on ? character.died_on : "NA"}</Typography>
                    <Typography style={{marginTop: '1%', alignSelf: "flex-start"}}>Bio: {character.bio} </Typography>
                    {
                        !secondCharacter.age ? 
                        <Button color="primary" style={{alignSelf: 'flex-start', marginTop: '1%'}} variant="contained" onClick={() => history.push(`/character-form/${character.id}`)}>Enter Edit Mode</Button>
                         : ""

            }
                </Container>
            }

            {(localStorage.getItem("isAdmin") === 'true') ?
            <Button style={{marginTop: '1%', marginLeft: '1%'}}color="primary" variant="contained" onClick={() => {
                if (personalView) {
                    deleteCharacter(secondCharacter.id)
                    history.push('/')
                } else if (!personalView) {
                    destroyAllPersonalVersions(character.id).then(() => deleteCharacter(character.id))
                    history.push('/')
                }
            } }>Delete Character</Button>
            : ''}
        </Container>
    )
}