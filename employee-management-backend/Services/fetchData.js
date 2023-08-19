const Employee = require('./employee');

async function getEmployees() {
  try {
    const employee = await Employee.find();
    return employee;
  } catch (error) {
    throw new Error('Error fetching items: ' + error.message);
  }
}

async function addEmployee(employeeData) {
    try {
        const newEmployee = await Employee.create(employeeData);
        return newEmployee;
    } catch (error) {
        throw new Error('Error adding item: ' + error.message);
    }
}

async function updateEmployee(employeeId, newData) {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, newData, { new: true });
      return updatedEmployee;
    } catch (error) {
      throw new Error('Error updating item: ' + error.message);
    }
}

async function deleteEmployee(itemId) {
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(itemId);
      return deletedEmployee;
    } catch (error) {
      throw new Error('Error deleting item: ' + error.message);
    }
}

async function getEmployeeIdByEmployeeId(employeeId) {
    try {
      const employee = await Employee.findOne({ employeeId: employeeId });
      if (employee) {
        return employee._id;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error('Error getting item ID: ' + error.message);
    }
}

module.exports = {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeIdByEmployeeId
};
