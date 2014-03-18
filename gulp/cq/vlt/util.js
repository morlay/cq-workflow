// ref: http://dev.day.com/docs/en/crx/current/how_to/how_to_use_the_vlttool.html

var child = require('child_process');

module.exports = {
  runVlt: function (args, pathArr) {
    console.log(args.join(' '));
    console.log(pathArr.join('/'));
    child.execFile(
      process.cwd() + '/.cq/vlt/bin/vlt', args, {
        'cwd': pathArr.join('/')
      }, function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });
  },
  checkProject: function (argv, projects) {
    var project = projects[0];

    if (argv.p || argv.project) {

      project = projects.filter(function (item) {
        return (argv.p || argv.project) === item.name
      });

      if (!project.length) {
        console.log('no configure about the project');
        return false;
      }
    }
    return project;
  }
};

