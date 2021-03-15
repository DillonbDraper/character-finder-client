import React, {useState} from "react";

export const AuthorContext = React.createContext();

export const AuthorProvider = props => {

	const [authors, setAuthors] = useState([])
	const [author, setAuthor] = useState([])


	const getAuthors = () => {
		return fetch("http://localhost:8000/authors", {
			headers: {
                "Authorization": `Token ${localStorage.getItem("app_user")}`
              }
		})
		.then(res => res.json())
		.then(res =>setAuthors(res.results))
		;
	}

	const addAuthor = author => {
		return fetch("http://localhost:8000/authors", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("app_user")}`
			},
			body: JSON.stringify(author)
		})
		.then(getAuthors)
	}

    const getAuthorById = id => {
        return fetch(`http://localhost:8000/authors/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("app_user")}`
              }
        })
            .then(res => res.json())
            .then(setAuthor)
    }

	const deleteAuthor = id => {
		return fetch(`http://localhost:8000/authors/${id}`, {
			method: "DELETE",
			headers: {
                "Authorization": `Token ${localStorage.getItem("app_user")}`
              }
		})
		.then(getAuthors)
	}

	const updateAuthor = (author) => {
		return fetch(`http://localhost:8000/categories/${author.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("app_user")}`
			},
			body: JSON.stringify(author)
		})
		.then(getAuthors)
	}

	return <AuthorContext.Provider value = {{
        authors, setAuthors, deleteAuthor, updateAuthor, addAuthor, setAuthor, author, getAuthorById, getAuthors
}}>
		{props.children}
	</AuthorContext.Provider>
}