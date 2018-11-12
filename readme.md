#### Passport OAUTH (Google, Facebook)

To Test This

- Create appKeys.ks
```sh
$ cd mtis-node-passport-sociallogins
$ touch keys/appKeys.js
```
 
- Update appKeys
```sh
$ cd mtis-node-passport-sociallogins

#Update keys/appKeys.js

const AppKeys = {
  HTTP_PORT: <YOUR_HTTP_PORT>,
  HTTPS_PORT: <YOUR_HTTPS_PORT>,
  DB_TYPE: <YOUR_DB_TYPE>,
  DB_HOST: <YOUR_HOSTNAME>,
  DB_PORT: <YOUR_DB_PORT>,
  DB_USER: <YOUR_DB_USER>,
  DB_PASS: <YOUR_DB_PASSWORD>,
  DB_NAME: <YOUR_DB_NAME>,
  SESSION_SECRET: <YOUR_SESSION_SECRET_KEY>,
  FACEBOOK_APPID: <YOUR_FACEBOOK_APP_ID>,
  FACEBOOK_APPSECRET: <YOUR_FACEBOOK_APP_SECRET>,
  GOOGLE_CLIENTID: <YOUR_GOOGLE_CLIENTID>,
  GOOGLE_CLIENTSECRET: <YOUR_GOOGLE_CLIENT_SECRET>,
  FACEBOOK_CALLBACK_URL : <YOUR_FACEBOOK_CALLBACK_URL>,
  GOOGLE_CALLBACK_URL : <YOUR_GOOGLE_CALLBACK_URL>,
}

module.exports = AppKeys
```

- Install Package Dependencies
```sh
$ cd mtis-node-passport-sociallogins
$ yarn install

#Or, with npm
$ npm install
```

- Run App
```sh
$ cd mtis-node-passport-sociallogins
$ yarn start-app
```