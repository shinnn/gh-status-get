'use strict';

const ghStatusGet = require('.');
const test = require('tape');

test('ghStatusGet()', t => {
  t.plan(12);

  t.strictEqual(ghStatusGet.name, 'ghStatusGet', 'should have a function name.');

  ghStatusGet('api.json').then(response => {
    t.strictEqual(
      response.body.status_url,
      'https://status.github.com/api/status.json',
      'should create an API request.'
    );
  }).catch(t.fail);

  ghStatusGet('/api/aa-pp-ii.json').then(t.fail, err => {
    t.strictEqual(
      err.message,
      '404 Not Found',
      'should fail when it takes wrong URL.'
    );
  }).catch(t.fail);

  ghStatusGet('/api/status.json', {
    baseUrl: 'https://www.npmjs.com/',
    method: 'get'
  }).then(t.fail, err => {
    t.strictEqual(
      err.response.statusCode,
      404,
      'should append `response` to the error.'
    );
  }).catch(t.fail);

  ghStatusGet().then(t.fail, err => {
    t.strictEqual(
      err.message,
      'Expected 1 or 2 arguments (string[, object]), but received no arguments.',
      'should fail when it takes no arguments.'
    );
  }).catch(t.fail);

  ghStatusGet('/api/messages.json', {}, 'foo').then(t.fail, err => {
    t.strictEqual(
      err.message,
      'Expected 1 or 2 arguments (string[, object]), but received 3 arguments.',
      'should fail when it takes more than 2 arguments.'
    );
  }).catch(t.fail);

  ghStatusGet(['1']).then(t.fail, err => {
    t.strictEqual(
      err.message.includes('[ \'1\' ] is not a string.'),
      true,
      'should fail when the first argument is not a string.'
    );
  }).catch(t.fail);

  ghStatusGet('').then(t.fail, err => {
    t.strictEqual(
      err.message.includes('Expected a path part of the Github Status API URL'),
      true,
      'should fail when the first argument is an empty string.'
    );
  }).catch(t.fail);

  ghStatusGet('/').then(t.fail, err => {
    t.strictEqual(
      err.message.includes('but received \'/\''),
      true,
      'should fail when the first argument is a root path.'
    );
  }).catch(t.fail);

  ghStatusGet('Hi').then(t.fail, err => {
    t.strictEqual(
      err.message.includes('for example \'api.json\' and \'api/daily-summary.json\'.'),
      true,
      'should fail when the first argument does\'t end with .json.'
    );
  }).catch(t.fail);

  ghStatusGet('api/messages.json', {method: null}).then(t.fail, err => {
    t.strictEqual(err.name, 'TypeError', 'should fail when `method` option is not a string.');
  }).catch(t.fail);

  ghStatusGet('api/messages.json', {method: 'PUT'}).then(t.fail, err => {
    t.strictEqual(
      err.message.includes('Invalid `method` option: \'PUT\'.'),
      true,
      'should fail when `method` option is not \'GET\'.'
    );
  }).catch(t.fail);
});
