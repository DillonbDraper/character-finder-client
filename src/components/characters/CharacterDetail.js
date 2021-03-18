import React, { useContext, useEffect, useState } from "react"
import { CharacterContext } from "./CharacterProvider.js"
import { useParams, useHistory } from "react-router-dom"
import Container from '@material-ui/core/Container';
import { Button }  from '@material-ui/core'


export const CharacterDetail = () => {

    const params = useParams()
    const history = useHistory()

    const { character, getCharacterById } = useContext(CharacterContext)
    
    useEffect(() => {
        getCharacterById(params.characterId)
    },[])

    return (
        <>
        <h1>{character.name}</h1>
        <p>AKA: {character.alias} </p>
        <p>Age: {character.age}</p>
        <p>Born on: {character.born_on}</p>
        <p>Died on {character.died_on ? character.died_on : "NA"}</p>
        <p>Bio: {character.bio} </p>
        <Button color="primary" variant="contained" onClick={() => history.push(`character-form/${character.id}`)}>Enter Edit</Button>
        </>
    )
}