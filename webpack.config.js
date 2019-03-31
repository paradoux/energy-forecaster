const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")
const webpack = require("webpack")
const nodeExternals = require("webpack-node-externals")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

const browserConfig = {
  devtool: "inline-source-map",
  entry: ["babel-polyfill", "./src/client/index.js"],
  output: {
    path: path.resolve(__dirname, "./dist/public"),
    filename: "client.js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader?limit=100000"
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist/public"),
    compress: true,
    port: 3000
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: "src/client/index.html",
      inject: false
    })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
}

const serverConfig = {
  devtool: "inline-source-map",
  entry: ["babel-polyfill", "./src/server/index.js"],
  target: "node",
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "./dist/server"),
    filename: "server.js"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
}

module.exports = [browserConfig, serverConfig]
