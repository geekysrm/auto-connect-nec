import axios from "axios";

const URL = process.env["BACKEND_URI"];

import { AsyncStorage } from "react-native";

export const fetchPlaces = () => {

    return dispatch => {

        AsyncStorage.getItem("token")
            .then( token => {
                axios({
                    url: `${URL}location`,
                    method:'get',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then( res => {

                    dispatch({
                        type: "FETCH_PLACES",
                        payload: res.data.locations
                    })
                })
                .catch( err => {
                    console.log(err);
                });
            })
    }
}
