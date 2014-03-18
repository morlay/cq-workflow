module.exports = function (gulp, config) {

  require('./vlt/export')(gulp, config);
  require('./vlt/import')(gulp, config);
  require('./vlt/rcp')(gulp, config);
  require('./vlt/sync')(gulp, config);

};


