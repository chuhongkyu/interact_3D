const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpackMode = process.env.NODE_ENV || 'development';

module.exports = {
	mode: webpackMode,
	entry: {
		index: './src/index.js',
		game: './src/game.js',
	},
	output: {
		path: path.resolve('dist'),
		filename: '[name].min.js',
		clean: true,
	},
	devServer: {
		port: 8080,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
				  loader: 'babel-loader',
				  options: {
					presets: ['@babel/preset-env']
				  }
				}
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]                
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
			chunks: ['index'], 
		}),
		new HtmlWebpackPlugin({
			filename: 'game.html',
			template: './src/game.html',
			chunks: ['game'], 
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "./src/assets", to: "./assets" },
				{ from: "./src/css", to: "./css" },
				{ from: "./src/favicon.ico", to: "./favicon.ico" },
			],
		})
	]
};
