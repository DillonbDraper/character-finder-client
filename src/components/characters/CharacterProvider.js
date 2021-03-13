import React, {useState} from "react";

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

    const getAuthorbyId = id => {
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
		return fetch(`http://localhost:8000/characters/${author.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("app_user")}`
			},
			body: JSON.stringify(character)
		})
		.then(getCharacters)
	}

	return <CategoryContext.Provider value = {{
        characters, setCharacters, character, deleteCharacter, updateCharacter, addCharacter, setCharacter,  getAuthorbyId
}}>
		{props.children}
	</CategoryContext.Provider>
}