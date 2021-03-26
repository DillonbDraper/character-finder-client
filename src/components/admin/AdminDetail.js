import React, { useContext, useEffect } from "react"
import { CharacterContext } from "../characters/CharacterProvider.js"
import { useParams, useHistory } from "react-router-dom"
import { Container } from '@material-ui/core';
import { Button } from '@material-ui/core'


export const AdminDetail = () => {

    const params = useParams()
    const history = useHistory()

    const { character, getCharacterById, checkForMatch, checkForMatchOriginal, secondCharacter, approveCharacterEdit, addCharacterAssociations, rejectCharacterEdit } = useContext(CharacterContext)


    useEffect(() => {
        getCharacterById(params.characterId).then(() => {
            checkForMatch(params.characterId)
        })
    }, [])

    let relationshipObject = {}


    useEffect(() => { }, [secondCharacter])

    return (
        <Container>
            <Container style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div>
                    <h2>Old Version</h2>
                    <h4>{secondCharacter.name}</h4>
                    {secondCharacter.image ? <img style={{ maxWidth: '40%', height: '10%' }} src={secondCharacter.image} /> : <img style={{ maxWidth: '40%', height: '10%' }} src={`http://localhost:8000/media/blank-profile-picture-973460_1280.png`} />}
                    <p>AKA: {secondCharacter.alias} </p>
                    <p>Age: {secondCharacter.age}</p>
                    <p>Born on: {secondCharacter.born_on}</p>
                    <p>Died on {secondCharacter.died_on ? secondCharacter.died_on : "NA"}</p>
                    <p>Bio: {secondCharacter.bio} </p>
                    <p>Appearing in: </p>
                    <ul>
                        {secondCharacter.works[0] ? secondCharacter.works.map(work => (<li>{work.title}</li>)) : "NA"}
                    </ul>
                    <p>Created by:  {secondCharacter.creators[0] ? secondCharacter.creators[0].name : "NA"}</p>
                    <p>Appears in the series:  {secondCharacter.series[0] ? secondCharacter.series[0].title : "NA"}</p>
                    <p>Has Character relationship:  {secondCharacter.associations[0] ? secondCharacter.associations[0].char_one ? secondCharacter.associations[0].char_one.name :
                        secondCharacter.associations[0].char_two.name : "NA"}</p>
                    <p style={{ maxWidth: '60%' }}>Relationship description: {secondCharacter.associations[0] ? secondCharacter.associations[0].description : "NA"}</p>
                    <Button color="primary" variant="contained"
                        onClick={() => {
                            rejectCharacterEdit(secondCharacter.id, character)
                            history.push('/')
                        }}
                    >Reject Edit</Button>
                </div>

                <div>
                    <h2>New Version</h2>
                    <h4>{character.name}</h4>
                    {character.image ? <img style={{ maxWidth: '40%', height: '10%' }} src={character.image} /> : <img style={{ maxWidth: '40%', height: '10%' }} src={`http://localhost:8000/media/blank-profile-picture-973460_1280.png`} />}
                    <p>AKA: {character.alias} </p>
                    <p>Age: {character.age}</p>
                    <p>Born on: {character.born_on}</p>
                    <p>Died on {character.died_on ? character.died_on : "NA"}</p>
                    <p>Bio: {character.bio} </p>
                    <p>Appearing in: </p>
                    <ul>
                        {character.works[0] ? character.works.map(work => (<li>{work.title}</li>)) : "NA"}
                    </ul>
                    <p>Created by:  {character.creators[0] ? character.creators[0].name : "NA"}</p>
                    <p>Appears in the series:  {character.series[0] ? character.series[0].title : "NA"}</p>
                    <p>Has Character relationship:  {character.associations[0] ? character.associations[0].char_one ? character.associations[0].char_one.name :
                        character.associations[0].char_two.name : "NA"}</p>
                    <p>Relationship description: {character.associations[0] ? character.associations[0].description : "NA"}</p>
                    <Button color="primary" variant="contained"
                        onClick={() => {
                            approveCharacterEdit(secondCharacter.id, character).then(() => {
                                if (character.works[0] || character.series[0] || character.associations[0]) {
                                    if (character.works[0]) {
                                        relationshipObject.fictions = character.works
                                    }
                                    if (character.series[0]) {
                                        relationshipObject.series = character.series[0]
                                    }
                                    if (character.associations[0]) {
                                        if (character.associations[0].char_one) {
                                            relationshipObject.characters = character.associations[0].char_one
                                            relationshipObject.description = character.associations[0].description
                                        }
                                        else if (character.associations[0].char_two) {
                                            relationshipObject.characters = character.associations[0].char_two
                                            relationshipObject.description = character.associations[0].description

                                        }
                                    }

                                }
                                addCharacterAssociations(secondCharacter.id, relationshipObject)
                            }).then(() =>
                                checkForMatchOriginal(secondCharacter.id))
                            history.push('/')
                        }}
                    >
                        Approve Edit</Button>
                </div>



            </Container>
            <Container style={{ display: 'flex', justifyContent: 'space-between' }}>



            </Container>

        </Container>
    )
}