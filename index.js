/*!
 * gh-status-get | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/gh-status-get
*/
'use strict';

const util = require('util');

const fettucine = require('fettuccine');

module.exports = function ghStatusGet(...args) {
  if (args.length !== 1 && args.length !== 2) {
    return Promise.reject(new TypeError(
      'Expected 1 or 2 arguments (string[, object]), but received ' +
      (args.length === 0 ? 'no' : String(args.length)) +
      ' arguments.'
    ));
  }

  const apiPath = args[0];

  if (typeof apiPath !== 'string') {
    return Promise.reject(new TypeError(
      util.inspect(apiPath) +
      ' is not a string. Expected a path part of the Github Status API URL, for example' +
      ' \'api/status.json\' and \'api/messages.json\'. https://status.github.com/api'
    ));
  }

  if (!/^\/?.+\/?.+\.json$/.test(apiPath)) {
    return Promise.reject(new Error(
      'Expected a path part of the Github Status API URL, ' +
      'but received ' + util.inspect(apiPath) + '. ' +
      'it must be in the form (api/)name.json, ' +
      'for example \'api.json\' and \'api/daily-summary.json\'. https://status.github.com/api'
    ));
  }

  const options = Object.assign({method: 'get'}, args[1]);

  const methodTypeIsString = typeof options.method === 'string';

  if (!methodTypeIsString || !/^get$/i.test(options.method)) {
    return Promise.reject(new (methodTypeIsString ? Error : TypeError)(
      'Invalid `method` option: ' + util.inspect(options.method) + '. ' +
      'If `method` option is provided, it must be nothing but \'GET\' ' +
      'since Github Status API only accepts GET requests.'
    ));
  }

  return fettucine(apiPath, Object.assign({
    json: true,
    baseUrl: 'https://status.github.com/'
  }, options))
  .then(function checkGithubStatusApiResponseStatusCode(response) {
    if (response.statusCode < 200 || 299 < response.statusCode) {
      const error = new Error(`${response.statusCode} ${response.statusMessage}`);
      error.response = response;

      return Promise.reject(error);
    }

    return Promise.resolve(response);
  });
};
