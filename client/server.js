const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');
const Cargo = require('./cargo');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  'mongodb+srv://escalaAdmin:HdwAAZKPH4u8lHvU@escalasdb-0noh7.gcp.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

const timestamp = new Date();
db.once('open', () => console.log('Connected to DB - ' + timestamp));

//++++PRINTAR COLLECTIONS+++
// db.on('open', function () {
//   db.db.listCollections().toArray(function (err, names) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(names);
//     }

//     mongoose.connection.close();
//   });
// });
// ++++++++++++++++++++++++++

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// ++++++++++++++++DATA base++++++++++++++++

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Data.aggregate([
    { $lookup:
       {
         from: 'cargos',
         localField: 'cargo',
         foreignField: 'value',
         as: 'cargo'
       }
     }
    ])
  .exec(function(err, data) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/getDataById/:id', (req, res) => {
  const id = req.params.id;
  console.log("request id: " + id);
  Data.findById(id, function(err, data) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();

  const { nome, cargo, phone } = req.body;

  if (!nome || !cargo) {
    return res.json({
      success: false,
      error: 'Campos Nome e Cargo são obrigatorios!',
      body: req.body
    });
  }
  data.nome = nome;
  data.cargo = cargo;
  data.phone = phone;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


// ++++++++++++++++CARGO base++++++++++++++++
router.get('/getCargo', (req, res) => {
  Cargo.find((err, cargo) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, cargo: cargo });
  });
});

router.post('/putCargo', (req, res) => {
  let cargo = new Cargo();

  const { value, text, key } = req.body;

  if (!value || !text || !key) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
      body: req.body
    });
  }
  cargo.value = value;
  cargo.text = text;
  cargo.key = key;
  cargo.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/updateCargo', (req, res) => {
  const { id, update } = req.body;
  Cargo.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete('/deleteCargo', (req, res) => {
  const { id } = req.body;
  Cargo.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));