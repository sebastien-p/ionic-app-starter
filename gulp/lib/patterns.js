'use strict';

var all = '**/*';

/**
 * Build common patterns contants.
 * @param {Array} locales - Application supported locales.
 * @return {Object}
 */
function patterns(locales) {
  return {
    all: all,
    css: all + '.css',
    fonts: all + '.{ttf,eot,woff,svg}',
    html: all + '.html',
    images: all + '.{png,jpg,gif,svg,ico}',
    pug: all + '.pug',
    js: all + '.js',
    json: all + '.json',
    sass: all + '.sass',
    spec: all + '.spec.js',
    i18n: locales.length > 1 ? '{' + locales.join(',') + '}' : locales[0]
  };
}

module.exports = patterns;
