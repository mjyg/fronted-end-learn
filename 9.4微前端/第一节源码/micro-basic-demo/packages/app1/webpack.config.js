// module federation
const ModuleFederationPlugin = require('webpack').container
  .ModuleFederationPlugin;
/**
 *  @type {import ('webpack').Configuration)}
 */
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      library: { type: 'var', name: 'app1' },
      remotes: { app2: 'app2' },
      shared: [],
      filename: 'remoteEntry.js',
    }),
  ],
};
