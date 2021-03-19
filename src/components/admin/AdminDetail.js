import React, { useContext, useEffect, useState } from "react"
import { CharacterContext } from "../characters/CharacterProvider.js"
import { useParams, useHistory } from "react-router-dom"
import { Container } from '@material-ui/core';
import { Button }  from '@material-ui/core'


export const AdminDetail = () => {

    const params = useParams()
    const history = useHistory()

    const { character, getCharacterById, checkForMatch, originalCharacter, approveCharacterEdit, rejectCharacterEdit } = useContext(CharacterContext)
    
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


        </Container>
        <Container style={{display: 'flex', justifyContent: 'space-evenly'}}>

        <Button color="primary" variant="contained"
        onClick={ () => {
            approveCharacterEdit(originalCharacter.id, character)
        }}
        >
            Approve Edit</Button>
        <Button color="primary" variant="contained" 
        onClick={ () => {
            rejectCharacterEdit(originalCharacter.id, character)
        }}
        >Reject Edit</Button>
        </Container>

        </>
    )
}