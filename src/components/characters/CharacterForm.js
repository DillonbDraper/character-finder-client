import React from 'react'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core'
import Button from '@material-ui/core/Button';


export const CharacterForm = props => {

    const { register, handleSubmit, watch, errors } = useForm()

    return (
        <Container maxWidth="xl" style={{ backgroundColor: '#cfe8fc', height: '75vh', display: 'flex' }}>
            <form className="characterForm" onSubmit={handleSubmit((data) => console.log(data))}>
                <TextField
                    variant="outlined"
                    margin="normal"
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
                    required
                    fullWidth
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
                    label="Date of Death (Not Required):"
                    name="died_on"
                    autoFocus
                    inputRef={register}

                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
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
                    fullWidth
                    id="bio"
                    label="Bio:"
                    name="bio"
                    autoFocus
                    inputRef={register}

                />
                <Button type="submit" color="primary">
                    Submit
                </Button>

            </form>

        </Container>
    )
}