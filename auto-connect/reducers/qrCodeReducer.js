export default function(state = null, action)
{
    switch (action.type) {
        case "STORE_QR_CODE_DATA":
            return action.payload;
        
        default:
            return state;
    }
}