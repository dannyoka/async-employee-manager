const inquirer = require('inquirer');
const query = require('../../config/db');
const { getDepartmentsAsChoices } = require('./departments');

const viewRoles = () => {
  query('SELECT * FROM roles', (err, result) => {
    if (err) {
      console.error(err);
    }
    console.table(result);
  });
};

const getRolesAsChoices = async () => {
  const roles = await query('SELECT title, id FROM roles');
  return roles.map(({ id, title }) => {
    return {
      value: id,
      name: title,
    };
  });
};

const addRole = async () => {
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      message: 'What is the title of this role?',
      name: 'title',
    },
    {
      message: 'What is the salary for this role?',
      name: 'salary',
    },
    {
      message: 'What department are they in?',
      type: 'list',
      name: 'departmentId',
      choices: await getDepartmentsAsChoices(),
    },
  ]);
  await query(
    'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)',
    [title, salary, departmentId]
  );
  viewRoles();
};

module.exports = {
  viewRoles,
  addRole,
  getRolesAsChoices,
};
