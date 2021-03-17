import React, {useState} from "react";

export const GenreContext = React.createContext();

export const GenreProvider = props => {

	const [genres, setGenres] = useState({results: []})


	const getGenres = () => {
		return fetch("http://localhost:8000/genres", {
			headers: {
                "Authorization": `Token ${localStorage.getItem("app_user")}`
              }
		})
		.then(res => res.json())
		.then(setGenres);
	}


	return <GenreContext.Provider value = {{
        genres, setGenres, getGenres
}}>
		{props.children}
	</GenreContext.Provider>
}