import React, { useContext, useEffect, useState } from "react"
import { CharacterContext } from "../characters/CharacterProvider.js"
import { FictionContext } from "../fictions/FictionProvider.js"
import { AuthorContext } from "../authors/AuthorProvider.js"
import { SeriesContext } from "../series/SeriesProvider.js"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
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

export const EditQueue = () => {
    const { characters, filteredCharacters, setFilteredCharacters, getUnapprovedCharacters, getUnapprovedCharactersWithParams } = useContext(CharacterContext)
    const { getFictions, fictions } = useContext(FictionContext)
    const { getSeries, seriesSet } = useContext(SeriesContext)
    const { getAuthors, authors } = useContext(AuthorContext)
  
    const history = useHistory()
  
    const [characterValue, setCharacterValue] = useState(null)
    const [characterInputValue, setCharacterInputValue] = useState('')
  
    const [fictionValue, setFictionValue] = useState(null)
    const [fictionInputValue, setFictionInputValue] = useState('')
  
    const [authorValue, setAuthorValue] = useState(null)
    const [authorInputValue, setAuthorInputValue] = useState('')
  
    const [seriesValue, setSeriesValue] = useState(null)
    const [seriesInputValue, setSeriesInputValue] = useState('')
  
  
    useEffect(() => {
      getAuthors().then(getFictions).then(getSeries).then(getUnapprovedCharacters)
    }, [])
  
    useEffect(() => {
      setFilteredCharacters([...characters])
    }, [characters])
  
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
  
  
    const useStyles = makeStyles({
      table: {
        minWidth: 700,
      },
    });
  
    const classes = useStyles();
  
    return (
      <>
        <Container maxWidth="xl" style={{ backgroundColor: '#cfe8fc', height: '10vh', display: 'flex', justifyContent: "space-evenly", alignItems: 'center' }}>
          <Autocomplete
            id="characters"
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
  
            inputValue={characterInputValue}
            onInputChange={(event, newInputValue) => {
              setCharacterInputValue(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label="Character" variant="outlined" />}
          />
  
          <Autocomplete
            id="fictions"
            options={fictions}
            getOptionLabel={(fict) => {
              if (!fict.title || fict === {}) {
                return ""
              } else {
                return fict.title
              }
            }
            }
            getOptionSelected={(fiction, fictionValue) => fiction === fictionValue}
            style={{
              width: 300,
            }}
            value={fictionValue}
            onChange={(event, newValue) => {
              setFictionValue(newValue);
            }}
  
            inputValue={fictionInputValue}
            onInputChange={(event, newInputValue) => {
              setFictionInputValue(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label="Book" variant="outlined" />}
          />
  
          <Autocomplete
            id="authors"
            options={authors}
            getOptionLabel={(auth) => {
              if (!auth.name || auth === {}) {
                return ""
              } else {
                return auth.name
              }
            }
            }
            getOptionSelected={(author, authorValue) => author === authorValue}
            style={{
              width: 300,
            }}
            value={authorValue}
            onChange={(event, newValue) => {
              setAuthorValue(newValue);
            }}
  
            inputValue={authorInputValue}
            onInputChange={(event, newInputValue) => {
              setAuthorInputValue(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label="Author" variant="outlined" />}
          />
  
          <Autocomplete
            id="series"
            options={seriesSet}
            getOptionLabel={(ser) => {
              if (!ser.title || ser === {}) {
                return ""
              } else {
                return ser.title
              }
            }
            }
            getOptionSelected={(series, seriesValue) => series === seriesValue}
            style={{
              width: 300,
            }}
            value={seriesValue}
            onChange={(event, newValue) => {
              setSeriesValue(newValue);
            }}
  
            inputValue={seriesInputValue}
            onInputChange={(event, newInputValue) => {
              setSeriesInputValue(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label="Series" variant="outlined" />}
          />
  
          <Button variant="contained" color="primary" onClick={() => {
            let queryBuilder = ""
            if (characterValue !== null) {
              queryBuilder+= `name=${characterValue.name}&`
            }
  
  
            if (authorValue !== null) {
              queryBuilder+= `author=${authorValue.id}&`
            }
  
            if (fictionValue !== null) {
              queryBuilder+= `fiction=${fictionValue.id}&`
            }
  
            if (seriesValue !== null) {
              queryBuilder+= `series=${seriesValue.id}`
            }
  
  
            getUnapprovedCharactersWithParams(queryBuilder)
  
          }}>Search</Button>
  
        </Container>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Added by</StyledTableCell>
                <StyledTableCell align="right">Appears In</StyledTableCell>
                <StyledTableCell align="right">Created By</StyledTableCell>
                <StyledTableCell align="right">Series</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCharacters.map((character) => (
                <StyledTableRow key={character.id}>
                  <StyledTableCell component="th" scope="row" onClick={()=> history.push(`/admin-eval/${character.id}`)}>
                    {character.name}
                  </StyledTableCell>
                  <StyledTableCell align="right" >{character.reader ? character.reader.name : "waiting for data"}</StyledTableCell>
                  <StyledTableCell align="right">
                    {character.works[0] ? character.works[0].title : "NA"}
                    </StyledTableCell>
                  <StyledTableCell align="right">
                    
                    {character.creators[0] ? character.creators[0].name : "NA"}
                    </StyledTableCell>
  
                  <StyledTableCell align="right">
            
                    {character.series[0] ? character.series[0].title : "NA"}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }