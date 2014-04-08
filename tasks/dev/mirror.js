var changed = require('gulp-changed');
var vfs = require('vinyl-fs');

module.exports = function (grunt) {

	var projectBase = grunt.config('projectBase');

	var DEST = projectBase.dest;

	var SRC = projectBase.src;

	grunt.config('watch.mirror', {
		files: [
				SRC + '/**/**/*.jsp',
				SRC + '/**/**/*.xml',
				SRC + '/**/**/.content.xml'
		],
		tasks: ['trans.mirror'],
		options: {
			livereload: true
		}
	});

	grunt.registerTask('trans.mirror', function () {

		vfs.src([
				SRC + '/**/**/*.jsp',
				SRC + '/**/**/*.xml',
				SRC + '/**/**/.content.xml'
		])
			.pipe(changed(DEST))
			.pipe(vfs.dest(DEST))
			.on('end', this.async());
	});

};