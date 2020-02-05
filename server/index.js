const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express()
const apiPort = 5000
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

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