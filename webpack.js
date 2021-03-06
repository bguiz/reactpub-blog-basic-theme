'use strict';


module.exports = getWebpackConfig;

function getWebpackConfig(options) {
  const path = require('path');

  const extractTextPlugin = require('extract-text-webpack-plugin');
  const copyWebpackPlugin = require('copy-webpack-plugin');
  const reactpubWebpack = require('reactpub/webpack');

  let webpackConfig = reactpubWebpack({
    data: options.data,
  });

  let extractCss = new extractTextPlugin('[name].css', {
    allChunks: true,
  });

  let copyWebpack = new copyWebpackPlugin([
    {
      from: 'node_modules/font-awesome/fonts',
      to: '3rd-party/font-awesome/fonts',
      force: true,
    },
    {
      from: 'node_modules/font-awesome/css',
      to: '3rd-party/font-awesome/css',
      force: true,
    },
    {
      from: 'node_modules/highlight.js/styles/dracula.css',
      to: '3rd-party/highlight-js/css/dracula.css',
      force: true,
    }
  ], {
    ignore: [
    ],
  });

  let plugins = webpackConfig.plugins;
  plugins.push(extractCss);
  plugins.push(copyWebpack);

  let loaders = webpackConfig.module.loaders;
  loaders.push({
    test: /.jsx?$/,
    loader: 'babel-loader',
    exclude: function(absPath) {
      if (!absPath.match(/node_modules/)) {
        // We include anything that is not in node_modules
        return false;
      }
      // We include reactpub and reactpub themes
      return (!absPath.match(/node_modules\/reactpub/));
    },
    query: {
      cacheDirectory: true,
      presets: [
        'babel-preset-es2015',
        'babel-preset-react'
      ],
      plugins: [
        'babel-plugin-transform-object-assign'
      ]
    }
  });
  loaders.push({
    test: /\.css$/,
    loader: extractTextPlugin.extract(
      'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
  });

  return webpackConfig;
}
