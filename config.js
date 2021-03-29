const config = {};

// Used only if https is disabled
config.pep_port = 1027;

// Set this var to undefined if you don't want the server to listen on HTTPS
config.https = {
  enabled: false,
  cert_file: 'cert/cert.crt',
  key_file: 'cert/key.key',
  port: 443
};

config.idm = {
  host: '46.17.108.86',
  port: 3005,
  ssl: false
};

config.app = {
  host: '46.17.108.86',
  port: '1026',
  ssl: false // Use true if the app server listens in https
};

config.organizations = {
  enabled: false,
  header: 'fiware-service'
};

// Credentials obtained when registering PEP Proxy in app_id in Account Portal
config.pep = {
  app_id: '39fe1ee0-4dc9-4bac-9f03-f8dc92f51382',
  username: 'pep_proxy_31ccd0db-0c2b-4c15-a394-21e8d8543491',
  password: 'pep_proxy_bd7c5ef5-4bdb-468c-a874-ff1f0b8d3d95',
  token: {
    secret: '' // Secret must be configured in order validate a jwt
  },
  trusted_apps: []
};

// in seconds
config.cache_time = 30000;

// if enabled PEP checks permissions in two ways:
//  - With IdM: only allow basic authorization
//  - With Authzforce: allow basic and advanced authorization.
//	  For advanced authorization, you can use custom policy checks by including programatic scripts
//    in policies folder. An script template is included there
//
//	This is only compatible with oauth2 tokens engine

config.authorization = {
  enabled: false,
  pdp: 'idm', // idm|authzforce
  azf: {
    protocol: 'http',
    host: 'google.com',
    port: 80,
    custom_policy: undefined // use undefined to default policy checks (HTTP verb + path).
  }
};

// list of paths that will not check authentication/authorization
// example: ['/public/*', '/static/css/']
config.public_paths = [];

config.magic_key = undefined;
config.auth_for_nginx = false;

// canis major endpoint
config.canismajor = {
  endpoint: process.env.CM_NOTIFY || 'http://localhost:4000/notify',
  verbs: ['POST', 'PUT']
};

module.exports = config;
