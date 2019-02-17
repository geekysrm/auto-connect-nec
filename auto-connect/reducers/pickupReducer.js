const initState = {
  route: null,
  destination: null
};

export default function(state = initState, action) {
  switch (action.type) {
    case "FETCH_PICKUP_ROUTE":
      console.log(action);
      return action.payload;

    default:
      return state;
  }
}
