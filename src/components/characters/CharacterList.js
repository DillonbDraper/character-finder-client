import React, { useContext, useEffect, useState } from "react"
import { CharacterContext } from "./CharacterProvider.js"
import { useParams, useHistory } from "react-router-dom"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';



export const CharacterList = () => {
  const { characters, filteredCharacters, getCharacters, getCharactersWithParams } = useContext(CharacterContext)
  const [characterValue, setCharacterValue] = useState(null)
  const [inputValue, setInputValue] = React.useState('')

  const params = useParams()
  const history = useHistory()

  useEffect(() => {
    getCharacters()
  }, [])

  useEffect(() => {
  }, [filteredCharacters])


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

  function createData(name, alias, appearsIn, createdBy, series = null) {
    return { name, alias, appearsIn, createdBy, series };
  }


  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const classes = useStyles();

  return (
    <>
      <Container maxWidth="xl" style={{ backgroundColor: '#cfe8fc', height: '10vh' }}>
        <Autocomplete
          id="positions"
          options={characters}
          getOptionLabel={(char) => {
            if (!char.name || char === {}) {
              return ""
            } else {
              return char.name
            }
          }
          }
          getOptionSelected={(character, characterValue) => character === characterValue}
          style={{
            width: 300,
          }}
          value={characterValue}
          onChange={(event, newValue) => {
            setCharacterValue(newValue);
          }}

          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => <TextField {...params} label="Position" variant="outlined" />}
        />

        <Button onClick={() => {
          const nameQueryStarter = "?name="
          const fullNameQuery = nameQueryStarter + characterValue.name
          getCharactersWithParams(fullNameQuery)
        }}>Search</Button>

      </Container>
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
            {filteredCharacters.length < 1 ? characters.map((character) => (
              <StyledTableRow key={character.id}>
                <StyledTableCell component="th" scope="row">
                  {character.name}
                </StyledTableCell>
                <StyledTableCell align="right">{character.alias}</StyledTableCell>
                <StyledTableCell align="right">{character.works[0] ? character.works[0].title : "NA"}</StyledTableCell>
                <StyledTableCell align="right">{character.creators[0] ? character.creators[0].name : "NA"}</StyledTableCell>
                <StyledTableCell align="right">{character.series[0] ? character.series[0].title : "NA"}</StyledTableCell>
              </StyledTableRow>
            )) : filteredCharacters.map((character) => (
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