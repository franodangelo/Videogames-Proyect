const initialState = {
    videogames: [],
    videogamesCopy: [],
    genres: [],
    videogameDetail: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "GET_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
                videogamesCopy: action.payload
            };
        case "GET_NAME_VIDEOGAME":
            return {
                ...state,
                videogames: action.payload
            };
        case "GET_VIDEOGAME_DETAIL":
            return {
                ...state,
                videogameDetail: action.payload
            };
        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload
            };
        case "FILTER_BY_CREATION":
            let creationFilter;
            if(action.payload === 'all') {
                let noFilter = state.videogames;
                creationFilter = noFilter;
            } else if(action.payload === 'original') {
                let originalFilter = state.videogamesCopy.filter(data => data.id.toString().length < 7)
                creationFilter = originalFilter;
            } else if(action.payload === 'created') {
                let createdFilter = state.videogamesCopy.filter(data => data.id.toString().length > 6)
                creationFilter = createdFilter;
            }
            return {
                ...state,
                videogames: creationFilter
            };
        case "FILTER_BY_GENRE":
            let filterGenre = state.allVideogames.filter(p => { //filtro los videojuegos buscando coincidencia
                                        if(p.genres?.includes(action.payload)) return p  //si el genero es el mismo al del payload me lo trae
                                    })
                                    if(action.payload === "All"){
                                        filterGenre = state.allVideogames
                                    }
                                    return {
                                        ...state,
                                        videogames: filterGenre
                                    };
        case "ORDER_BY_NAME":
            let sortedName = action.payload === 'AZ' ?
            state.videogames.sort((a,b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            }) :
            state.videogames.sort((a,b) => {
                if (a.name > b.name) return -1;
                if(a.name < b.name) return 1;
                return 0;
            })
            return {
                ...state,
                payload: sortedName
            };
        case "ORDER_BY_RATING":
            let sortedRating = action.payload === 'HTL' ?
            state.videogames.sort((a,b) => {
                if (a.rating > b.rating) return -1;
                if (a.rating < b.rating) return 1;
                return 0;
            }) :
            state.videogames.sort((a,b) => {
                if (a.rating > b.rating) return 1;
                if(a.rating < b.rating) return -1;
                return 0;
            })
            return {
                ...state,
                payload: sortedRating
            };
        default: return state;
    }
}