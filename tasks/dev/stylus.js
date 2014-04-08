var rename = require('gulp-rename');
var vfs = require('vinyl-fs');
var stylus = require('gulp-stylus');
var path = require('path');

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

	grunt.config('watch.stylus', {
		files: [
				projectBase.src + 'utils/stylus/*.styl',
				SRC + '/**/stylus/*.styl',
				SRC + '/**/stylus/_*.styl',

		],
		tasks: ['trans.stylus'],
		options: {
			livereload: true
		}
	});

	grunt.registerTask('trans.stylus', function () {

		var changedFiles = {};

		vfs.src([
				SRC + '/**/stylus/_*.styl'
		])
			.pipe(stylus({
				use: ['nib'],
				import: [
					path.join(process.cwd(), projectBase.src, '/utils/stylus/*.styl'),
					'nib'
				],
				set: ['compress']
			}))
			.pipe(rename(function (path) {

				path.dirname = path.dirname.replace('/stylus', '/style');
				path.basename = path.basename.replace('_', '');

				collectStyleFiles('/' + path.dirname + '/' + path.basename + path.extname, changedFiles)
			}))
			.pipe(vfs.dest(DEST))
			.on('close', function () {

				Object.keys(changedFiles).forEach(function (key) {

					var fileInfo = changedFiles[key];

					grunt.file.write(DEST + fileInfo.txtFile, fileInfo.fileList.reverse().join('\n'));

					grunt.file.write(DEST + fileInfo.xmlFile, grunt.template.process('<?xml version="1.0" encoding="UTF-8"?>\n' +
						'<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"\n' +
						'jcr:primaryType="cq:ClientLibraryFolder"\n' +
						'categories="<%= projectName %>.components]"/>', { data: {
						projectName: projectBase.name
					}}));

				})


			})
			.on('end', this.async());

	});
};

function collectStyleFiles(filePath, files) {

	var part = filePath.split('/style/');

	if (files[part[0]]) {
		files[part[0]].fileList.push(part[1]);
	} else {
		files[part[0]] = {};
		files[part[0]].txtFile = part[0] + '/style/css.txt';
		files[part[0]].xmlFile = part[0] + '/style/.content.xml';
		files[part[0]].fileList = [part[1]];
	}
}