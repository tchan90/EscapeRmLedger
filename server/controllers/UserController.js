const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const Users = require('../models/userModel');

module.exports = {
    //get Users
    async getUsers(req,res){
        try {
            const users = await Users.find()
            res.send(users)
        }catch (error){
            res.status(500).send({
                error:'An error occured getting the users'
            })
        }
    },
    //register user
    async postRegister(req,res){
        //simple validation
        const {email, password,name,admin} = req.body
        if(!email || !password || !name || !admin){
            return res.status(400).json({msg:'Please enter all fields'})
        }
        await Users.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                errors.email = 'Email already exists';
                return res.status(400).json(errors.email)
            }else{
                const newUser = new Users({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    admin:req.body.admin
                });
                bcrypt.genSalt(10, (err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash) => {
                        if(err) throw err;      //catch errors
                        newUser.password=hash;
                        newUser.save()      //save into database
                            .then(user=> {
                                jwt.sign(
                                    {id: user.id},
                                    keys.secretOrKey,
                                    {expiresIn:3600},
                                    (err,token) => {
                                        if(err) throw err;
                                        res.json({
                                            token,
                                            user:{
                                                id:user.id,
                                                name:user.name,
                                                email:user.email
                                            }
                                        })
                                    }
                                )
                            })
                            .catch(err=>console.log(err));  //error if password not entered
                    })
                });
            }
        })
    },
    async loginUser(req,res){
        const {email, password} = req.body
      //simple validation
        if(!email || !password){
            return res.status(400).json({msg:'Login failed. Please make sure to enter all fields'})
        }

    //Find user by email
    await User.findOne({email}).then(user => {
        //Check for user
        if(!user){
            return res.status(404).json({msg:'User not found'});
        }
        //Check password
        bcrypt.compare(password,user.password).then(isMatch => {
            if(isMatch){ 
              //res.json({msg:'Success'});
              //User Matched. Payload contains all users info
              const payload = {id:user.id, name:user.name};
              //Sign Token - go to config folder => keys.js and make a secretkey so that the token is retrieved
              // Giving the user the key and token
              //key expires in an hour
              jwt.sign(payload, keys.secretOrKey,{expiresIn:3600},(err,token)=> {
                  res.json({
                      success:true,
                      token: token  //receive token if login successful
                  })
              }) 
        }   else{
              return res.status(400).json({msg:'Password Incorrect'});
            }
        })
    })
    },
    async getSpecificUser(req,res){
        try{
            await User.findById(req.user.id)
            .then(user=> res.json(user))
        }
        catch{
            res.status(500).send({
                error:'An error occured getting the user'
            })
        }
    },
    async deleteUser(req,res){
        await User.findById(req.params.id)
            .then(user => user.remove().then(()=> res.json({success:true})))
            .catch(err => res.status(404).json({success:false, deleted:user}))
    },
    async updateUser(req,res){
        try{
            const user = await User.findOneAndUpdate({_id: req.params.id},req.body, {new:true})
            res.send(user)
        }catch(error){
            console.log(error);
            res.status(500).send({
                error:'An error occured trying to edit user'
            })
        }
    },
}