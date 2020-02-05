import Api from './Api'

export default{
    postRoom(id,newRoom){
        return Api().post(`addRoom/${id}`, newRoom)
    },
    deleteRoom(id,roomId){
        return Api().delete(`deleteRm/${id}/${roomId}`)
    },
    editRoom(id,roomId,updRoom){
        return Api().put(`updateRoom/${id}/${roomId}`, updRoom)
    }
}