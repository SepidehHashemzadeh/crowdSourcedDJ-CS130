function donothing() {
  return null;
}

require.extensions['.css'] = donothing;
require.extensions['.less'] = donothing;
require.extensions['.scss'] = donothing;
require.extensions['bdd.js'] = donothing;
require.extensions['module.js'] = donothing;
// ..etc