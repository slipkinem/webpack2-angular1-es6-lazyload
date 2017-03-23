const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
  devtool: 'source-map',
  entry: {},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/app\/lib/, /node_modules/],
        use: [
          'ng-annotate-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              ignoreCustomFragments: [/\{\{.*?}}/],
              minimize: true
            }
          }
        ],
        exclude: [/index\.html/]
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract([
          'css-loader',
          'less-loader'
        ])
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract([
          'css-loader',
          'sass-loader'
        ])
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract([
          'css-loader',
          'postcss-loader'
        ])

      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'url-loader?limit=8192,name=img/[name].[hash:6].[ext]'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        use: 'url-loader?importLoaders=1&limit=10000&name=fonts/[name].[hash].[ext]'
      }
    ]
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      hash: true
    }),

    new ExtractTextPlugin({
      filename: 'css/app.[hash].css',
      allChunks: true
    }),
    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor/vendor.[hash].js',
      minChunks: function (module) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    })
  ]
};