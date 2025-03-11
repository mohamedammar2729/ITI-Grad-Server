const express = require("express");

const router = express.Router();
const { createProgram } = require("../models/createprogramModel");


const createProgramValidator = require("../middlewares/createprogramValidatorMW");

router.post("/", createProgramValidator, async (req, res) => {
  try {
    const {
      numberOfPersons,
      locate,
      budget,
      typeOfProgram,
      selectedTripPlaces,
      images,
    } = req.body;

    const newProgram = new createProgram({
      register_id: req.user.userid,
      numberOfPersons,
      locate,
      budget,
      typeOfProgram,
      selectedTripPlaces,
      images,
    });
    await newProgram.save();
    res.status(201).json(newProgram);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", createProgramValidator, async (req, res) => {
  try {
    const programs = await createProgram.find({ register_id: req.user.userid });
    res.json(programs);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/:id", createProgramValidator, async (req, res) => {
  try {

    const program = await createProgram.findOne({ _id: req.params.id });
    if (program.register_id.toString() !== req.user.userid) {
      return res.status(403).json({ error: "Access denied" });
    }
    // delete the program from mongodb
    await createProgram.deleteOne({ _id: req.params.id });
    res.json({ message: "Program deleted" });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
