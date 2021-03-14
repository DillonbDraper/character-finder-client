import React, {useState} from "react";
import { FictionContext } from "../fictions/FictionProvider";

export const CharacterContext = React.createContext();

export const CharacterProvider = props => {

	const [characters, setCharacters] = useState([])
	const [character, setCharacter] = useState([])


	const getCharacters = () => {
		return fetch("http://localhost:8000/characters", {
			headers: {
                "Authorization": `Token ${localStorage.getItem("app_user")}`
              }
		})
		.then(res => res.json())
		.then(setCharacters);
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

	return <CharacterContext.Provider value = {{
        characters, setCharacters, character, deleteCharacter, updateCharacter, addCharacter, setCharacter, getCharacters, getCharacterById
}}>
		{props.children}
	</CharacterContext.Provider>
}