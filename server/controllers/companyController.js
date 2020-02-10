const Company = require('../models/companyModel');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  })
  
module.exports = {
    //get all companies
    async getAllCompanies(req,res){
        try {
            const allCompanies = await Company.find()
            res.send(allCompanies)
        }catch (error){
            res.status(500).send({
                error:'An error occured getting the companies'
            })
        }
    },
    //get specific company
    async getSpecificCompany(req,res){
        try{
            const company = await Company.findById([{_id: req.params.id}])
            res.send(company)
        }catch(error){
            res.status(500).send({
                error:'An error occured getting the company info'
            })
        }
    },
    //add company
    async postCompany(req,res){
        try{
            const company = await Company.create(req.body)
            res.send(company);
        }catch (error){
            console.log(error);
            res.status(500).send({
                error: 'An error occured adding a company'
            })
        }
    },
    //update company
    async updateCompany(req,res){
        try{
            const company = await Company.findOneAndUpdate({_id: req.params.id},req.body, {new:true})
            res.send(company)
        }catch(error){
            console.log(error);
            res.status(500).send({
                error:'An error occured trying to edit company'
            })
        }
    },
    //delete company
    async deleteCompany(req,res){
        try{
            const company = await Company.findByIdAndDelete([{_id: req.params.id}])
            res.send('Company deleted: ' + company)
        }catch(error){
            console.log(error);
            res.status(500).send({
                error: 'An error occured deleting the company'
            })
        }
    },
}