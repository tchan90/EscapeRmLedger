const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  information:{
    type:String,
    required:true,
    trim:true
  }
}, {
  timestamps: true,
});

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  information:{
    type:String,
    required:true,
    trim:true
  },
  website:{
    type:String,
    required:true,
    trim:true
  },
  image:{
    type:String,
  },
  rooms:[roomSchema],
}, {
  timestamps: true,
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;