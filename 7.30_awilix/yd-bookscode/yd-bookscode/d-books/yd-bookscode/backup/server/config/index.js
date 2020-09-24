import { extend } from 'lodash';
import { join } from 'path';

let config = {
  viewDir: join(__dirname, '..', 'views'),
  staticDir: join(__dirname, '..', 'assets'),
};
if (process.env.NODE_ENV === 'development') {
  let localConfig = {
    port: 8081,
    memoryFlag: false,
  };
  config = extend(config, localConfig);
}
if (process.env.NODE_ENV === 'production') {
  let prodConfig = {
    port: 8082,
    memoryFlag: 'memory',
  };
  config = extend(config, prodConfig);
}

export default config;
