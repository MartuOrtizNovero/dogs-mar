const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: [],
}


function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            };
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            };
        case 'POST_DOG':
            return {
                ...state,
            };
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            };
        case 'SEARCH_BY_NAME':
            return {
                ...state,
                dogs: action.payload
            };
        case 'CLEAN_DETAILS':
            return {
                ...state,
                detail: action.payload
            };
        case 'ORDER_BY_NAME':
            let sortedArray = action.payload === 'asc' ?
                state.dogs.sort(function (a, b) {//[{}{}{}{}]
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) :
                state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                dogs: sortedArray
            };
        case 'ORDER_BY_WEIGHT':
            let info = state.allDogs;
            let sortedArr = action.payload === "HIGH"
                ? info.sort(function (a, b) {//["3-5"] --> [3, 5]
                    if (
                        Number(a.weight.split("-")[0]) > Number(b.weight.split("-")[0])
                    ) {
                        return 1;
                    }
                    if (
                        Number(b.weight.split("-")[0]) > Number(a.weight.split("-")[0])
                    ) {
                        return -1;
                    }
                    return 0;
                })
                : info.sort(function (a, b) {
                    if (
                        Number(a.weight.split("-")[0]) > Number(b.weight.split("-")[0])
                    ) {
                        return -1;
                    }
                    if (
                        Number(b.weight.split("-")[0]) > Number(a.weight.split("-")[0])
                    ) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                dogs: sortedArr,
            };
        case 'FILTER_BY_SOURCE':
            const allDogs = state.allDogs;
            const filterSource = action.payload === 'Created'
                ? allDogs.filter(el => el.createdInDb)
                : allDogs.filter(el => !el.createdInDb);
            return {
                ...state,
                dogs: action.payload === 'All'
                    ? state.allDogs : filterSource
            };

        case 'FILTER_BY_TEMPERAMENT':
            let todos = state.allDogs;
            let temperamentsFiltered =
                action.payload === "all"
                    ? todos
                    : todos.filter((elem) =>
                        elem.temperament?.includes(action.payload)
                    );
            return {
                ...state,
                dogs: temperamentsFiltered,
            };

        default:
            return state
    }
}

export default reducer;