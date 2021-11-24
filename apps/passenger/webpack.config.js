const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "passenger",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  plugins: [
    new ModuleFederationPlugin({
        name: "passenger",
        filename: "remoteEntry.js",
        exposes: {
          './module': './apps/passenger/src/app/passenger/passenger.module.ts',
        },

        shared: {
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: '^12.0.0' },
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: '^12.0.0' },
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: '^12.0.0' },
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: '^12.0.0' },

          ...sharedMappings.getDescriptors()
        }

    }),
    sharedMappings.getPlugin()
  ],
};
