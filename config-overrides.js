const isProduction = process.env.NODE_ENV === "production";

module.exports = function override(config) {
  if (isProduction && config.optimization && Array.isArray(config.optimization.minimizer)) {
    config.optimization.minimizer.forEach((minimizer) => {
      if (minimizer && minimizer.constructor && minimizer.constructor.name === "TerserPlugin") {
        const options = minimizer.options || {};
        const terserOptions =
          options.minimizer && options.minimizer.options
            ? options.minimizer.options
            : (options.terserOptions = options.terserOptions || {});
        terserOptions.compress = {
          ...(terserOptions.compress || {}),
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log"],
        };
      }
    });
  }
  return config;
};
