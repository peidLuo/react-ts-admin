/* eslint-disable global-require */

const fs = require('fs');

const DEFAULT_EXCLUDE_DIR = /^\./;
const DEFAULT_FILTER = /^([^.].*)\.js(on)?$/;
const DEFAULT_RECURSIVE = true;

function identity(val) {
  return val;
}

module.exports = function requireAll(options) {
  const dirname = typeof options === 'string' ? options : options.dirname;
  const excludeDirs = options.excludeDirs === undefined ? DEFAULT_EXCLUDE_DIR : options.excludeDirs;
  const filter = options.filter === undefined ? DEFAULT_FILTER : options.filter;
  const modules = {};
  const recursive = options.recursive === undefined ? DEFAULT_RECURSIVE : options.recursive;
  const resolve = options.resolve || identity;
  const map = options.map || identity;

  // eslint-disable-next-line no-shadow
  function excludeDirectory(dirname) {
    return !recursive || (excludeDirs && dirname.match(excludeDirs));
  }

  function filterFile(filename) {
    if (typeof filter === 'function') {
      return filter(filename);
    }

    const match = filename.match(filter);
    if (!match) return '';

    return match[1] || match[0];
  }

  const files = fs.readdirSync(dirname);

  files.forEach(file => {
    const filepath = `${dirname}/${file}`;
    if (fs.statSync(filepath).isDirectory()) {
      if (excludeDirectory(file)) return;

      const subModules = requireAll({
        dirname: filepath,
        filter,
        excludeDirs,
        map,
        resolve
      });

      if (Object.keys(subModules).length === 0) return;
      if (modules[map(file, filepath)]) {
        modules[`${map(file, filepath)}_folder`] = subModules;
      } else {
        modules[map(file, filepath)] = subModules;
      }
    } else {
      const name = filterFile(file);
      if (!name) return;

      const urlPath = filepath.match(/(?<=mockData).*(?=.js)/)[0];
      if (modules[map(name, filepath)]) {
        /* eslint-disable-next-line import/no-dynamic-require */
        modules[`${map(name, filepath)}_file`] = resolve(require(filepath));
        // 配置mock的url参数为文件路径
        modules[`${map(name, filepath)}_file`].url = urlPath;
      } else {
        /* eslint-disable-next-line import/no-dynamic-require */
        modules[map(name, filepath)] = resolve(require(filepath));
        // 配置mock的url参数为文件路径
        modules[map(name, filepath)].url = urlPath;
      }
    }
  });

  return modules;
};
