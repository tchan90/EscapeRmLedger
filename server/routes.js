const CompanyController = require('./controllers/companyController');
const RoomController = require('./controllers/roomController');
const UserController = require('./controllers/UserController');
//authorization middleware
const auth = require('./middleware/auth')
module.exports = (app) => {
    //get all companies
    app.get('/companies', CompanyController.getAllCompanies)
    //get specific company
    app.get('/company/:id', CompanyController.getSpecificCompany)
    //add company
    app.post('/addCompany', CompanyController.postCompany)
     //update company
    app.put('/updateCompany/:id', CompanyController.updateCompany)
    //delete company
    app.delete('/deleteCompany/:id', CompanyController.deleteCompany)
        
    //add room
    app.post('/addRoom/:id', RoomController.postRoom)
    //edit room
    app.put('/updateRm/:id/:roomId', RoomController.editRoom)
    //delete room
    app.delete('/deleteRm/:id/:roomId', RoomController.deleteRoom)
    //get specific room
    app.get('/getRoom/:id/:roomId', RoomController.getSpecificRoom)


     //authentication
     //sign in
     app.post('/signIn', UserController.loginUser)
    // //register
     app.post('/register', UserController.postRegister)
    // //get users
     app.get('/getUsers',UserController.getUsers)
    // //get specific user
     app.get('/user/:id', auth, UserController.getSpecificUser)
    // //delete user
     app.delete('/deleteUser/:id', auth, UserController.deleteUser)
     //update user
     app.put('/updateUser/:id', UserController.updateUser)
}
