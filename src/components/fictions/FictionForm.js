import React, { useContext, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { Autocomplete } from '@material-ui/lab';
import { FictionContext } from './FictionProvider';
import { GenreContext } from '../genres/GenreProvider'
import { AuthorContext } from '../authors/AuthorProvider'



export const FictionForm = props => {

    const { register, handleSubmit, control } = useForm()

    const { addFiction, addFictionAssociations } = useContext(FictionContext)
    const { genres, getGenres } = useContext(GenreContext)
    const { authors, getAuthors } = useContext(AuthorContext)



    useEffect(() => getAuthors().then(getGenres), [])

    return (
        <Container maxWidth="xl" style={{ backgroundColor: '#cfe8fc', height: '75vh', display: 'flex' }}>
            <form className="characterForm" onSubmit={handleSubmit((data) => {

                const secondObj = {author: data.author}
                addFiction(data).then(res=> addFictionAssociations(res.id, secondObj))
            }
                )}>
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
                    required
                    fullWidth
                    id="date_published"
                    label="Date Published:"
                    name="date_published"
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
                            required={true}
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

                <Controller
                    render={(props) => (
                        <Autocomplete
                            {...props}
                            options={authors}
                            required={false}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Author"
                                    variant="outlined"
                                />
                            )}
                            onChange={(_, data) => props.onChange(data)}
                        />
                    )}
                    name="author"
                    control={control}
                />

                <Button type="submit" variant="contained" color="secondary">
                    Submit
                </Button>

            </form>

        </Container>
    )
}