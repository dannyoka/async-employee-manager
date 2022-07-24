const inquirer = require('inquirer');
const query = require('../../config/db');
const { getRolesAsChoices } = require('./roles');

const getEmployeesAsChoices = async () => {
  const managers = await query(
    'SELECT first_name, last_name, id FROM employees'
  );
  return managers.map((manager) => {
    return {
      name: `${manager.first_name} ${manager.last_name}`,
      value: manager.id,
    };
  });
};

const viewEmployees = () => {
  query(
    'SELECT employees.first_name, employees.last_name, roles.title FROM employees JOIN roles ON role_id WHERE employees.role_id = roles.id',
    (err, result) => {
      if (err) {
        console.error(err);
      }
      console.table(result);
    }
  );
};

const addEmployee = async () => {
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      message: "What is the employee's first name?",
      name: 'firstName',
    },
    {
      message: "What is the employee's last name?",
      name: 'lastName',
    },
    {
      message: 'What is their role?',
      name: 'roleId',
      type: 'list',
      choices: await getRolesAsChoices(),
    },
    {
      message: 'Who is their manager?',
      name: 'managerId',
      type: 'list',
      choices: await getEmployeesAsChoices(),
    },
  ]);
  await query(
    'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',
    [firstName, lastName, roleId, managerId]
  );
  viewEmployees();
};

const updateEmployee = async () => {
  const { employee_id, role_id } = await inquirer.prompt([
    {
      type: 'list',
      message: 'Which employee would you like to update?',
      name: 'employee_id',
      choices: await getEmployeesAsChoices(),
    },
    {
      type: 'list',
      message: 'What would you like to update their role to be?',
      name: 'role_id',
      choices: await getRolesAsChoices(),
    },
  ]);
  try {
    await query('UPDATE employees SET role_id = ? WHERE id = ?', [
      role_id,
      employee_id,
    ]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  viewEmployees,
  getEmployeesAsChoices,
  addEmployee,
  updateEmployee,
};
