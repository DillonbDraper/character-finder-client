import React, {useState} from "react";

export const FictionContext = React.createContext();

export const FictionProvider = props => {

	const [fictions, setFictions] = useState([])
	const [fiction, setFiction] = useState({creators: [{name: ""}], series: {}, genre: {}})


	const getFictions = () => {
		return fetch("http://localhost:8000/fictions", {
			headers: {
                "Authorization": `Token ${localStorage.getItem("app_user")}`
              }
		})
		.then(res => res.json())
		.then(setFictions);
	}

	const addFiction = fiction => {
		return fetch("http://localhost:8000/fictions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("app_user")}`
			},
			body: JSON.stringify(fiction)
		}).then(res => res.json())
	}


	const addFictionAssociations = (pk, data) => {
		return fetch(`http://localhost:8000/fictions/${pk}/author_relate`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("app_user")}`
			},
			body: JSON.stringify(data)
		})
	}


    const getFictionById = id => {
        return fetch (`http://localhost:8000/fictions/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("app_user")}`
              }
        })
            .then(res => res.json())
            .then(setFiction)
    }

	const deleteFiction = id => {
		return fetch(`http://localhost:8000/fictions/${id}`, {
			method: "DELETE",
			headers: {
                "Authorization": `Token ${localStorage.getItem("app_user")}`
              }
		})
		.then(getFictions)
	}

	const updateFiction = (fiction) => {
		return fetch(`http://localhost:8000/fictions/${fiction.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("app_user")}`
			},
			body: JSON.stringify(fiction)
		})
		.then(getFictions)
	}

	return <FictionContext.Provider value = {{
        fictions, setFictions, fiction, deleteFiction, updateFiction, addFiction, setFiction,  getFictionById, getFictions, addFictionAssociations
}}>
		{props.children}
	</FictionContext.Provider>
}