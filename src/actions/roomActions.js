import {ADD_ROOM,EDIT_ROOM,DELETE_ROOM,GET_ROOM} from './types';
import Api from './Api';

export const getSpecificRoom = (id,roomId) => async dispatch => {
    //GET a company via ID
    const res = await Api().get(`getRoom/${id}/${roomId}`)
    dispatch({
        type:GET_ROOM,
        payload:res.data
    })

}
export const addRoom=(id,room)=>async dispatch=>{
     //ADD
     const res = await Api().post(`addRoom/${id}`, room)
     dispatch({
         type:ADD_ROOM,
         payload:res.data
     })
}
export const deleteRoom=(id,roomId)=>async dispatch=>{
    //DELETE
    await Api().delete(`deleteRm/${id}/${roomId}`)
    dispatch({
        type:DELETE_ROOM,
        payload:roomId
    })
}
export const editRoom=(id,roomId,room)=>async dispatch=>{
    //UPDATE
    const res = await Api().put(`updateRm/${id}/${roomId}`, room)
    dispatch({
        type:EDIT_ROOM,
        payload:res.data
    })
}