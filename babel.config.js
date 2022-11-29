module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [[
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assetsMap': './src/assets',
          '@componentsMap': './src/components',
          '@routesMap': './src/routes',
          '@screensMap': './src/screens',
          '@storageMap': './src/storage',
          '@themeMap': './src/theme',
          '@utilsMap': './src/utils',
        }
      }
    ]]
  };
};
