"use strict";

const { resolve } = require("path");

const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: ["babel-polyfill", "./client/index.js"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  mode: "development",
  context: __dirname,
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        include: resolve(__dirname, "client"),
        loader: "babel-loader",
      },
    ],
  },
  // target: "node",
  // externals: [nodeExternals()],
  node: {
    fs: "empty",
  },
};
