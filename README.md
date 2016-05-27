# gh-status-get

[![NPM version](https://img.shields.io/npm/v/gh-status-get.svg)](https://www.npmjs.com/package/gh-status-get)
[![Build Status](https://travis-ci.org/shinnn/gh-status-get.svg?branch=master)](https://travis-ci.org/shinnn/gh-status-get)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/gh-status-get.svg)](https://coveralls.io/github/shinnn/gh-status-get?branch=master)
[![Dependency Status](https://david-dm.org/shinnn/gh-status-get.svg)](https://david-dm.org/shinnn/gh-status-get)
[![devDependency Status](https://david-dm.org/shinnn/gh-status-get/dev-status.svg)](https://david-dm.org/shinnn/gh-status-get#info=devDependencies)

A [Node](https://nodejs.org/) module to create a [GET](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3) request to the [Github Status](https://status.github.com/) API

```javascript
const ghStatusGet = require('gh-status-get');

ghStatusGet('api/status.json').then(({body}) => {
  body; //=> {status: 'good', last_updated: '2016-05-25T11:15:24Z'}
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install gh-status-get
```

## API

```javascript
const ghStatusGet = require('gh-status-get');
```

### ghStatusGet(*url* [, *options*])

*url*: `String` (a "path" part of the Github Status API URL, for example `api.json` and `api/status.json`)  
*options*: `Object` ([`Request` options](https://github.com/request/request#requestoptions-callback), except for `method` option)  
Return: `Object` ([`Promise`](https://promisesaplus.com/) instance)

It makes a `GET` request to the [Github Status API](https://status.github.com/api) and returns a promise.

When the API request finishes successfully, the promise will be [*fulfilled*](https://promisesaplus.com/#point-26) with the  [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_http_incomingmessage) object with the additional `body` property that contains a JSON object of the API response.

When the API request fails, the promise will be [*rejected*](https://promisesaplus.com/#point-30) with an error.

```javascript
const ghStatusGet = require('gh-status-get');

ghStatusGet('api/status.json').then(response => {
  response.body.status; //=> 'good'
  response.statusCode; //=> 200
});
```

## License

Copyright (c) 2016 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
