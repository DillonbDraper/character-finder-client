import React, { useContext, useEffect, useState } from 'react'
import { CharacterContext } from "./CharacterProvider"
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core'
import { Button } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom'
import { Input } from '@material-ui/core';


export const CharacterForm = props => {

    const { register, handleSubmit, setValue } = useForm()
    const { addCharacter, getCharacterById, character, makeEditRequest, updateCharacter } = useContext(CharacterContext)
    const params = useParams()
    const history = useHistory()

    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        if (params.characterId) {
            getCharacterById(params.characterId).then(() => setEditMode(true))
        }
    }, [])

    useEffect(() => {
        setValue('name', character.name)
        setValue('age', character.age)
        setValue('born_on', character.born_on)
        setValue('died_on', character.died_on)
        setValue('alias', character.alias)
        setValue('bio', character.bio)

    }, [editMode, character])

    return (
        <Container maxWidth="xl" style={{ backgroundColor: '#cfe8fc', height: '94vh', display: 'flex' }}>
            <form className="characterForm" onSubmit={handleSubmit((data) => {

                if (editMode) {

                    if (character.public_version === false) {
                        let updatedCharacter = { ...data }
                        updatedCharacter.public_version = false
                        updatedCharacter.id = character.id
                        updatedCharacter.reader_id = character.reader.id
                        updatedCharacter.reset_queue = true
                        updateCharacter(updatedCharacter)
                        history.push(`/`)

                    }
                    else {
                        const formData = new FormData()
                        formData.append('name', data.name)
                        formData.append('image', data.image[0])
                        formData.append('bio', data.bio)
                        formData.append('age', data.age)
                        formData.append('alias', data.alias)
                        formData.append('died_on', data.died_on)
                        formData.append('born_on', data.born_on)
                        makeEditRequest(params.characterId, formData)
                        setEditMode(false)
                        history.push(`/characters/${character.id}`)
                    }
                }

                else {
                    const formData = new FormData()
                    formData.append('name', data.name)
                    formData.append('image', data.image[0])
                    formData.append('bio', data.bio)
                    formData.append('age', data.age)
                    formData.append('alias', data.alias)
                    formData.append('died_on', data.died_on)
                    formData.append('born_on', data.born_on)
                    console.log(data.image)


                    addCharacter(formData)
                    history.push(`/`)
                }
            }
            )}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={editMode ? { shrink: true } : {}}
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
                    InputLabelProps={editMode ? { shrink: true } : {}}
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
                    InputLabelProps={editMode ? { shrink: true } : {}}
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
                    InputLabelProps={editMode ? { shrink: true } : {}}
                    label="Date of Death (Not Required):"
                    name="died_on"
                    autoFocus
                    inputRef={register}

                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    InputLabelProps={editMode ? { shrink: true } : {}}
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
                    InputLabelProps={editMode ? { shrink: true } : {}}
                    fullWidth
                    id="bio"
                    label="Bio:"
                    name="bio"
                    autoFocus
                    multiline
                    rows={4}
                    rowsMax={Infinity}
                    inputRef={register}

                />

                <Button
                    variant="contained"
                    component="label"
                >
                    Upload Photo?
                <input
                        type="file"
                        name="image"
                        hidden
                        ref={register}
                    />
                </Button>
                {editMode ?
                    <Button type="submit" variant="contained" color="secondary">
                        {character.public_version === false ? 'Resubmit Edit' : 'Submit Edit'}
                    </Button>

                    :

                    <Button type="submit" variant="contained" color="secondary">
                        Submit
                </Button>}

            </form>

        </Container>
    )
}