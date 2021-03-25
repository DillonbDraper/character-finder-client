import React, { useContext, useEffect, useState } from 'react'
import { CharacterContext } from "./CharacterProvider"
import { useForm, Controller } from 'react-hook-form'
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core'
import { Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab'
import { useParams, useHistory } from 'react-router-dom'
import { FictionContext } from '../fictions/FictionProvider'
import { SeriesContext } from '../series/SeriesProvider'


export const CharacterForm = props => {

    const { register, handleSubmit, setValue, control } = useForm()
    const { addCharacter, getCharacterById, character, makeEditRequest, updateCharacter, addCharacterAssociations } = useContext(CharacterContext)
    const { getFictions, fictions } = useContext(FictionContext)
    const { getSeries, seriesSet } = useContext(SeriesContext)
    const params = useParams()
    const history = useHistory()

    const [editMode, setEditMode] = useState(false)


    useEffect(() => {
        getFictions().then(getSeries)
        if (params.characterId) {
            getCharacterById(params.characterId).then(() => setEditMode(true))
        }

    }, [])

    useEffect(() => {
    }, [])

    useEffect(() => {
        if (editMode) {
            setValue('name', character.name)
            setValue('age', character.age)
            setValue('born_on', character.born_on)
            setValue('died_on', character.died_on)
            setValue('alias', character.alias)
            setValue('bio', character.bio)
        }

    }, [editMode])

    return (
        <Container maxWidth="xl" style={{ backgroundColor: '#cfe8fc', height: '94vh', display: 'flex' }}>
            <form className="characterForm" onSubmit={handleSubmit((data) => {
                let relationshipObject = {}
                if (data.fictions || data.series) {
                    if (data.fictions) {
                        relationshipObject.fictions = data.fictions
                    }
                    if (data.series) {
                        relationshipObject.series = data.series
                    }

                }
                if (editMode) {


                    if (character.public_version === false) {
                        const formData = new FormData()
                        formData.append('name', data.name)
                        formData.append('image', data.image[0])
                        formData.append('bio', data.bio)
                        formData.append('age', data.age)
                        formData.append('alias', data.alias)
                        formData.append('died_on', data.died_on)
                        formData.append('born_on', data.born_on)
                        formData.append('public_version', false)
                        formData.append('id', character.id)
                        formData.append('reader_id', character.reader.id)
                        formData.append('reset_queue', true)
                        updateCharacter(character.id, formData).then(() => addCharacterAssociations(character.id, relationshipObject))
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
                        makeEditRequest(params.characterId, formData).then(res => addCharacterAssociations(res.id, relationshipObject))
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


                    addCharacter(formData).then(res => {
                        addCharacterAssociations(res.id, relationshipObject)
                    })
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



                <Controller
                    render={(props) => (
                        <Autocomplete
                            {...props}
                            options={fictions}
                            style={{ marginTop: '1%', marginBottom: '1%' }}
                            multiple={true}
                            required
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Fiction(s)"
                                    variant="outlined"
                                />
                            )}
                            onChange={(_, data) => props.onChange(data)}
                        />
                    )}
                    name="fictions"
                    control={control}
                />

                <Controller
                    render={(props) => (
                        <Autocomplete
                            {...props}
                            options={seriesSet}
                            style={{ marginTop: '1%', marginBottom: '1%' }}
                            required={false}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Series"
                                    variant="outlined"
                                />
                            )}
                        onChange={(_, data) => props.onChange(data)}
                        />
                    )}
                    name="series"
                    control={control}
                />
                <div className="charFormButtons" style={{display: 'flex', flexDirection: 'column', maxWidth: '13%'}}>
                <Button
                    variant="contained"
                    color="primary"
                    component="label"
                    style={{marginBottom: '10%'}}
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
                </div>
            </form>

        </Container>
    )
}