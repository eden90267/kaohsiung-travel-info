const path = require('path');
const webpack = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

const ENV = process.env.NODE_ENV || 'development';
const DEV_MODE = ENV === 'development';
console.log(`DEV_MODE:${DEV_MODE}`);

const toFilename = (name, ext = 'js') => {
  const units = [name, '.', ext];
  if (!DEV_MODE) {
    const hashStr = (ext === 'css' ? '-[contenthash]' : '-[chunkhash]');
    units.splice(1, 0, hashStr);
  }
  return units.join('');
};

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: {
    app: ['./js/app.js'],
    vendor: ['jquery', 'bootstrap-sass/assets/javascripts/bootstrap.min', 'bootstrap-sass/assets/stylesheets/_bootstrap.scss']
  },
  output: {
    filename: toFilename('[name]'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: DEV_MODE ? 'http://localhost:3000/' : '',
  },
  resolve: {
    modules: [
      path.resolve('src/img'),
      path.resolve('src/css'),
      path.resolve('src/js'),
      path.resolve('node_modules'),
    ],
    extensions: [".js"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',// presets 搬到 .babelrc
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {sourceMap: true},
          },
            {
              loader: 'sass-loader',
              options: {sourceMap: true},
            },
          ],
        }),
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|ico)(\?\S*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              name: "[path][name].[ext]?[hash:10]",
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new CommonsChunkPlugin({
      names: 'vendor',
      minChunks: Infinity, // assing `Infinity` just creates the commons chunk, but moves no modules into it.
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new ExtractTextPlugin(toFilename("css/[name]", "css")),
    new ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
  ],
  devServer: {
    contentBase: "dist",
    port: 3000,
    stats: {
      chunks: false,
    },
  },
};