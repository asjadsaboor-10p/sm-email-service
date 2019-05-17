import * as convict from 'convict';

export interface IConfig {
  env: string;
  server: {
    port: number;
  };
  api: {
    baseURL: string;
  };
  email: {
    fromEmail: string;
    sendgridAPIKey: string;
    mailgunAPIKey: string;
    mailgunDOMAIN: string;
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
  email: {
    fromEmail: {
      format: String,
      env: 'FROM_EMAIL',
      default: 'sm-email-service@yopmail.com',
    },
    sendgridAPIKey: {
      format: String,
      env: 'API_KEY_SENDGRID',
      default: '',
    },
    mailgunAPIKey: {
      format: String,
      env: 'API_KEY_MAILGUN',
      default: '',
    },
    mailgunDOMAIN: {
      format: String,
      env: 'MAILGUN_DOMAIN',
      default: '',
    },
  },
});

config.validate({ allowed: 'strict' });

export default config.getProperties();
