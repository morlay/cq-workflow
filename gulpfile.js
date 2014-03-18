var argv = require('yargs').argv;
var fs = require('fs');

var config = {};

config.projects = readJSON(process.cwd() + '/misc/config/projects.json');
config.hosts = readJSON(process.cwd() + '/misc/config/hosts.json');

config.argv = argv;

function readJSON(filepath) {
  return JSON.parse(fs.readFileSync(String(filepath), 'utf8'));
}

require('./gulp/task')(config);