const mongoose = require('mongoose');


const clientSchema = new mongoose.Schema({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    },
  age: { type: Number, min: 0, max: 120 },
  allergies: [{ type: String }],
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  lastvisit: { type: Date, max: '2016-10-30' },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
