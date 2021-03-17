import React, { useContext, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { Autocomplete } from '@material-ui/lab';
import { SeriesContext } from './SeriesProvider';
import { GenreContext } from '../genres/GenreProvider'


export const SeriesForm = props => {

    const { register, handleSubmit, control } = useForm()

    const { addSeries } = useContext(SeriesContext)
    const { genres, getGenres } = useContext(GenreContext)


    useEffect(() => getGenres(), [])

    return (
        <Container maxWidth="xl" style={{ backgroundColor: '#cfe8fc', height: '75vh', display: 'flex' }}>
            <form className="characterForm" onSubmit={handleSubmit((data) => addSeries(data))}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title:"
                    name="title"
                    autoFocus
                    inputRef={register}

                />


                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="description"
                    label="Description:"
                    name="description"
                    autoFocus
                    inputRef={register}

                />
                <Controller
                    render={(props) => (
                        <Autocomplete
                            {...props}
                            options={genres.results}
                            getOptionLabel={(option) => option.name}
                            
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Genre"
                                    variant="outlined"
                                />
                            )}
                            onChange={(_, data) => props.onChange(data)}
                        />
                    )}
                    name="genre"
                    control={control}
                />
                <Button type="submit" variant="contained" color="secondary">
                    Submit
                </Button>

            </form>

        </Container>
    )
}