const initialState = {
  loggedIn: false,
  type: null,
  name: null,
  email: null,
  profilePic: null,
  transactions: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        loggedIn: true,
        type: action.payload.type,
        name: action.payload.name,
        email: action.payload.email,
        profilePic: action.payload.profilePic,
        balance: 0
      };

    case "DRIVER_LOGIN":
      return {
        loggedIn: true,
        type: action.payload.type,
        name: action.payload.name,
        email: action.payload.email,
        profilePic: action.payload.profilePic,
        balance: 0,
        autoNumber: null
      };

    case "FETCH_USER_DETAILS":
      return {
        loggedIn: true,
        type: action.payload.type,
        name: action.payload.name,
        email: action.payload.email,
        profilePic: action.payload.profilePic,
        balance: action.payload.money,
        autoNumber: action.payload.autoNumber,
        transactions: action.payload.transactions
      };

    default:
      return state;
  }
}
