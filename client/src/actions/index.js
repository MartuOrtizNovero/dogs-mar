import axios from "axios";


// dispach unicamente reciben los que son GET porque es toda info de la api
// lo que tienen PAYLOAD es por la interaccion con el usuario, de ahi reciben la info de lo que hay que hacer


export function getDogs() {
    return async function (dispach) {
        try {
            let dogs = await axios.get("http://localhost:3001/dogs")
            return dispach({
                type: "GET_DOGS",
                payload: dogs.data
            })
        } catch (error) {
            console.log(error)
        }

    }
};

export function getTemperaments() {
    return async function (dispach) {
        try {
            let temperaments = await axios.get("http://localhost:3001/temperament")
            return dispach({
                type: "GET_TEMPERAMENTS",
                payload: temperaments.data
            })
        } catch (error) {
            console.log(error)
        }

    }
};

export const postDog = ({ name, heightMin, heightMax, weightMin, weightMax, yearsMin, yearsMax, image, temperament }) => {
    return async (dispach) => {
        try {
            await axios.post('http://localhost:3001/dog', {
                name: name,
                height: `${heightMin} - ${heightMax}`,
                weight: `${weightMin} - ${weightMax}`,
                years: `${yearsMin} - ${yearsMax}`,
                image: image,
                temperament: temperament
            });
            return dispach({
                type: 'POST_DOG'
            });

        } catch (error) {
            console.log(error)
        }

    };
};

export function getDetails(id) {
    return async function (dispatch) {
        try {
            return await axios
                .get(`http://localhost:3001/dogs/${id}`)
                .then((result) => {
                    return dispatch({
                        type: 'GET_DETAILS',
                        payload: result.data,
                    });
                });
        } catch (error) {
            console.log(error)
        }

    };
}

export function searchByName(payload) {// name
    return async function (dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/dogs?name=' + payload);
            return dispatch({
                type: 'SEARCH_BY_NAME',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function filterBySource(payload) {
    return {
        type: 'FILTER_BY_SOURCE',
        payload
    }
};

export function filterByTemperament(payload) {
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
};

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
};

export function orderByWeight(payload) {
    return {
        type: "ORDER_BY_WEIGHT",
        payload,
    };
};

export function cleanDetails() {
    return ({
        type: 'CLEAN_DETAILS',
        payload: []
    })
}
