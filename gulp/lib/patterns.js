'use strict';

var all = '**/*';

/**
 * Build common patterns contants.
 * @param {Array} locales - Application supported locales.
 * @return {Object}
 */
function patterns(locales) {
  return {
    ALL: all,
    CSS: all + '.css',
    FONTS: all + '.{ttf,eot,woff,svg}',
    HTML: all + '.html',
    IMAGES: all + '.{png,jpg,gif,svg,ico}',
    PUG: all + '.pug',
    JS: all + '.js',
    JSON: all + '.json',
    SASS: all + '.sass',
    SPEC: all + '.spec.js',
    I18N: locales.length > 1 ? '{' + locales.join(',') + '}' : locales[0]
  };
}

module.exports = patterns;
