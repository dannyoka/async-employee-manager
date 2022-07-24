const inquirer = require('inquirer');
const {
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
} = require('./db/queries');

const quit = () => {
  console.log('Thank you for using employee manager!');
  process.exit();
};

const choiceMap = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployee,
  quit,
};

const handleChoice = async (choice) => {
  await choiceMap[choice]();
  if (choice !== 'quit') {
    mainPrompt();
  }
};

const mainPrompt = async () => {
  const result = await inquirer.prompt([
    {
      message: 'What would you like to do?',
      type: 'list',
      name: 'userChoice',
      choices: [
        {
          name: 'View all departments',
          value: 'viewDepartments',
        },
        {
          name: 'View all roles',
          value: 'viewRoles',
        },
        {
          name: 'View all employees',
          value: 'viewEmployees',
        },
        {
          name: 'Add a department',
          value: 'addDepartment',
        },
        {
          name: 'Add a role',
          value: 'addRole',
        },
        {
          name: 'Add an employee',
          value: 'addEmployee',
        },
        {
          name: 'Update employee role',
          value: 'updateEmployee',
        },
        {
          name: 'Quit',
          value: 'quit',
        },
      ],
    },
  ]);
  handleChoice(result.userChoice);
};

module.exports = mainPrompt;
