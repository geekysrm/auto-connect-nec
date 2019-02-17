import axios from "axios";

const URL = process.env["BACKEND_URI"];

import { AsyncStorage } from "react-native";

export const loginUser = (name, email, profilePic, type) => {
  return dispatch => {
    axios({
      url: `${URL}login/user`,
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        name,
        email,
        profilePic
      }
    })
      .then(res => {
        AsyncStorage.setItem("token", res.data.token).then(x => {
          AsyncStorage.setItem("expiresIn", res.data.expiresIn.toString()).then(
            y => {
              dispatch({
                type: "USER_LOGIN",
                payload: {
                  name,
                  email,
                  profilePic,
                  type
                }
              });
            }
          );
        });
      })
      .catch(err => {
        console.log("error", err);
      });
  };
};

export const loginDriver = (name, email, profilePic, type) => {
  return dispatch => {
    axios({
      url: `${URL}login/driver`,
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        name,
        email,
        profilePic
      }
    })
      .then(res => {
        AsyncStorage.setItem("token", res.data.token).then(x => {
          AsyncStorage.setItem("expiresIn", res.data.expiresIn.toString()).then(
            y => {
              dispatch({
                type: "DRIVER_LOGIN",
                payload: {
                  name,
                  email,
                  profilePic,
                  type
                }
              });
            }
          );
        });
      })
      .catch(err => {
        console.log("error", err);
      });
  };
};
