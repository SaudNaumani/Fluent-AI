module.exports = {
  entry: "./public/js/index.js",
  mode: "development",
  output: {
    path: __dirname + "/public/js/dist",
    publicPath: "dist",
    filename: "bundle.js"
  },
  devtool: "sourcemap"
};
