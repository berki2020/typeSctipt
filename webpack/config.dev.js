/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const plugins = require('./plugins');
const commonLoaders = require('./commonLoaders');
const chunksOptimization = require('./chunksOptimization');
/* eslint-enable import/no-extraneous-dependencies */

const context = path.resolve(__dirname, '../');

module.exports = {
	context,
	mode: 'development',
	entry: {
		all: [
			require.resolve('core-js/stable'),
			require.resolve('regenerator-runtime/runtime'),
			require.resolve('jquery'),
			'./src/js/index.js',
			'./src/styl/all.styl',
		],
		fonts: './src/styl/fonts.styl',
		images: './webpack/images.js',
	},

	output: {
		filename: 'js/[name].[contenthash].js',
		path: path.resolve(context, 'dev/'),
		pathinfo: true,
	},

	resolve: {
		alias: {
			jquery: path.resolve(context, 'node_modules/jquery/src/jquery.js'),
		},
	},

	module: {
		rules: [...commonLoaders],
	},

	target: 'web',
	devtool: 'eval',
	stats: {
		colors: true,
		modules: false,
	},
	watch: true,
	watchOptions: {
		poll: 1000,
		ignored: /node_modules/,
	},

	plugins: [
		...plugins,
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: {
				baseDir: 'dev',
				directory: true,
			},
			startPath: '/index.html',
		}),
	],

	optimization: chunksOptimization,
};
