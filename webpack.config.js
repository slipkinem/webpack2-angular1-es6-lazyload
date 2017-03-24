const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
  devtool: 'source-map', // 调试工具
  entry: {}, // 入口，
  module: {
    /**
     * 配置loader
     */
    rules: [
      // js loader 顺序，由后往前执行数组里面的loader
      {
        test: /\.js$/,
        exclude: [/app\/lib/, /node_modules/], //不读取
        use: [
          'ng-annotate-loader',
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',  // 防止url-loader读取不到img src
                                    // 在html里面加src要使用相对路径否则找不到 html-loader其实就是自动加了require
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
        use: ExtractTextPlugin.extract([  // css 分离
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
        use: 'url-loader?limit=8192,name=img/[name].[hash:6].[ext]'  // 解析url
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

    // 防止找不到全局变量 $
    new webpack.ProvidePlugin({  // 全局依赖
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new HtmlWebpackPlugin({   // 读取index并会添加静态资源链接，并打上hash
      template: 'client/index.html',
      inject: 'body',
      hash: true
    }),

    new ExtractTextPlugin({  // 分离css后的命名
      filename: 'css/app.[hash].css',
      allChunks: true
    }),
    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({  // 自动判断，提取公共模块
      name: 'vendor',
      filename: 'vendor/vendor.[hash].js',
      minChunks: function (module) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    })
  ]
};