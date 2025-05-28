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
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',   // Вставляет CSS в DOM
          'css-loader',     // Преобразует CSS в модули
          'sass-loader',    // Компилирует SCSS в CSS
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.css',
      '.scss',
      '.svg'
    ],
    plugins: [
      new TsconfigPathsPlugin(),
    ],
    alias: {
      '@api': path.resolve(__dirname, 'src/api/'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    }
  },
  devServer: {
    static: './dist',
    historyApiFallback: true, // для React Router
    port: 8080,
    open: true,
  },
};
