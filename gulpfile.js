/*eslint-env node */
/*eslint quote-props: 0 */

'use strict';

require('./gulp/load')(function tasksSettings(FOLDERS, PATTERNS) {
  var NG_LOCALES = 'angular-locale_' + PATTERNS.I18N.toLowerCase() + '.js';

  return {
    'clean.cordova': {
      src: [
        FOLDERS.ROOT + 'config.xml',
        FOLDERS.PLATFORMS,
        FOLDERS.PLUGINS,
        FOLDERS.WWW
      ]
    },
    'setup.config': {
      src: FOLDERS.SRC + 'config.xml',
      dest: FOLDERS.ROOT
    },
    'copy.src': {
      cwd: FOLDERS.SRC,
      src: [
        PATTERNS.IMAGES,
        PATTERNS.FONTS,
        PATTERNS.HTML,
        PATTERNS.JSON,
        PATTERNS.JS,
        '!modules/*/{config,i18n}/' + PATTERNS.JSON
      ],
      dest: FOLDERS.WWW
    },
    'copy.favicon': {
      cwd: FOLDERS.ASSETS + 'resources/',
      src: 'favicon.ico',
      dest: FOLDERS.WWW
    },
    'constants': {
      module: 'app'
    },
    'i18n': {
      src: FOLDERS.MODULES + '*/i18n/**/' + PATTERNS.I18N + '.json',
      module: 'app.i18n'
    },
    'templates': {
      cwd: FOLDERS.MODULES,
      src: {
        smartphone: '*/smartphone/' + PATTERNS.PUG,
        tablet: '*/tablet/' + PATTERNS.PUG,
        web: '*/web/' + PATTERNS.PUG
      },
      module: 'app'
    },
    'styles': {
      src: FOLDERS.STYLES + '{shared,smartphone,tablet,web}.sass',
      dest: FOLDERS.WWW + 'css/'
    },
    'inject.lib': {
      cwd: FOLDERS.WWW,
      src: {
        smartphone: 'smartphone.html',
        tablet: 'tablet.html',
        web: 'index.html'
      }
    },
    'inject.src': {
      cwd: FOLDERS.WWW,
      src: '{smartphone,tablet,index}.html',
      sections: {
        shared: [
          'css/shared.css',
          'modules/' + PATTERNS.JS,
          '!modules/*/{smartphone,tablet,web}/' + PATTERNS.JS
        ],
        smartphone: [
          'css/smartphone.css',
          'modules/*/smartphone/' + PATTERNS.JS
        ],
        tablet: [
          'css/tablet.css',
          'modules/*/tablet/' + PATTERNS.JS
        ],
        web: [
          'css/web.css',
          'modules/*/web/' + PATTERNS.JS
        ]
      }
    },
    'build.useref': {
      src: FOLDERS.WWW + '{smartphone,tablet,index}.html'
    },
    'build.rev': {
      cwd: FOLDERS.WWW,
      src: [
        'images/' + PATTERNS.IMAGES,
        'fonts/' + PATTERNS.FONTS,
        'lib/lib.min.{css,js}',
        'modules/*.min.js',
        'css/*.min.css'
      ]
    },
    'build.rev.replace': {
      cwd: FOLDERS.WWW,
      src: [
        '{smartphone,tablet,index}.html',
        'lib/lib-*.min.{css,js}',
        'modules/*-*.min.js',
        'css/*-*.min.css'
      ]
    },
    'build.clean': {
      cwd: FOLDERS.WWW,
      src: [
        PATTERNS.ALL,
        '!{css,fonts,images,lib,modules}/',
        '!css/*-*.min.css',
        '!images/**/',
        '!images/' + PATTERNS.IMAGES,
        '!lib/lib-*.min.{css,js}',
        '!lib/{angular-i18n,ionic}/',
        '!lib/angular-i18n/' + NG_LOCALES,
        '!lib/ionic/release/',
        '!lib/ionic/release/fonts/',
        '!{fonts,lib/ionic/release/fonts}/' + PATTERNS.FONTS,
        '!modules/*-*.min.js',
        '!' + PATTERNS.JSON,
        '!' + PATTERNS.HTML,
        '!*.*',
        'rev-manifest.json'
      ]
    },
    'watch': [{
      cwd: FOLDERS.SRC,
      src: [
        PATTERNS.IMAGES,
        PATTERNS.FONTS,
        PATTERNS.JSON,
        '!modules/*/{config,i18n}/' + PATTERNS.JSON
      ],
      run: ['copy']
    }, {
      src: FOLDERS.MODULES + '*/i18n/**/' + PATTERNS.I18N + '.json',
      run: ['i18n']
    }, {
      cwd: FOLDERS.MODULES,
      src: [
        '*/config/' + PATTERNS.JSON,
        PATTERNS.PUG
      ],
      run: ['templates']
    }, {
      src: FOLDERS.STYLES + PATTERNS.SASS,
      run: ['styles']
    },/* {
      src: FOLDERS.ROOT + '{package,project}.json',
      run: ['constants'] // FIXME: does not refresh anymore
    }, */{
      src: [
        FOLDERS.MODULES + PATTERNS.JS,
        FOLDERS.SRC + PATTERNS.HTML,
        FOLDERS.ROOT + 'bower.json'
      ],
      run: ['inject']
    }],
    'test.e2e': {
      cwd: FOLDERS.TEST + 'e2e/',
      src: PATTERNS.SPEC
    },
    'test.unit': {
      cwd: FOLDERS.TEST + 'unit/',
      src: PATTERNS.SPEC,
      app: [
        FOLDERS.WWW + 'modules/' + PATTERNS.JS,
        '!' + FOLDERS.WWW + 'modules/*/{smartphone,tablet,web}/!(templates.js)'
      ]
    }
  };
});
