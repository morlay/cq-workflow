module.exports = function (grunt) {

	grunt.loadTasks('tasks/dev');


	console.log(grunt.config('projectBase.name'));

	grunt.config('clean.dest', [ grunt.config('projectBase.dest')]);

	grunt.registerTask('trans', ['trans.js', 'trans.res', 'trans.mirror', 'trans.stylus']);

	grunt.registerTask('default', ['clean', 'trans', 'watch']);

	return grunt;

};


