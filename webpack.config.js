const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },

  module: {
    rules: [
      // TypeScript
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // SCSS Modules
      {
        test: /\.module\.scss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {              
              modules: true,
              esModule: false
            },
          },
          'sass-loader',
        ],
      },
      // Глобальные SCSS
      {
        test: /\.scss$/i,
        exclude: /\.module\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // Обычные CSS (без модулей)
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // SVG как React-компоненты
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true, // добавляет viewBox и убирает размеры
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'removeAttrs',
                    params: { attrs: '(width|height)' },
                  },
                  { name: 'removeDimensions', active: true }
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new Dotenv(),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.svg'],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      '@api': path.resolve(__dirname, 'src/api/'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },

  devServer: {
    static: './dist',
    historyApiFallback: true,
    port: 8080,
    open: true,
  },
};
