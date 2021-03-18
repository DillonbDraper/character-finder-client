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
            <Typography>If you are here, you may have an interest in adding entries to our site.  While we are working on making our database flexible enough to handle adding items in any order,
            For now we must insist that you add new entries to the database in <b>top down</b> manner.  If you would like to add a book to the database, you must first add (if necessary) its corresponding
            series (if applicable) and then author first.  Likewise, if you would like to add a character, you must add at least one work that they appear in first.


        </Typography>
            <Button variant="contained" color="primary" onClick={() => history.push('/series-form')}>
                Add Series
             </Button>

            <Button variant="contained" color="secondary" onClick={() => history.push('/author-form')}>
                Add Author
            </Button>

            <PurpleColorButton variant="contained" color="primary" onClick={() => history.push('/book-form')}>
                Add Book
            </PurpleColorButton>

            <GreenColorButton variant="contained" color="primary" onClick={() => history.push('/character-form')}>
                Add Character
            </GreenColorButton>


        </>
    )
}