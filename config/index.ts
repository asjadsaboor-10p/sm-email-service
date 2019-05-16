import * as convict from 'convict';

export interface IConfig {
  env: string;
  server: {
    port: number;
  };
  api: {
    baseURL: string;
  };
}

const config = convict<IConfig>({
  env: {
    format: ['local', 'production', 'development'],
    env: 'NODE_ENV',
    arg: 'node-env',
    default: 'local',
  },
  server: {
    port: {
      format: 'port',
      env: 'NODE_PORT',
      default: 4001,
    },
  },
  api: {
    baseURL: {
      format: String,
      env: 'API_BASEURL',
      default: '/api/v1',
    },
  },
});

config.validate({ allowed: 'strict' });

export default config.getProperties();
