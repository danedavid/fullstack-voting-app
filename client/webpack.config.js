const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  // 'mode' option - new in Webpack 4
  mode: 'development',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      // Babel loader for compiling JSX
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // Loader for HTML files
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      // 'url-loader' to load files less than limit as base64 encoded DATA URLs
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      // to load fonts
      {
        test: /\.(otf|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      // SCSS loader
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      // CSS loader
      {
        test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            }
          ]
      }
    ]
  },
  // For injecting source bundle into HTML file
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};

module.exports = config;
