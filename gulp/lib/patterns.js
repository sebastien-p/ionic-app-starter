'use strict';

var all = '**/*';

/**
 * Build common patterns contants.
 * @param {Array} locales - Application supported locales.
 * @return {Object}
 */
function patterns(locales) {
  var i18n = locales.join(',');

  return {
    ALL: all,
    CSS: all + '.css',
    FONTS: all + '.{ttf,eot,woff,svg}',
    HTML: all + '.html',
    IMAGES: all + '.{png,jpg,gif,svg,ico}',
    PUG: all + '.pug',
    JS: all + '.js',
    TS: all + '.ts',
    JSON: all + '.json',
    SASS: all + '.sass',
    SPEC: all + '.spec.js',
    I18N: locales.length > 1 ? '{' + i18n + '}' : locales[0],
    I18N_EXTENDED: '{' + i18n.replace(/-(?:[^,]+)/g, '') + ',' + i18n + '}'
  };
}

module.exports = patterns;
