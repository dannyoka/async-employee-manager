require('dotenv').config();
const logo = require('asciiart-logo');
const mainPrompt = require('./choices');

function init() {
  console.log(logo({ name: 'Employee Manager' }).render());
  mainPrompt();
}

init();
