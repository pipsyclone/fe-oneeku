import { useState } from "react";
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import ENV from '../env';

const AnimeStreamAPI = () => {

    const { baseURL_API }               = ENV();
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError]             = useState(false);
    const [errorMessage, setErrorMessage]     = useState("");

    // Genre
    const [genreData, setGenreData] = useState([]);
    const genre = async () => {
        await axios.get(baseURL_API + '/genres')
        .then((response) => {
            if (response.data.status === 200) {
                setGenreData(response.data.data)
            }else {
                setError(true)
                setErrorMessage(response.data)
            }
            setLoadingData(false)
        })
        .catch((error) => {
            setError(true)
            setErrorMessage(error.message)
            setLoadingData(false)
        })
    }

    // Popular Anime
    const [popularData, setPopularData] = useState([]);
    const popular = async () => {
        await axios.get(baseURL_API + '/popular')
        .then((response) => {
            if (response.data.status === 200) {
                setPopularData(response.data.data)
            }else {
                setError(true)
                setErrorMessage(response.data)
            }
            setLoadingData(false)
        })
        .catch((error) => {
            setError(true)
            setErrorMessage(error.message)
            setLoadingData(false)
        })
    }

    // New Episodes
    const [newEpisodeData, setNewEpisodeData] = useState([])
    const newEpisode = async () => {
        await axios.get(baseURL_API + '/new-episodes')
        .then((response) => {
            if (response.data.status === 200) {
                setNewEpisodeData(response.data.data)
            }else {
                setError(true)
                setErrorMessage(response.data)
            }
            setLoadingData(false)
        })
        .catch((error) => {
            setError(true)
            setErrorMessage(error.message)
            setLoadingData(false)
        })
    }

    // Anime By Genre
    const [animeByGenreData, setAnimeByGenreData]   = useState([]);
    const animeByGenre = async (genre, page) => {
        await axios.get(baseURL_API + '/anime-by-genre/' + genre + '/' + page)
        .then((response) => {
            if (response.data.status === 200) {
                setAnimeByGenreData(response.data.data)
            }else {
                setError(true)
                setErrorMessage(response.data)
            }
            setLoadingData(false)
        })
        .catch((error) => {
            setError(true)
            setErrorMessage(error.message)
            setLoadingData(false)
        })
    }

    // View Anime
    const [animeData, setAnimeData] = useState([]);
    const anime = async (animeSlug) => {
        await axios.get(baseURL_API + '/view/' + animeSlug)
        .then((response) => {
            if (response.data.status === 200) {
                setAnimeData(response.data.data)
            }else {
                setError(true)
                setErrorMessage(response.data)
            }
            setLoadingData(false)
        })
        .catch((error) => {
            setError(true)
            setErrorMessage(error.message)
            setLoadingData(false)
        })
    }

    // Search Anime
    const [searchResult, setSearchResult] = useState([]);
    const handleSearch = useFormik({
        initialValues: {
            keyword: ''
        },

        validationSchema: Yup.object({
            keyword: Yup.string()
                    .required('Form is required!')
        }),

        onSubmit: (values) => {
            window.location.href = '/search/' + values.keyword;
        }
    })

    const loadSearchResult = async (keyword) => {
        await axios.get(baseURL_API + '/search/' + keyword)
        .then((response) => {
            if (response.data.status === 200) {
                setSearchResult(response.data.data)
            }else {
                setError(true)
                setErrorMessage(response.data)
            }
            setLoadingData(false)
        })
        .catch((error) => {
            setError(true)
            setErrorMessage(error.message)
            setLoadingData(false)
        })
    }

    // Watch Streaming Anime
    const [watchData, setWatchData] = useState([]);
    const watch = async (slugeps) => {
        await axios.get(baseURL_API + '/watch/' + slugeps)
        .then((response) => {
            if (response.data.status === 200) {
                setWatchData(response.data.data)
            }else {
                setError(true)
                setErrorMessage(response.data)
            }
            setLoadingData(false)
        })
        .catch((error) => {
            setError(true)
            setErrorMessage(error.message)
            setLoadingData(false)
        })
    }

    return {
        error, errorMessage, loadingData,
        genre, genreData,
        popular, popularData,
        newEpisode, newEpisodeData,
        animeByGenre, animeByGenreData,
        anime, animeData,
        handleSearch, searchResult, loadSearchResult,
        watch, watchData
    }
}

export default AnimeStreamAPI;