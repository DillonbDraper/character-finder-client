import React, {useState} from "react";

export const SeriesContext = React.createContext();

export const SeriesProvider = props => {

	const [seriesSet, setSeriesSet] = useState([])
	const [series, setSeries] = useState([])


	const getSeries = () => {
		return fetch("http://localhost:8000/series", {
			headers: {
                "Authorization": `Token ${localStorage.getItem("app_user")}`
              }
		})
		.then(res => res.json())
		.then(setSeriesSet);
	}

	const addSeries = series => {
		return fetch("http://localhost:8000/series", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("app_user")}`
			},
			body: JSON.stringify(series)
		})
		.then(getSeries)
	}

    const getSeriesById = id => {
        return fetch (`http://localhost:8000/series/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("app_user")}`
              }
        })
            .then(res => res.json())
            .then(setSeries)
    }

	const deleteSeries = id => {
		return fetch(`http://localhost:8000/series/${id}`, {
			method: "DELETE",
			headers: {
                "Authorization": `Token ${localStorage.getItem("app_user")}`
              }
		})
		.then(getSeries)
	}

	const updateSeries = (series) => {
		return fetch(`http://localhost:8000/seriess/${series.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("app_user")}`
			},
			body: JSON.stringify(series)
		})
		.then(getSeries)
	}

	return <SeriesContext.Provider value = {{
        series, setSeries, seriesSet, deleteSeries, updateSeries, addSeries, setSeriesSet,  getSeriesById
}}>
		{props.children}
	</SeriesContext.Provider>
}