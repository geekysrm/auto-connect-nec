import axios from "axios";

const URL = process.env["BACKEND_URI"];

import { AsyncStorage } from "react-native";

export const fetchUserDetails = () => {
  return dispatch => {
    AsyncStorage.getItem("token").then(token => {
      axios({
        url: `${URL}details`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          dispatch({
            type: "FETCH_USER_DETAILS",
            payload: res.data
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };
};
