import React, { useContext, useEffect, useState } from "react"
import { CharacterContext } from "./CharacterProvider.js"
import { useParams, useHistory } from "react-router-dom"
import { Container } from '@material-ui/core';
import { Button } from '@material-ui/core'


export const CharacterDetail = () => {

    const params = useParams()
    const history = useHistory()

    const { character, getCharacterById, secondCharacter, checkForMatchOriginal } = useContext(CharacterContext)

    const [personalView, setPersonalView] = useState(false)

    useEffect(() => {
        getCharacterById(params.characterId).then(() => {
            checkForMatchOriginal(params.characterId).then( () => {
            if (secondCharacter !== []) {
                setPersonalView(true)
            }})
        })
    }, [])

    return (
        <>
            { secondCharacter !== [] ?
                <Button color="primary" variant="contained" onClick={() => {personalView ? setPersonalView(false) : setPersonalView(true)}}>Toggle view</Button>
                :
                ""

            }
            { personalView ?
                <div>
                    <h2>My version of</h2>
                    <h1>{secondCharacter.name}</h1>
                    <p>AKA: {secondCharacter.alias} </p>
                    <p>Age: {secondCharacter.age}</p>
                    <p>Born on: {secondCharacter.born_on}</p>
                    <p>Died on {secondCharacter.died_on ? character.died_on : "NA"}</p>
                    <p>Bio: {secondCharacter.bio} </p>
                    <Button color="primary" variant="contained" onClick={() => history.push(`/character-form/${character.id}`)}>Revise Edits</Button>
                </div>

                :
                <div>
                    <h2>Public Version of </h2>
                    <h1>{character.name}</h1>
                    <p>AKA: {character.alias} </p>
                    <p>Age: {character.age}</p>
                    <p>Born on: {character.born_on}</p>
                    <p>Died on {character.died_on ? character.died_on : "NA"}</p>
                    <p>Bio: {character.bio} </p>
                    {
                        secondCharacter === [] ? 
                        <Button color="primary" variant="contained" onClick={() => history.push(`/character-form/${character.id}`)}>Enter Edit</Button>
                         : ""

            }
                </div>
            }
        </>
    )
}