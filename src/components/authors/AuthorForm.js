import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { AuthorContext } from './AuthorProvider';


export const AuthorForm = props => {

    const { register, handleSubmit } = useForm()
    const { addAuthor } = useContext(AuthorContext)

    const history = useHistory()

    return (
        <Container maxWidth="xl" style={{ backgroundColor: '#cfe8fc', height: '94vh', display: 'flex' }}>
            <form className="characterForm" onSubmit={handleSubmit((data) => {
                console.log(data)

                addAuthor(data)
                history.push('')
                }
                )}>
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
                    id="bio"
                    label="Bio:"
                    name="bio"
                    autoFocus
                    inputRef={register}

                />
                <Button style={{marginTop: '1%'}}type="submit" variant="contained" color="secondary">
                    Create
                </Button>

            </form>

        </Container>
    )
}