const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    resolve(__dirname, 'src') + '/index.jsx'
  ],

  output: {
    filename: 'app.bundle.js',
    path: resolve(__dirname, 'build'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devtool: '#source-map',

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'build'),
    publicPath: '/'
  },

  module: {
      rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
          },
          {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: [
                    ['@babel/preset-env', {'modules': false}],
                    '@babel/preset-react',
                ],
                plugins: [
                  'react-hot-loader/babel',
                  'styled-jsx/babel'
                ]
            }
          },
          {
            test: /\.(png|gif|jp(e*)g|svg)$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 8000,
                name: 'images/[hash]-[name].[ext]'
              }
            }
          },
          {
            test: /\.jsx?$/,
            enforce: 'pre',
            loader: 'eslint-loader',
            exclude: [
              /node_modules/,
              /core-logo.png/
            ],
            options: {
              emitWarning: true,
              configFile: './.eslintrc.json'
            }
          }
      ]
  },

  plugins: [
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template:'template.ejs',
      appMountId: 'react-app-root',
      title: 'YARP',
      filename: resolve(__dirname, 'build', 'index.html'),
      favicon: './src/favicon.ico'
    })
  ]
};