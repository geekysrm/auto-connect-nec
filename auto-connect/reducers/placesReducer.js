export default function(state = null, action)
{
    switch (action.type) {
        case "FETCH_PLACES":
            return action.payload;
        
        default:
            return state;
    }
}