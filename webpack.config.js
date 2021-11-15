let path = require('path');
const webpack = require("webpack");


const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
	src: path.join(__dirname, './src'),
	dist: path.join(__dirname, './dist'),
	assets: 'assets/',
}

let mode = "development";
let target = "web";

if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

if (process.env.SERVE) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
    
    mode: mode,
    entry: {
        app: `${PATHS.src}/index.js`,
    },

    output: {
        path: PATHS.dist,
        // filename: `${PATHS.assets}js/bundle.js`
        filename: `bundle[name].js`
    },

  optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /[\\/]node_modules[\\/]/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                // include: path.resolve(__dirname, 'src'),
		            exclude: '/node_modules/',
                use: [{
                    loader: 'babel-loader',
                    options: {
                      presets: [
                        '@babel/preset-react'
                      ],
                      "compact" : true
                    }
                }]
            },

            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader",
                    {
                      loader: "css-loader",
                      options: {
                        sourceMap: true,
                      },
                    },
                    {
                      loader: "sass-loader",
                      options: {
                        sourceMap: true,
                      },
                    },
                  ],
            }
        ]
    },

    devServer: {
        historyApiFallback: true,
        static: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080
    },

    plugins: [
      // new webpack.HotModuleReplacementPlugin(),
	    new MiniCssExtractPlugin({
	      filename: `${PATHS.assets}css/[name].[hash].css`,
	      chunkFilename: '[id].css',
	    }),

	    new HtmlWebpackPlugin({
        template: './public/index.html'
      })
	],

  target: target,

  devtool: "source-map",

  resolve: {
      extensions: ['.js', '.jsx']
  }

}