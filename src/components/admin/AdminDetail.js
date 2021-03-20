import React, { useContext, useEffect, useState } from "react"
import { CharacterContext } from "../characters/CharacterProvider.js"
import { useParams, useHistory } from "react-router-dom"
import { Container } from '@material-ui/core';
import { Button }  from '@material-ui/core'


export const AdminDetail = () => {

    const params = useParams()
    const history = useHistory()

    const { character, getCharacterById, checkForMatch, secondCharacter, approveCharacterEdit, rejectCharacterEdit } = useContext(CharacterContext)

    
    useEffect(() => {
        getCharacterById(params.characterId).then(() => {
            checkForMatch(params.characterId)
        })
    },[])

    useEffect(() => {}, [secondCharacter])

    return (
        <>
        <Container style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <div className="secondCharacter">
        <h2>second Character</h2>    
        <h4>{secondCharacter.name}</h4>
        <p>AKA: {secondCharacter.alias} </p>
        <p>Age: {secondCharacter.age}</p>
        <p>Born on: {secondCharacter.born_on}</p>
        <p>Died on {secondCharacter.died_on ? secondCharacter.died_on : "NA"}</p>
        <p>Bio: {secondCharacter.bio} </p>
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
            approveCharacterEdit(secondCharacter.id, character)
        }}
        >
            Approve Edit</Button>
        <Button color="primary" variant="contained" 
        onClick={ () => {
            rejectCharacterEdit(secondCharacter.id, character)
        }}
        >Reject Edit</Button>
        </Container>

        </>
    )
}