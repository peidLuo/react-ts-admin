const {
  override,
  fixBabelImports,
  addWebpackModuleRule,
  addWebpackAlias,
  overrideDevServer
} = require('customize-cra');
const path = require('path');

const mockServer = require('./mock/mock-server.js');

const addMock = () => config => {
  config.after = mockServer;
  return config;
};

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    }),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    }),
    addWebpackModuleRule({
      test: /\.less$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          }
        },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
        }
      ],
      sideEffects: true
    })
  ),
  devServer: overrideDevServer(addMock())
};
