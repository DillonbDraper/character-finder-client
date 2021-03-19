import React, {useState} from "react";
import { FictionContext } from "../fictions/FictionProvider";

export const CharacterContext = React.createContext();

export const CharacterProvider = props => {

	const [characters, setCharacters] = useState([])
	const [filteredCharacters, setFilteredCharacters] = useState([])
	const [character, setCharacter] = useState([])
	const [personalCharacter, setPersonalCharacter ] = useState([])


	const getCharacters = () => {
		return fetch("http://localhost:8000/characters", {
			headers: {
                "Authorization": `Token ${localStorage.getItem("app_user")}`
              }
		})
		.then(res => res.json())
		.then(setCharacters);
	}

	const getUnapprovedCharacters = () => {
		return fetch("http://localhost:8000/characters/unapproved", {
			headers: {
                "Authorization": `Token ${localStorage.getItem("app_user")}`
              }
		})
		.then(res => res.json())
		.then(setCharacters);
	}


	const getCharactersWithParams = (querystring) => {
		return fetch(`http://localhost:8000/characters?${querystring}`, {
			headers: {
                "Authorization": `Token ${localStorage.getItem("app_user")}`
              }
		})
		.then(res => res.json())
		.then(setFilteredCharacters);
	}

	const addCharacter = character => {
		return fetch("http://localhost:8000/characters", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("app_user")}`
			},
			body: JSON.stringify(character)
		})
		.then(getCharacters)
	}

    const getCharacterById = id => {
        return fetch(`http://localhost:8000/characters/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("app_user")}`
              }
        })
            .then(res => res.json())
            .then(setCharacter)
    }

	const deleteCharacter = id => {
		return fetch(`http://localhost:8000/characters/${id}`, {
			method: "DELETE",
			headers: {
                "Authorization": `Token ${localStorage.getItem("app_user")}`
              }
		})
		.then(getCharacters)
	}

	const updateCharacter = (character) => {
		return fetch(`http://localhost:8000/characters/${character.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("app_user")}`
			},
			body: JSON.stringify(character)
		})
		.then(getCharacters)
	}

	const makeEditRequest = (id, data) => {
		return fetch(`http://localhost:8000/characters/${id}/edit_request`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("app_user")}`
			},
			body: JSON.stringify(data)
		})
	}

	const checkForMatch = (id) => {
		return fetch(`http://localhost:8000/characters/${id}/check_for_match`, {
			headers: {
				"Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("app_user")}`
			},
			
		}).then(res=> res.json())
		.then(setPersonalCharacter)
	}

	const approveCharacterEdit = (id, character) => {
		return fetch(`http://localhost:8000/characters/${id}/decide_edit`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("app_user")}`
			},
			body: JSON.stringify(character)
		})
	}

	const rejectCharacterEdit = (id, character) => {
		return fetch(`http://localhost:8000/characters/${id}/decide_edit`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("app_user")}`
			},
			body: JSON.stringify(character)
		})
	}




	return <CharacterContext.Provider value = {{
        characters, setCharacters, character, deleteCharacter, updateCharacter, addCharacter, setCharacter, getCharacters, getCharacterById, getCharactersWithParams,
		filteredCharacters, setFilteredCharacters, makeEditRequest, setPersonalCharacter, checkForMatch, personalCharacter, approveCharacterEdit, rejectCharacterEdit,
		getUnapprovedCharacters
}}>
		{props.children}
	</CharacterContext.Provider>
}