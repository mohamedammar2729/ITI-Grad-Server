// import validator
const validator = require("../util/studentsValidator");

const Student = require("../models/studentsModel");

const getAllStudents = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  //   res.json(Student.fetchAllStudents());
  Student.fetchAllStudents((students) => {
    res.json(students);
  });
  //res.json(students);
};

const getStudentById = (req, res) => {
  //let id = req.params.id;
  let id = req.id; // can use req.id because of the middleware app.param
  // find (value, index, array) => {}
  //let student = students.find((student) => student.id == id);
  let student = Student.fetchStudentById(id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
};

const addStudent = (req, res) => {
  let validate = validator(req.body);
  if (validate) {
    let std = new Student(req.body.name, req.body.age);
    std.saveStudent();
    res.json(req.body);
  } else {
    res.status(400).json({ message: "Invalid data" });
  }

  //   let validate = validator(req.body);
  //   if (validate) {
  //     req.body.id = students.length + 1;
  //     students.push(req.body);
  //     res.json(req.body);
  //   } else {
  //     res.status(400).json({ message: "Invalid data" });
  //   }
};

const deleteStudent = (req, res) => {
  let id = req.params.id;
  //   let std = students.findIndex((student) => student.id == id);
  //   if (std != -1) {
  //     students.splice(std, 1);
  //     res.send("Student deleted successfully");
  //   } else {
  //     res.status(404).json({ message: "Student not found" });
  //   }
  if (Student.deleteStudent(id)) {
    res.send("Student deleted successfully");
  } else {
    res.status(404).json({ message: "Student not found" });
  }
};

const updateStudent = (req, res) => {
  let id = req.params.id;
  //   let std = students.findIndex((student) => student.id == id);
  //   if (std != -1) {
  //     for (let i in req.body) {
  //       students[std][i] = req.body[i];
  //     }
  //     res.json(students[std]);
  //   } else {
  //     res.status(404).json({ message: "Student not found" });
  //   }
  let std = Student.updateStudent(id, req.body);
  if (std) {
    res.json(std);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  deleteStudent,
  updateStudent,
};
