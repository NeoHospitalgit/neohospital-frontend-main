const isProduction = process.env.NODE_ENV === "production";

module.exports = function override(config) {
  if (isProduction && config.optimization && Array.isArray(config.optimization.minimizer)) {
    config.optimization.minimizer.forEach((minimizer) => {
      if (minimizer && minimizer.constructor && minimizer.constructor.name === "TerserPlugin") {
        minimizer.options = minimizer.options || {};
        minimizer.options.terserOptions = minimizer.options.terserOptions || {};
        minimizer.options.terserOptions.compress = {
          ...(minimizer.options.terserOptions.compress || {}),
          drop_console: true,
          drop_debugger: true,
        };
      }
    });
  }
  return config;
};
