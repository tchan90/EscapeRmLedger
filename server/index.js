const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary');
const formData = require('express-form-data');
const {CLIENT_ORIGIN} = require('./config/cloudinary')

const app = express();
const apiPort = 5000;
require('dotenv').config();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
})

app.use(bodyParser.urlencoded({ extended: true }), formData.parse())
app.use(cors({ 
  origin: CLIENT_ORIGIN,
  optionsSuccessStatus: 200 
})) 
app.use(bodyParser.json())

//cloudinary
app.post('/image-upload', (req, res) => {

  const values = Object.values(req.files)
  const promises = values.map(image => cloudinary.uploader.upload(image.path, {folder:"escapermledger"}))
  
  Promise
    .all(promises)
    .then(results => res.json(results))
    .catch(err => console.log(err))
})
//

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify:false }, (err) => {
  if(err)
  console.error('Error');
  else
  console.log("Connected to db");
}
    );

console.log('Mongoose connection ready state: ' + mongoose.connection.readyState);

app.get('/', (req, res) => {
    res.send('Hello World!')
})
require('./routes')(app)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))