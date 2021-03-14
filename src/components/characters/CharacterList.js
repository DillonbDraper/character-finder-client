import React, { useContext, useEffect, useState } from "react"
import { CharacterContext } from "./CharacterProvider.js"
import { useParams } from "react-router-dom"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export const CharacterList = () => {
    const { characters, getCharacters } = useContext(CharacterContext)
    const params = useParams()

    useEffect(() => {
        getCharacters()
    }, [])

    useEffect(() => {
        getCharacters()
    }, [params])

    const handleChange = e => {
    }

    const handleSubmit = e => {
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

function createData(name, alias, appearsIn, createdBy, series=null) {
  return { name, alias, appearsIn, createdBy, series };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

  const classes = useStyles();

  return (
      <>
      <h1>Hello</h1>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Alias(es)</StyledTableCell>
            <StyledTableCell align="right">Appears In</StyledTableCell>
            <StyledTableCell align="right">Created By</StyledTableCell>
            <StyledTableCell align="right">Series</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {characters.map((character) => (
            <StyledTableRow key={character.id}>
              <StyledTableCell component="th" scope="row">
                {character.name}
              </StyledTableCell>
              <StyledTableCell align="right">{character.alias}</StyledTableCell>
              <StyledTableCell align="right">{character.works[0] ? character.works[0].title : "NA"}</StyledTableCell>
              <StyledTableCell align="right">{character.creators[0] ? character.creators[0].name : "NA"}</StyledTableCell>
              <StyledTableCell align="right">{character.series[0] ? character.series[0].title : "NA"}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}