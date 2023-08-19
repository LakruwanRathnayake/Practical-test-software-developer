const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId: String,
    name: String,
    employeEPF: String,
    section: String,
    gender: String,
    dob: String
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
