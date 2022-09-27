var express = require('express');
var router = express.Router();
const rents = require('../controller/rents.controller');
const { authVerify } = require("../auth");

//To get the all rents
router.get('/', authVerify, rents.findAll);

//To get the rent with rent Id
router.get('/:id', authVerify,  rents.findById);

//To create a new rent 
router.post('/create', rents.create);

//To edit the rent with id
router.put('/:id', authVerify, rents.updateRentWithId);

//To delete the rent with id
router.delete('/:id', authVerify, rents.deleteRentWithId);

module.exports = router;

