module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    /* A babel plugin that is only used in production. */
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
