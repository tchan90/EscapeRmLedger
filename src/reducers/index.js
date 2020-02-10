import {combineReducers} from 'redux';
import authReducer from './authReducer';
import companyReducer from './companyReducer'
import roomReducer from './roomReducer';
import errorReducer from './errorReducers';
import {persistReducer} from 'redux-persist';
//local storage obj from window browser
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key:'root', //start storing from root
    storage,
    whitelist:['auth'] //store from auth reducer
}

const rootReducer = combineReducers({
    company: companyReducer,
    room: roomReducer,
    auth:authReducer,
    error:errorReducer
})

export default persistReducer(persistConfig,rootReducer)