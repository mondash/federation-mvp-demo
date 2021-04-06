import { CleanWebpackPlugin } from "clean-webpack-plugin";
import path from "path";
import TsConfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";

const srcPath = path.resolve(__dirname, "../src");
const buildPath = path.resolve(__dirname, "../build");
const tsconfigPath = path.resolve(__dirname, "../tsconfig.json");

const srcFileRegex = /(?!\.test)\.(js|json|ts)$/;

const config: Configuration = {
  mode: "production",
  target: "node",
  entry: srcPath,
  externals: [nodeExternals()],
  output: {
    filename: "main.bundle.js",
    path: buildPath,
  },
  module: {
    rules: [
      {
        test: srcFileRegex,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: [".js", ".json", ".ts"],
    plugins: [new TsConfigPathsPlugin({ configFile: tsconfigPath })],
  },
};

export default config;
