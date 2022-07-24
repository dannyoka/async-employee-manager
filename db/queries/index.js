const {
  addEmployee,
  viewEmployees,
  updateEmployee,
  getEmployeesAsChoices,
} = require('./employees');
const {
  viewDepartments,
  addDepartment,
  getDepartmentsAsChoices,
} = require('./departments');

const { viewRoles, addRole, getRolesAsChoices } = require('./roles');

module.exports = {
  addEmployee,
  viewEmployees,
  updateEmployee,
  getEmployeesAsChoices,
  viewDepartments,
  addDepartment,
  getDepartmentsAsChoices,
  viewRoles,
  addRole,
  getRolesAsChoices,
};
