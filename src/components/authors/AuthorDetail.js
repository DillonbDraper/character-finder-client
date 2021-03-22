import React, { useContext, useEffect, useState } from "react"
import { AuthorContext } from "./AuthorProvider.js"
import { useParams, useHistory, Link } from "react-router-dom"
import { Button } from "@material-ui/core"
import { Typography } from '@material-ui/core'
import { Container } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';


export const AuthorDetail = () => {

    const params = useParams()
    const history = useHistory()

    const { author, getAuthorById, deleteAuthor } = useContext(AuthorContext)

    const [open, setOpen] = useState(false);


    useEffect(() => {
        getAuthorById(params.authorId)
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteConfirm = () => {
        deleteAuthor(author.id)
        setOpen(false)
        history.push('/')
    }

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);


    const useStyles = makeStyles({
        table: {
            minWidth: 700,
        },
    });

    const classes = useStyles();


    return (
        <>
            <Container style={{ backgroundColor: '#cfe8fc', height: '94vh', maxWidth: '100%' }}>
                <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <h1>{author.name}</h1>
                    <Typography>Born on: {author.born_on}</Typography>
                    <Typography>Died on: {author.died_on ? author.died_on : "NA"}</Typography>
                    <Typography style={{ alignSelf: 'flex-start' }}>Bio: {author.bio} </Typography>



                </Container>
                {(localStorage.getItem("isAdmin") === 'true') ?
                    <Button style={{ alignSelf: 'flex-start', marginTop: '1%' }} color="primary" variant="contained" onClick={handleClickOpen}
                    >Delete Author</Button>
                    :
                    ''}

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='left'>Characters</StyledTableCell>
                                <StyledTableCell align='left'>Books</StyledTableCell>
                                <StyledTableCell align='left'>Series</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                {author.characters ? author.characters.map((character) => (
                                    <StyledTableCell component="th" scope="row">
                                        <Link to={`/characters/${character.id}`}>{`${character.name}`}</Link>
                                    </StyledTableCell>
                                ))
                                  :  
                                    (
                                        <StyledTableCell component="th" scope="row">
                                            ""
                                        </StyledTableCell>
                                    )
                                }

                                {author.works ? author.works.map((fiction) => (
                                    <StyledTableCell component="th" scope="row">
                                        <Link to={`/characters/${fiction.id}`}>{`${fiction.title}`}</Link>
                                    </StyledTableCell>
                                ))
                                  :  
                                    (
                                        <StyledTableCell component="th" scope="row">
                                        </StyledTableCell>
                                    )
                                }

                                {author.series ? author.series.map((series) => (
                                    <StyledTableCell component="th" scope="row">
                                        <Link to={`/characters/${series.id}`}>{`${series.title}`}</Link>
                                    </StyledTableCell>
                                ))
                                  :  
                                    (
                                        <StyledTableCell component="th" scope="row">
                                            ""
                                        </StyledTableCell>
                                    )
                                }
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Permanently delete Author?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action will permanently delete this author from the database for all users.  Are you sure you want to do this?
              </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Go back
              </Button>
                    <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
                        Confirm Delete
              </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}