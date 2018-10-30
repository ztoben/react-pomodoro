const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = () => {
  return {
    entry: [
      'react-hot-loader/patch',
      './src/index.js'
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(scss|css)$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.html$/,
          use: [{
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }]
        },
        {
          test: /\.(jpg|png)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 25000,
            },
          },
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "index.html"
      }),
      new FaviconsWebpackPlugin('./assets/favicon.png')
    ],
    devServer: {
      compress: true,
      contentBase: './dist',
      hot: true,
      open: true,
      port: 9999
    }
  };
};
