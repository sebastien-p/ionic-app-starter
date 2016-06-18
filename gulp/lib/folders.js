var root = './';
var src = root + 'src/';

function same(file) { return file.base; }

module.exports = {
  same: same,
  root: root,
  assets: root + 'assets/'
  platforms: root + 'platforms/',
  plugins: root + 'plugins/',
  test: root + 'test/',
  www: root + 'www/',
  src: src,
  images: src + 'images/',
  modules: src + 'modules/',
  resources: src + 'resources',
  styles: src + 'styles/'
};
