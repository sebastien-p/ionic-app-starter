/*eslint-env node */
/*eslint quote-props: 0 */

'use strict';

require('./gulp/load')(function tasksSettings(FOLDERS, PATTERNS) {
  var NG_LOCALES = 'angular-locale_' + PATTERNS.I18N.toLowerCase() + '.js';
  var MOMENT_LOCALES = PATTERNS.I18N_EXTENDED.toLowerCase() + '.js';

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
        '!modules/*/{config,i18n}/' + PATTERNS.JSON,
        PATTERNS.JS,
        PATTERNS.CSS
      ],
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
        smartphone: '*/smartphone/' + PATTERNS.PUG
      },
      module: 'app'
    },
    'inject.lib': {
      cwd: FOLDERS.WWW,
      src: {
        smartphone: 'smartphone.html'
      },
      extra: FOLDERS.WWW + 'lib/moment/locale/' + MOMENT_LOCALES
    },
    'inject.src': {
      cwd: FOLDERS.WWW,
      src: '{smartphone,tablet,index}.html',
      sections: {
        shared: [
          'modules/' + PATTERNS.JS,
          '!modules/*/{smartphone,tablet,web}/' + PATTERNS.JS
        ],
        smartphone: [
          'css/smartphone.css',
          'modules/*/smartphone/' + PATTERNS.JS
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
        '!modules/*/{config,i18n}/' + PATTERNS.JSON,
        PATTERNS.CSS
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
      src: [
        FOLDERS.MODULES + PATTERNS.JS,
        FOLDERS.SRC + PATTERNS.HTML,
        FOLDERS.ROOT + 'bower.json'
      ],
      run: ['inject']
    }]
  };
});
