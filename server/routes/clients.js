const express = require('express');
const router = express.Router();

const Client = require('../models/Client');

router.route('/')
.get((req,res) => {
    let { page } = req.query;
    let {pagesize }= req.query;
    let agemin = req.query.age;
        agemin = function() {
            return req.query.age > agemin;
        }
    let agemax = req.query.age;
    let lastvisit = req.query.lastvisit;
    let visitbefore = lastvisit;
        visitbefore = function(){
        if(lastvisit > visitbefore)
        return lastvisit;
    }
    // let gender = req.query.gender;
    // let allergy = req.query.allergies;
    // let age = req.query.age;
    console.log('req.query: ', req.query);
  Client.find(req.query ).exec()
  .skip(page)
  .limit(pagesize)
  // if(req.query)
    .then(clients => res.send(clients))
    .catch(err => res.status(400).send(err))
})
.post((req, res) => {
    Client.create(req.body)
    .then(newClient => res.send(newClient))
    .catch(err => res.status(400).send(err));
})

router.route('/getall')
.get((req,res) =>{
    Client.find({}).exec()
    .then(clients => res.send(clients))
    .catch(err => res.status(400).send(err))
});


router.route('/:id')
.get((req, res) => {
  Client.findById(req.params.id).exec()
  .then(client => res.send(client))
  .catch(err => res.status(400).send(err));
})

.put((req, res) => {
  Client.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).exec()
  .then(client => {
    return client.save();
  })
    .then(savedClient => {
      res.send(savedClient);
    })
    .catch(err => res.status(400).send(err));
})

.delete((req, res) => {
  Client.findByIdAndRemove(req.params.id).exec()
    .then(client => client.save())
    .then(deleteClient => res.send(deleteClient))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
