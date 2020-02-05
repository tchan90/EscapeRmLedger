const Company = require('../models/companyModel');

module.exports = {

//add rooms
async postRoom(req,res){
    try{
        const room = await Company.findById([{_id:req.params.id}]);
        room.rooms.push(req.body);
        
       room.save(function(){
           console.log(req.body)
        res.send('Room Saved')
       })
    }catch (error){
        console.log(error);
        res.status(500).send({
            error: 'An error occured adding a room'
        })
    }
},
//get room
async getSpecificRoom(req,res){
    try{
        const company = await Company.findById([{_id: req.params.id}])
        const room = company.rooms.id(req.params.roomId)
        res.send(room)
    }catch(error){
        res.status(500).send({
            error:'An error occured getting the company info'
        })
    }
},
//edit room
async editRoom(req,res){
    try{
        const room = await Company.findById([{_id:req.params.id}]);
        const updRoom = room.rooms.id(req.params.roomId);
        updRoom.set(req.body);

        room.save(function(){
            res.send('Room updated');
          })
    }catch{
        console.log(error);
        res.status(500).send({
            error: 'An error occured editting a room'
        })
    }
},

//delete room
async deleteRoom(req,res){
    try{
        const room = await Company.findById([{_id:req.params.id}]);
        const deleteRm = room.rooms.id(req.params.roomId);
        deleteRm.remove();

        room.save(function(){
            res.send('Room deleted');
          })
    }catch{
        console.log(error);
        res.status(500).send({
            error: 'An error occured deleting a room'
        })
    }
}

}
   
   
   
   
   