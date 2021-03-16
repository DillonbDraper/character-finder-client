import React, { useContext, useEffect, useState } from "react"
import { CharacterContext } from "./CharacterProvider.js"
import { useParams } from "react-router-dom"

export const CharacterDetail = props => {

    const params = useParams()

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
        </>
    )
}