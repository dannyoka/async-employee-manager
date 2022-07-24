const inquirer = require('inquirer');
const query = require('../../config/db');

const getDepartmentsAsChoices = async () => {
  const departments = await query('SELECT name, id FROM departments');
  return departments.map(({ name, id }) => {
    return {
      name,
      value: id,
    };
  });
};

const viewDepartments = () => {
  query('SELECT * FROM departments', (err, result) => {
    if (err) {
      console.error(err);
    }
    console.table(result);
  });
};

const addDepartment = async () => {
  const { departmentName } = await inquirer.prompt([
    {
      message: 'What is the name of your department?',
      name: 'departmentName',
    },
  ]);
  await query('INSERT INTO departments (name) VALUES (?)', departmentName);
  viewDepartments();
};

module.exports = {
  addDepartment,
  viewDepartments,
  getDepartmentsAsChoices,
};
