import React, { useState } from "react";
import { FictionContext } from "../fictions/FictionProvider";

export const CharacterContext = React.createContext();

export const CharacterProvider = props => {

	const [characters, setCharacters] = useState([{ id: 0, reader: { name: '' }, works: [], creators: [], series: {} }])
	const [filteredCharacters, setFilteredCharacters] = useState([])
	const [character, setCharacter] = useState({})
	const [secondCharacter, setSecondCharacter] = useState({ id: 0, reader: { name: '' }, works: [], creators: [], series: [], associations: [] })


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

	const getUnapprovedCharactersWithParams = params => {
		return fetch(`http://localhost:8000/characters/unapproved?${params}`, {
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
				"Authorization": `Token ${localStorage.getItem("app_user")}`
			},
			body: character
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

	const updateCharacter = (id, data) => {
		return fetch(`http://localhost:8000/characters/${id}`, {
			method: "PUT",
			headers: {
				"Authorization": `Token ${localStorage.getItem("app_user")}`
			},
			body: data
		})
			.then(getCharacters)
	}

	const makeEditRequest = (id, data) => {
		return fetch(`http://localhost:8000/characters/${id}/edit_request`, {
			method: "POST",
			headers: {
				"Authorization": `Token ${localStorage.getItem("app_user")}`
			},
			body: data
		})
	}

	const checkForMatch = id => {
		return fetch(`http://localhost:8000/characters/${id}/check_for_match`, {
			headers: {
				"Authorization": `Token ${localStorage.getItem("app_user")}`
			}
		})
			.then(res => {
				if (res.status === 200) {
					const response = res.json()
					return response
				}
				else {
					return { id: 0, reader: { name: '' }, works: [], creators: [], series: [], associations: [] }
				}
			})
			.then(setSecondCharacter)
	}

	const checkForMatchOriginal = id => {
		return fetch(`http://localhost:8000/characters/${id}/check_for_match_original`, {
			headers: {
				"Authorization": `Token ${localStorage.getItem("app_user")}`
			}
		})
			.then(res => {
				if (res.status === 200) {
					const response = res.json()
					return response
				}
				else {
					return { id: 0, reader: { name: '' }, works: [], creators: [], series: [], associations: [] }
				}
			})
			.then(res => {
				setSecondCharacter(res)
			})
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
			.then(setCharacter)
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
			.then(setCharacter)
	}

	const destroyAllPersonalVersions = id => {
		return fetch(`http://localhost:8000/characters/${id}/destroy_all_personal_versions`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Token ${localStorage.getItem("app_user")}`
			}
		})
	}





	return <CharacterContext.Provider value={{
		characters, setCharacters, character, deleteCharacter, updateCharacter, addCharacter, setCharacter, getCharacters, getCharacterById, getCharactersWithParams,
		filteredCharacters, setFilteredCharacters, makeEditRequest, setSecondCharacter, checkForMatch, secondCharacter, approveCharacterEdit, rejectCharacterEdit, checkForMatchOriginal,
		getUnapprovedCharacters, getUnapprovedCharactersWithParams, destroyAllPersonalVersions
	}}>
		{props.children}
	</CharacterContext.Provider>
}