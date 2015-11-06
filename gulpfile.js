/*eslint-env node */
/*eslint no-var:0, quote-props: 0, strict:[2,"global"] */

'use strict';

var gulp = require('gulp');
var PACKAGE = require('./package.json');
var loadTasks = require('gulp-load-tasks');
var plugins = require('gulp-load-plugins')();

var FOLDERS = {
  build: './build/',
  modules: './www/modules/',
  sass: './scss/',
  www: './www/'
};

var PATTERNS = {
  all: '**/*',
  css: '**/*.css',
  jade: '**/*.jade',
  js: '**/*.js',
  sass: '**/*.sass',
  images: '**/*.{png,jpg,gif,svg}',
  pgbomit: '**/.pgbomit'
};

var TASKS = {
  'build.clean': {
    src: FOLDERS.build
  },
  'build.clean.unused': {
    cwd: FOLDERS.build,
    src: [
      'lib/' + PATTERNS.all,
      '!lib/ionic/',
      '!lib/ionic/release/',
      '!lib/ionic/release/fonts/',
      '!lib/ionic/release/fonts/' + PATTERNS.all,
      'modules/' + PATTERNS.all,
      '!modules/*/',
      '!modules/*/' + PATTERNS.images
    ]
  },
  'build.config': {
    src: FOLDERS.build
  },
  'build.copy.config': {
    src: './config.xml',
    dest: FOLDERS.build
  },
  'build.copy': {
    src: [FOLDERS.www + PATTERNS.all, FOLDERS.www + PATTERNS.pgbomit],
    dest: FOLDERS.build
  },
  'build.phonegap-build': {
    src: FOLDERS.build,
    dest: 'phonegap-build',
    cache: './.build.cache/',
    commit: 'New build'
  },
  'build.useref': {
    src: FOLDERS.build + 'index.html',
    dest: FOLDERS.build,
    css: PATTERNS.css,
    js: PATTERNS.js
  },
  'inject': {
    src: FOLDERS.www + 'index.html',
    dest: FOLDERS.www,
    js: FOLDERS.modules + PATTERNS.js
  },
  'jade': {
    src: FOLDERS.modules + PATTERNS.jade,
    dest: FOLDERS.modules + 'app/',
    file: 'app.templates.js',
    root: 'modules/',
    module: 'app'
  },
  'sass': {
    src: FOLDERS.sass + 'ionic.app.sass',
    dest: FOLDERS.www + 'css/'
  },
  'watch': [{
    src: [
      FOLDERS.modules + PATTERNS.jade,
      FOLDERS.modules + PATTERNS.js,
      './bower.json'
    ],
    tasks: ['inject']
  }, {
    src: FOLDERS.sass + PATTERNS.sass,
    tasks: ['sass']
  }]
};

loadTasks('gulp/', gulp, plugins, {
  ENV: plugins.util.env.type || 'development',
  PATTERNS: PATTERNS,
  FOLDERS: FOLDERS,
  PACKAGE: PACKAGE,
  TASKS: TASKS
});
