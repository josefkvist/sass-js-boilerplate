// Webpack uses this to work with directories
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = env => {
  const mode = env.NODE_ENV
  return {
  mode: mode,

  // Path to your entry point. From this file Webpack will begin his work
  entry: { 
      bilmetro: './src/scss/theme-1.scss',
      trucks: './src/scss/theme-2.scss',
      app: './src/javascript/app.js',
      // vendor: ['jquery', 'bootstrap']
},

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  module: {
      rules:[
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
        },
        {
          // Apply rule for .sass, .scss or .css files
          test: /\.(sa|sc|c)ss$/,
    
          // Set loaders to transform files.
          // Loaders are applying from right to left(!)
          // The first loader will be applied after others
          use: [
                {
                loader:  MiniCssExtractPlugin.loader,
                  

                  options: {
                  }
                },
                {
                  // This loader resolves url() and @imports inside CSS
                  loader: "css-loader",
                  options: {
                    sourceMap:true,
                  }
                },
                {
                  // Then we apply postCSS fixes like autoprefixer and minifying
                  loader: "postcss-loader",
                  options: {
                    sourceMap:true,
                }
                },
                {
                  // First we transform SASS to standard CSS
                  loader: "sass-loader",
                  options: {
                    implementation: require("sass"),
                    sourceMap:true,

                  }
                }
                ]
        }
      ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: '[id].css',
    }),
    
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
      cleanAfterEveryBuildPatterns: ['trucks.js*', 'bilmetro.js*']
    }),
  
  
  ],
  watch: env.NODE_ENV === 'development',
  devtool: 'source-maps',
  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript 
  // minifying and other thing so let's set mode to development
};
};