import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { FictionContext } from './FictionProvider';


export const FictionForm = props => {

    const { register, handleSubmit } = useForm()
    const { addFiction } = useContext(FictionContext)

    return (
        <Container maxWidth="xl" style={{ backgroundColor: '#cfe8fc', height: '75vh', display: 'flex' }}>
            <form className="characterForm" onSubmit={handleSubmit((data) => addFiction(data))}>
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


                
                
                <Button type="submit" variant="contained" color="secondary">
                    Submit
                </Button>

            </form>

        </Container>
    )
}