import {
    GET_VIDEOGAMES,
    GET_NAME_VIDEOGAME,
    GET_VIDEOGAME_DETAIL,
    CLEAN_STATE,
    GET_GENRES,
    FILTER_BY_CREATION,
    FILTER_BY_GENRE,
    ORDER_BY_NAME,
    ORDER_BY_RATING,
    DELETE_VIDEOGAME
} from "./constants";

const initialState = {
    videogames: [],
    videogamesCopy: [],
    genres: [],
    videogameDetail: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                videogamesCopy: action.payload
            }
        case GET_NAME_VIDEOGAME:
            return {
                ...state,
                videogames: action.payload
            }
        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogameDetail: action.payload
            }
        case CLEAN_STATE:
            return {
                ...state,
                videogameDetail: action.payload
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case FILTER_BY_CREATION:
            let videogamesToFilterByCreation;
            if (action.payload === "original") {
                let filterByOriginal = state.videogamesCopy.filter(c => c.id.toString().length < 7)
                videogamesToFilterByCreation = filterByOriginal;
            }
            if (action.payload === "created") {
                let filterByCreated = state.videogamesCopy.filter(c => c.id.toString().length > 7)
                videogamesToFilterByCreation = filterByCreated;
            }
            if (action.payload === "all") {
                let noFilter = state.videogamesCopy;
                videogamesToFilterByCreation = noFilter;
            }
            if (videogamesToFilterByCreation.length === 0) {
                videogamesToFilterByCreation = ["No games created"]
            }
            return {
                ...state,
                videogames: videogamesToFilterByCreation
            }
        case FILTER_BY_GENRE:
            const videogamesToFilterByGenre = state.videogamesCopy;
            const genreFilter = action.payload === "All" ?
                videogamesToFilterByGenre :
                videogamesToFilterByGenre.filter(v => v.genres.includes(action.payload))
            return {
                ...state,
                videogames: genreFilter
            }
        case ORDER_BY_NAME:
            let sortedName = action.payload === "AZ" ?
                state.videogames.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                }) :
                state.videogames.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                })
            return {
                ...state,
                payload: sortedName
            }
        case ORDER_BY_RATING:
            let sortedRating = action.payload === "HTL" ?
                state.videogames.sort((a, b) => {
                    if (a.rating > b.rating) return -1;
                    if (a.rating < b.rating) return 1;
                    return 0;
                }) :
                state.videogames.sort((a, b) => {
                    if (a.rating > b.rating) return 1;
                    if (a.rating < b.rating) return -1;
                    return 0;
                })
            return {
                ...state,
                payload: sortedRating
            }
        case DELETE_VIDEOGAME:
            let withoutDeleted = state.videogamesCopy.filter(g => g.id !== action.payload)
            return {
                ...state,
                videogamesCopy: withoutDeleted
            }
        default:
            return state;
    }
}