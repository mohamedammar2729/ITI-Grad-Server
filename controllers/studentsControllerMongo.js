// Description: This file contains the logic to handle the requests coming for the students API.
// It contains the all possible functions to do all CRUD operations:
// 1. getAllStudents: To get all students from the database.
// 2. getStudentById: To get a student by id from the database.
// 3. addStudent: To add a student to the database.
// 4. deleteStudent: To delete a student from the database.
// 5. updateStudent: To update a student in the database.

const StudentDb = require("../models/studentsModelMongo");

// add a student
const addStudent = async (req, res) => {
  try {
    const student = new StudentDb({
      fname: req.body.fname,
      lname: req.body.lname,
      dept: req.body.dept,
      id: req.body.id,
    });
    const result = await student.save();
    res.status(201).send(result);
    // student.save((err, result) => {
    //   if (err) {
    //     res.status(400).send(err);
    //   } else {
    //     res.status(201).send(result);
    //   }
    // });
  } catch (e) {
    for (let i in e.errors) {
      console.log(e.errors[i].message);
    }
    res.status(400).send("Bad Request ..........");
  }
};

// get student by id
const getStudentById = async (req, res) => {
  try {
    const student = await StudentDb.findById(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found......");
    }
    res.send(student);
  } catch (e) {
    res.status(500).send(e);
  }
};

// get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await StudentDb.find(); // sort by id in ascending order
    res.send(students);
  } catch (e) {
    res.status(500).send(e);
  }
};

// update a student
const updateStudent = async (req, res) => {
  try {
    // findByIdAndUpdate takes 3 arguments: id, data to update, options
    // const student = await StudentDb.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true, // return the updated document
    //   runValidators: true,   // run the validators
    // });
    const student = await StudentDb.findOneAndUpdate(req.params.id, req.body, {
      returnOriginal: false, // return the updated document
    });
    if (!student) {
      return res.status(404).send("Student not found......");
    }
    res.send(student);
  } catch (e) {
    res.status(400).send(e);
  }
};

// delete a student
const deleteStudent = async (req, res) => {
  try {
    const student = await StudentDb.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found......");
    }
    res.send(student);
  } catch (e) {
    for (let i in e.errors) {
      console.log(e.errors[i].message);
      res.status(400).send("Bad Delete Request ..........");
    }
  }
};

module.exports = {
  addStudent,
  getStudentById,
  getAllStudents,
  updateStudent,
  deleteStudent,
};
