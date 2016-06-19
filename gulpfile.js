/*eslint-env node */
/*eslint quote-props: 0 */

var load = require('./gulp/load');

load(function tasksSettings(FOLDERS, PATTERNS, I18N) {
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
        PATTERNS.html,
        PATTERNS.htaccess,
        PATTERNS.images,
        PATTERNS.fonts,
        PATTERNS.json,
        '!modules/**/{config,i18n}/' + PATTERNS.json,
        PATTERNS.pdf,
        PATTERNS.js
      ],
      dest: FOLDERS.www
    },
    'copy.favicons': {
      cwd: FOLDERS.images + 'favicons/',
      src: {
        // TODO
      },
      dest: FOLDERS.www
    },
    'i18n': {
      src: FOLDERS.modules + '**/i18n/**' + I18N + '.json',
      dest: FOLDERS.www + 'modules/app.i18n/'
    },
    'templates': {
      cwd: FOLDERS.modules,
      src: {
        smartphone: '**/smartphone/' + PATTERNS.jade,
        tablet: '**/tablet/' + PATTERNS.jade
      },
      dest: {
        smartphone: FOLDERS.www + 'modules/app/smartphone/',
        tablet: FOLDERS.www + 'modules/app/tablet/'
      },
      root: 'modules/'
    },
    'styles': {
      src: FOLDERS.styles + '{shared,smartphone,tablet}.sass',
      dest: FOLDERS.www + 'css/'
    },
    'constants': {
      dest: FOLDERS.www + 'modules/app.utils/',
      module: 'app.utils'
    },
    'inject.lib': {
      src: FOLDERS.www + '{smartphone,tablet}.html'
    },
    'inject.src': {
      cwd: FOLDERS.www,
      src: '{smartphone,tablet}.html',
      sections: {
        shared: [
          'css/shared?(.min).css',
          'modules/' + PATTERNS.js,
          '!modules/**/{smartphone,tablet}/' + PATTERNS.js
        ],
        smartphone: [
          'css/smartphone?(.min).css',
          'modules/**/smartphone/' + PATTERNS.js
        ],
        tablet: [
          'css/tablet?(.min).css',
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
        'fonts/' + PATTERNS.fonts,
        'images/' + PATTERNS.images,
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
    'build.clean': { // TODO: resources (json, pdf), etc.
      cwd: FOLDERS.www,
      src: [
        PATTERNS.all,
        '!{css,config,fonts,images,lib,modules,resources}/',
        '!css/*-*.min.css',
        '!{config,fonts,images,resources}/' + PATTERNS.all,
        '!lib/lib-*.min.{css,js}',
        '!lib/{angular-i18n,ionic}/',
        '!lib/angular-i18n/angular-locale_' + I18N.toLowerCase() + '.js',
        '!lib/ionic/release/',
        '!lib/ionic/release/fonts/',
        '!lib/ionic/release/fonts/' + PATTERNS.fonts,
        '!modules/*-*.min.js',
        '!*.*',
        'rev-manifest.json'
      ]
    },
    'web': {
      cwd: FOLDERS.www,
      index: 'tablet.html',
      remove: [
        'css/smartphone-*.min.css',
        'smartphone.html'
      ]
    },
    'watch': [{
      cwd: FOLDERS.src,
      src: [
        PATTERNS.images,
        PATTERNS.fonts,
        PATTERNS.json,
        '!modules/**/{config,i18n}/' + PATTERNS.json,
        PATTERNS.pdf
      ],
      tasks: ['copy']
    }, {
      src: FOLDERS.modules + '**/i18n/**' + I18N + '.json',
      tasks: ['i18n']
    }, {
      cwd: FOLDERS.modules,
      src: [
        '**/config/' + PATTERNS.json,
        PATTERNS.jade
      ],
      tasks: ['templates']
    }, {
      src: FOLDERS.styles + PATTERNS.sass,
      tasks: ['styles']
    }, {
      src: FOLDERS.root + '{package, project}.json',
      tasks: ['constants']
    }, {
      src: [
        FOLDERS.modules + PATTERNS.js,
        FOLDERS.src + PATTERNS.html,
        FOLDERS.root + 'bower.json'
      ],
      tasks: ['inject']
    }],
    'test.e2e': { // TODO: fix tests
      cwd: FOLDERS.test + 'e2e/',
      src: PATTERNS.spec
    },
    'test.unit': { // TODO: fix tests
      cwd: FOLDERS.test + 'unit/',
      src: [
        '{mocks,utils}/' + PATTERNS.js,
        PATTERNS.spec
      ],
      app: FOLDERS.www + 'modules/' + PATTERNS.js
    }
  };
});
