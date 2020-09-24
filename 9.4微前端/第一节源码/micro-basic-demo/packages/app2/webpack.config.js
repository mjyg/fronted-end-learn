// module federation
const ModuleFederationPlugin = require('webpack').container
  .ModuleFederationPlugin;
/**
 *  @type {import ('webpack').Configuration)}
 */
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      library: { type: 'var', name: 'app2' },
      exposes: {
        './Button': '.src/Button',
      },
      filename: 'remoteEntry.js',
      shared: {},
    }),
  ],
};
