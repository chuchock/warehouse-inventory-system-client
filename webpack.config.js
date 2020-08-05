var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js',
		publicPath: '/'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react'
						]
					}
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			}
		]
	},
	devServer: {
		historyApiFallback: true,
	},
}