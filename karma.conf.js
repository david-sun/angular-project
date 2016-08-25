//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './',

    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/components/**/*.js',
      'app/view*/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-spec-reporter',
      'karma-jasmine-html-reporter',
    ],

    reporters: ['junit', 'progress', 'spec', 'html'],


    junitReporter: {
      outputDir: 'unit-test-result',
      outputFile: 'test-out/unit.xml',
      suite: 'unit'
    }

  });
};
