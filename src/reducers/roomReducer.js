import {ADD_ROOM,EDIT_ROOM,DELETE_ROOM,GET_ROOM} from '../actions/types'

const initialState={
    rooms:[],
    room:{}
};
export default function(state=initialState, action){
    switch(action.type){
            case ADD_ROOM:
                return{
                    ...state,
                    rooms:[action.payload, ...state.rooms]
                }
            case EDIT_ROOM:
                return{
                    ...state,
                    rooms:state.rooms.filter(room => room.id!==action.payload ? (room=action.payload):room)
                }
            case DELETE_ROOM:
                return{
                    ...state,
                    rooms:state.rooms.filter(room => room.id!==action.payload)
                }
            case GET_ROOM:
                return{
                    ...state,
                    room:action.payload
                }
        default:
            return state;
    }
}