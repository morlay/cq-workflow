var rename = require('gulp-rename');
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


	grunt.config('watch.js', {
		files: [
				SRC + '/**/script/*.js',
				SRC + '/**/**/script/*.js'
		],
		tasks: ['trans.js'],
		options: {
			livereload: true
		}
	});

	grunt.registerTask('trans.js', function () {

		var changedFiles = {};

		vfs.src([
				SRC + '/**/script/*.js',
				SRC + '/**/**/script/*.js'
		])
			.pipe(rename(function (path) {
				collectJsFiles('/' + path.dirname + '/' + path.basename + path.extname, changedFiles)
			}))
			.pipe(vfs.dest(DEST))
			.on('close', function () {

				Object.keys(changedFiles).forEach(function (key) {

					var fileInfo = changedFiles[key];

					grunt.file.write(DEST + fileInfo.txtFile, fileInfo.fileList.reverse().join('\n'));

					grunt.file.write(DEST + fileInfo.xmlFile, grunt.template.process('<?xml version="1.0" encoding="UTF-8"?>\n' +
						'<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"\n' +
						'jcr:primaryType="cq:ClientLibraryFolder"\n' +
						'categories="<%= projectName %>.components]"\n' +
						'dependencies="[cq.jquery]"' +
						'/>', { data: {
						projectName: projectBase.name
					}}));

				})


			})
			.on('end', this.async());

	});
};


function collectJsFiles(filePath, files) {

	var part = filePath.split('/script/');

	if (files[part[0]]) {
		files[part[0]].fileList.push(part[1]);
	} else {
		files[part[0]] = {};
		files[part[0]].txtFile = part[0] + '/script/js.txt';
		files[part[0]].xmlFile = part[0] + '/script/.content.xml';
		files[part[0]].fileList = [part[1]];
	}
}