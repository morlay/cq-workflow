module.exports = function (grunt) {

	// base the file package.json,to get NpmTasks and loadNpmTasks
	var npmTaskNames = JSON.stringify(grunt.file.readJSON('package.json').devDependencies).match(/grunt\-[^"^']+/g)
		, i = npmTaskNames.length;

	while (i--) {
		grunt.loadNpmTasks(npmTaskNames[i]);
	}

	var project = getProjectByDefault(grunt.file.readJSON('projects.json'));

	if (!project) {
		return;
	}

	grunt.initConfig({
		projectBase: {
			name: project.name,
			src: ['src', project.name].join('/'),
			dest: ['.sync', 'apps', project.name, 'jcr_root', 'apps', project.name].join('/')
		}
	});


	require('time-grunt')(grunt);
	require('./tasks/task')(grunt);

};

function getProjectByDefault(projects) {

	var projectList = projects.filter(function (project) {
		return project.isDefault;
	});

	if (projectList.length === 0) {
		console.log('no default project, please set one');
		return null;
	} else {
		return projectList[0];
	}

}
