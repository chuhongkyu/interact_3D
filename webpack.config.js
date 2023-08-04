const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webpackMode = process.env.NODE_ENV || 'development';

module.exports = {
	mode: webpackMode,
	entry: {
		index: './src/index.js', // index.html에 사용될 entry point
		main: './src/main.js',   // game.html에 사용될 entry point
	},
	output: {
		path: path.resolve('./dist'),
		filename: '[name].min.js'
	},
	devServer: {
		liveReload: true
	},
	optimization: {
		minimizer: webpackMode === 'production' ? [
			new TerserPlugin({
				terserOptions: {
					compress: {
						drop_console: true
					}
				}
			})
		] : [],
		splitChunks: {
			chunks: 'all'
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader'],
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
			chunks: ['index'], 
			minify: process.env.NODE_ENV === 'production' ? {
				collapseWhitespace: true,
				removeComments: true,
			} : false,

			favicon: './src/favicon.ico',
		}),
		new HtmlWebpackPlugin({
			filename: 'game.html',
			template: './src/game.html',
			chunks: ['main'], 
			minify: process.env.NODE_ENV === 'production'
			  ? {
				  collapseWhitespace: true,
				  removeComments: true,
				}
			  : false,
			favicon: './src/favicon.ico', // Favicon 경로 추가 (필요한 경우)
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "./src/main.css", to: "./main.css" },
				{ from: "./src/images", to: "./images" },
				{ from: "./src/models", to: "./models" },
				{ from: "./src/fonts", to: "./fonts" },
			],
		})
	]
};
