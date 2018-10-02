var HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var Webpack = require('webpack');
const path = require('path');

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({ template: path.join(__dirname, './public/index.html')   });
var CommonChunksPlugin = new Webpack.optimize.CommonsChunkPlugin({ name: ['vendor', 'manifest'] });

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var UglifyPlugin = new UglifyJsPlugin({
  uglifyOptions: {
    warnings: false,
    compress: true
  }
});

var DefinePlugin = new Webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
});

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'],
    app:  path.join(__dirname, './app/App.js')
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].bundle.js',
  },
  resolve: {
     extensions: ['.js', '.jsx', '.tsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$|\.tsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2017', "stage-0"]
        }
      }
    ]
  },
  plugins: [DefinePlugin, HTMLWebpackPluginConfig, CommonChunksPlugin, UglifyPlugin]
}
