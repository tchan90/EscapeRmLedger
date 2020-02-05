import {combineReducers} from 'redux';
import authReducer from './authReducer';
import companyReducer from './companyReducer'
import roomReducer from './roomReducer';
import errorReducer from './errorReducers'

export default combineReducers({
    company: companyReducer,
    room: roomReducer,
    auth:authReducer,
    error:errorReducer
})