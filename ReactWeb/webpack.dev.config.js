const path = require('path');
var webpack = require('webpack');
const prod = process.argv.indexOf('-p') !== -1;

var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({ template: path.join(__dirname, './public/index.html')   });

module.exports = {
    entry:  [path.join(__dirname, './app/App.js')],
    output: {
        path: path.join(__dirname, './public') ,
        filename: 'bundle.js'
    },
    resolve: {
       extensions: ['.js', '.jsx', '.tsx']
    },
    devServer: {
        inline: true,
        contentBase: path.join(__dirname, './public'),
        port: 3333
    },
    module: {
      loaders: [{
        test: /\.js$|\.tsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2017', "stage-0"]
        }
      }]
    },
    plugins: [HTMLWebpackPluginConfig]
}
