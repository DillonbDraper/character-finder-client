import React, { useContext, useEffect, useState } from "react"
import { CharacterContext } from "../characters/CharacterProvider.js"
import { useParams, useHistory } from "react-router-dom"
import { Container } from '@material-ui/core';
import { Button }  from '@material-ui/core'


export const AdminDetail = () => {

    const params = useParams()
    const history = useHistory()

    const { character, getCharacterById, checkForMatch, originalCharacter } = useContext(CharacterContext)
    
    useEffect(() => {
        getCharacterById(params.characterId).then(() => {
            checkForMatch(params.characterId)
        })
    },[])

    useEffect(() => {}, [originalCharacter])

    return (
        <>
        <Container style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <div className="originalCharacter">
        <h2>Original Character</h2>    
        <h4>{originalCharacter.name}</h4>
        <p>AKA: {originalCharacter.alias} </p>
        <p>Age: {originalCharacter.age}</p>
        <p>Born on: {originalCharacter.born_on}</p>
        <p>Died on {originalCharacter.died_on ? originalCharacter.died_on : "NA"}</p>
        <p>Bio: {originalCharacter.bio} </p>
        </div>

        <div className="editedCharacter">
        <h2>New Version</h2>    
        <h4>{character.name}</h4>
        <p>AKA: {character.alias} </p>
        <p>Age: {character.age}</p>
        <p>Born on: {character.born_on}</p>
        <p>Died on {character.died_on ? character.died_on : "NA"}</p>
        <p>Bio: {character.bio} </p>
        </div>
        <Button color="primary" variant="contained" >Enter Edit</Button>


        </Container>
        </>
    )
}