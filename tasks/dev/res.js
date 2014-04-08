var changed = require('gulp-changed');
var vfs = require('vinyl-fs');

module.exports = function (grunt) {

	var projectBase = grunt.config('projectBase');

	var DEST = [
		projectBase.dest,
		'components'
	].join('/');

	var SRC = [
		projectBase.src,
		'components'
	].join('/');

	grunt.config('watch.res', {
		files: [
				SRC + '/**/res/**',
				SRC + '/**/**/res/**'
		],
		tasks: ['trans.res'],
		options: {
			livereload: true
		}
	});

	grunt.registerTask('trans.res', function () {

		vfs.src([
				SRC + '/**/res/**',
				SRC + '/**/**/res/**'
		])
			.pipe(changed(DEST))
			.pipe(vfs.dest(DEST))
			.on('end', this.async());

	});

};