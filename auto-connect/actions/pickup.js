import axios from "axios";

const URL = process.env["BACKEND_URI"];

import Polyline from "@mapbox/polyline";

const API_KEY = "AIzaSyCvEFK1EMeKuwvshOn8NAS214I2WzrEPgc";

export const fetchPickupRoute = (from, to) => {

  return async dispatch => {

    try
    {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${
          from.lat
        },${from.long}&destination=${to.lat},${
          to.long
        }&mode=driving&key=${API_KEY}`
      );

      const result = response.data;

      let array = Polyline.decode(
        result.routes[0].overview_polyline.points
      );
      let coordinates = array.map(point => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });

      dispatch({
        type: "FETCH_PICKUP_ROUTE",
        payload: {
          route: coordinates,
          destination: {
            lat: to.lat,
            long: to.long
          }
        }
      });

    }
    catch(err)
    {
      console.log("error", err);
    }
  };

  // return async dispatch => {
  //   AsyncStorage.getItem("token").then(token => {
  //     axios({
  //       url: `${URL}route`,
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`
  //       },
  //       data: {
  //         from,
  //         to
  //       }
  //     })
  //       .then(async res => {
  //         const route = res.data;
  //         const polylines = [];

  //         try {
  //           for (i = 0; i < route.length - 1; i++) {
  //             const response = await axios.get(
  //               `https://maps.googleapis.com/maps/api/directions/json?origin=${
  //                 route[i].lat
  //               },${route[i].long}&destination=${route[i + 1].lat},${
  //                 route[i + 1].long
  //               }&mode=driving&key=${API_KEY}`
  //             );

  //             const result = response.data;

  //             let array = Polyline.decode(
  //               result.routes[0].overview_polyline.points
  //             );
  //             let coordinates = array.map(point => {
  //               return {
  //                 latitude: point[0],
  //                 longitude: point[1]
  //               };
  //             });

  //             polylines.push(coordinates);
  //           }

  //           dispatch({
  //             type: "FETCH_PICKUP_ROUTE",
  //             payload: {
  //               route,
  //               polyline: polylines
  //             }
  //           });
  //         } catch (err) {
  //           console.log("error", err);
  //         }
  //       })
  //       .catch(err => {
  //         console.log("error", err);
  //       });
  //   });
  // };
};
