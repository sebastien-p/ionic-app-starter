/*eslint-env node */
/*eslint quote-props: 0 */

'use strict';

var load = require('./gulp/load');

load(function tasksSettings(FOLDERS, PATTERNS) {
  var LOCALES = 'angular-locale_' + PATTERNS.i18n.toLowerCase() + '.js';

  return {
    'clean.cordova': {
      src: [
        FOLDERS.root + 'config.xml',
        FOLDERS.platforms,
        FOLDERS.plugins,
        FOLDERS.www
      ]
    },
    'setup.config': {
      src: FOLDERS.src + 'config.xml',
      dest: FOLDERS.root
    },
    'copy.src': {
      cwd: FOLDERS.src,
      src: [
        PATTERNS.images,
        PATTERNS.fonts,
        PATTERNS.html,
        PATTERNS.json,
        '!modules/**/{config,i18n}/' + PATTERNS.json,
        PATTERNS.js
      ],
      dest: FOLDERS.www
    },
    // 'copy.favicons': {
    //   cwd: FOLDERS.images + 'favicons/',
    //   src: {
    //     // TODO
    //   },
    //   dest: FOLDERS.www
    // },
    'constants': {
      module: 'app'
    },
    'i18n': {
      src: FOLDERS.modules + '**/i18n/**' + PATTERNS.i18n + '.json',
      module: 'app.i18n'
    },
    'templates': {
      cwd: FOLDERS.modules,
      src: {
        smartphone: '**/smartphone/' + PATTERNS.pug,
        tablet: '**/tablet/' + PATTERNS.pug
      },
      module: 'app'
    },
    'styles': {
      src: FOLDERS.styles + '{shared,smartphone,tablet}.sass',
      dest: FOLDERS.www + 'css/'
    },
    'inject.lib': {
      cwd: FOLDERS.www,
      src: {
        smartphone: 'smartphone.html',
        tablet: 'tablet.html'
      }
    },
    'inject.src': {
      cwd: FOLDERS.www,
      src: '{smartphone,tablet}.html',
      sections: {
        shared: [
          'css/shared.css',
          'modules/' + PATTERNS.js,
          '!modules/**/{smartphone,tablet}/' + PATTERNS.js
        ],
        smartphone: [
          'css/smartphone.css',
          'modules/**/smartphone/' + PATTERNS.js
        ],
        tablet: [
          'css/tablet.css',
          'modules/**/tablet/' + PATTERNS.js
        ]
      }
    },
    'build.useref': {
      src: FOLDERS.www + '{smartphone,tablet}.html'
    },
    'build.rev': {
      cwd: FOLDERS.www,
      src: [
        'images/' + PATTERNS.images,
        'fonts/' + PATTERNS.fonts,
        'lib/lib.min.{css,js}',
        'modules/*.min.js',
        'css/*.min.css'
      ]
    },
    'build.rev.replace': {
      cwd: FOLDERS.www,
      src: [
        '{smartphone,tablet}.html',
        'lib/lib-*.min.{css,js}',
        'modules/*-*.min.js',
        'css/*-*.min.css'
      ]
    },
    'build.clean': {
      cwd: FOLDERS.www,
      src: [
        PATTERNS.all,
        '!{css,fonts,images,lib,modules}/',
        '!css/*-*.min.css',
        '!images/**/',
        '!images/' + PATTERNS.images,
        '!lib/lib-*.min.{css,js}',
        '!lib/{angular-i18n,ionic}/',
        '!lib/angular-i18n/' + LOCALES,
        '!lib/ionic/release/',
        '!lib/ionic/release/fonts/',
        '!{fonts,lib/ionic/release/fonts}/' + PATTERNS.fonts,
        '!modules/*-*.min.js',
        '!' + PATTERNS.json,
        '!' + PATTERNS.html,
        '!*.*',
        'rev-manifest.json'
      ]
    },
    // 'web': { // TODO
    //   cwd: FOLDERS.www,
    //   index: 'tablet.html',
    //   remove: [
    //     'css/smartphone-*.min.css',
    //     'smartphone.html'
    //   ]
    // },
    'watch': [{
      cwd: FOLDERS.src,
      src: [
        PATTERNS.images,
        PATTERNS.fonts,
        PATTERNS.json,
        '!modules/**/{config,i18n}/' + PATTERNS.json
      ],
      tasks: ['copy']
    }, {
      src: FOLDERS.modules + '**/i18n/**' + PATTERNS.i18n + '.json',
      tasks: ['i18n']
    }, {
      cwd: FOLDERS.modules,
      src: [
        '**/config/' + PATTERNS.json,
        PATTERNS.pug
      ],
      tasks: ['templates']
    }, {
      src: FOLDERS.styles + PATTERNS.sass,
      tasks: ['styles']
    }, {
      src: FOLDERS.root + '{package,project}.json',
      tasks: ['constants']
    }, {
      src: [
        FOLDERS.modules + PATTERNS.js,
        FOLDERS.src + PATTERNS.html,
        FOLDERS.root + 'bower.json'
      ],
      tasks: ['inject']
    }],
    'test.e2e': {
      cwd: FOLDERS.test + 'e2e/',
      src: PATTERNS.spec
    },
    'test.unit': {
      cwd: FOLDERS.test + 'unit/',
      src: PATTERNS.spec,
      app: [
        FOLDERS.www + 'modules/' + PATTERNS.js,
        '!' + FOLDERS.www + 'modules/**/{smartphone,tablet}/!(templates.js)'
      ]
    }
  };
});
