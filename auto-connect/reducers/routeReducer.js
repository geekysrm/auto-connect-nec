const initState = {
  route: null,
  polyline: null
};

export default function(state = initState, action) {
  switch (action.type) {
    case "FETCH_ROUTE":
      console.log(action);
      return action.payload;

    default:
      return state;
  }
}
