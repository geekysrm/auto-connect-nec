import { combineReducers } from 'redux';

import userReducer from './userReducer';
import placesReducer from './placesReducer';
import routeReducer from './routeReducer';
import pickupReducer from './pickupReducer';
import qrCodeReducer from "./qrCodeReducer";

const rootReducer = combineReducers({
    user: userReducer,
    places: placesReducer,
    route: routeReducer,
    pickUpRoute: pickupReducer,
    qrCode: qrCodeReducer
});

export default rootReducer;
