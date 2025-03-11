const mongoose = require('mongoose');




const createProgramSchema = new mongoose.Schema({
  numberOfPersons: {
    type: Number,
    required: true,
  },
  locate: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  typeOfProgram: {
    type: String,
    required: true,
  },
  selectedTripPlaces: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  register_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  selectedTripPlaces: { type: Array, required: true },
});

exports.createProgram = mongoose.model("createProgram", createProgramSchema);