import React from "react"
import { useHistory } from "react-router-dom"
import { createMuiTheme, makeStyles, withStyles, useStyles, ThemeProvider  } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
import { green, purple } from "@material-ui/core/colors"

export const CreationHub = () => {

    const history = useHistory()

    const PurpleColorButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(purple[500]),
            backgroundColor: purple[500],
            '&:hover': {
                backgroundColor: purple[700],
            },
        },
    }))(Button);

    const GreenColorButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(purple[700]),
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
    }))(Button);


    const useStyles = makeStyles((theme) => ({
        margin: {
            margin: theme.spacing(1),
        },
    }));

    

    return (
        <>
            <h2>Welcome to the Creation Hub</h2>
            <Typography>If you are here, you may have an interest in adding entries to our site.  While our database is flexible and can handle adding in any order,
            you will make it easier for yourself and others if you add new entries in a <b>top down</b> manner.  If you would like to add a book to the database, consider adding its corresponding
            series (if applicable) and author first.  Likewise, if you would like to add a character, please consider adding at least one work that they appear in first.


        </Typography>
            <Button variant="contained" color="primary" onClick={history.push('/series-form')}>
                Add Series
             </Button>

            <Button variant="contained" color="secondary" onClick={history.push('/author-form')}>
                Add Author
            </Button>

            <PurpleColorButton variant="contained" color="primary" onClick={history.push('/book-form')}>
                Add Book
            </PurpleColorButton>

            <GreenColorButton variant="contained" color="primary" onClick={history.push('/character-form')}>
                Add Book
            </GreenColorButton>


        </>
    )
}