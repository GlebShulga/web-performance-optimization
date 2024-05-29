const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  entry: {
    script1: "./src/script1.js",
    script2: "./src/script2.js",
  },
  output: {
    filename: "[name].bundle.js",
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        lodash: {
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          name: "vendors",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  plugins: [new BundleAnalyzerPlugin()],
};
