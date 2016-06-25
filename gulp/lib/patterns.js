'use strict';

var all = '**/*';

function patterns(locales) {
  return {
    all: all,
    css: all + '.css',
    fonts: all + '.{ttf,eot,woff,svg}',
    htaccess: '**/.htaccess', // TODO
    html: all + '.html',
    images: all + '.{png,jpg,gif,svg}',
    jade: all + '.jade',
    js: all + '.js',
    json: all + '.json',
    pdf: all + '.pdf',
    sass: all + '.sass',
    spec: all + '.spec.js',
    i18n: locales.length > 1 ? '{' + locales.join(',') + '}' : locales[0]
  };
}

module.exports = patterns;
