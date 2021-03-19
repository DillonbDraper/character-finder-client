import React, { useContext, useEffect, useState } from 'react'
import { CharacterContext } from "./CharacterProvider"
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core'
import { Button } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom'


export const CharacterForm = props => {

    const { register, handleSubmit, setValue } = useForm()
    const { addCharacter, getCharacterById, character, makeEditRequest } = useContext(CharacterContext)
    const params = useParams()
    const history = useHistory()

    const [ editMode, setEditMode ] = useState(false)

    useEffect(() => {
        if (params.characterId) {
            getCharacterById(params.characterId).then(() => setEditMode(true)).then(() => {
                setValue('name', character.name)
                setValue('age', character.age)
                setValue('born_on', character.born_on)
                setValue('died_on', character.died_on)
                setValue('alias', character.alias)
                setValue('bio', character.bio)

            })
        }
    }, [])

    useEffect(() => {

    }, [editMode])

    return (
        <Container maxWidth="xl" style={{ backgroundColor: '#cfe8fc', height: '75vh', display: 'flex' }}>
            <form className="characterForm" onSubmit={handleSubmit((data) => {
                
                if (editMode) {

                    makeEditRequest(params.characterId, data)
                    setEditMode(false)
                    history.push(`/characters/${character.id}`)
                }

                else {
                    addCharacter(data)}
                }
                )}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={editMode ? {shrink: true} : ''}  
                    required
                    fullWidth
                    id="name"
                    label="Name:"
                    name="name"
                    autoFocus
                    inputRef={register}

                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    InputLabelProps={editMode ? {shrink: true} : ''}  
                    id="alias"
                    label="Alias (if any):"
                    name="alias"
                    autoFocus
                    inputRef={register}

                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    InputLabelProps={editMode ? {shrink: true} : ''}  
                    defaultValue={""}
                    id="birthday"
                    label="Born On:"
                    name="born_on"
                    autoFocus
                    inputRef={register}

                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="deathday"
                    InputLabelProps={editMode ? {shrink: true} : ''}  
                    label="Date of Death (Not Required):"
                    name="died_on"
                    autoFocus
                    inputRef={register}

                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    InputLabelProps={editMode ? {shrink: true} : ''}  
                    fullWidth
                    id="age"
                    label="Age in Story (Approximation is Okay!):"
                    name="age"
                    autoFocus
                    inputRef={register}

                />


                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    InputLabelProps={editMode ? {shrink: true} : ''}  
                    fullWidth
                    id="bio"
                    label="Bio:"
                    name="bio"
                    autoFocus
                    inputRef={register}

                />
                {editMode ? 
                <Button type="submit" variant="contained" color="secondary">
                    Submit Edit
                </Button> 
                
                : 
                
                <Button type="submit" variant="contained" color="secondary">
                    Submit
                </Button>}

            </form>

        </Container>
    )
}