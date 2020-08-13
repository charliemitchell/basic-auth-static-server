#!/usr/bin/env node

const express = require('express');
const path = require('path');
const args = require('args')
const app = express();
const { BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD, PORT, STATIC_INDEX_FILE = 'index.html' } = process.env
const directory = process.argv.pop()

args.option('single', 'Enable SPA mode', true)

const flags = args.parse(process.argv)

if (BASIC_AUTH_USERNAME && BASIC_AUTH_PASSWORD) {
  app.use(function (req, res, next) {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    if (login && password && login === BASIC_AUTH_USERNAME && password === BASIC_AUTH_PASSWORD) {
      return next()
    }

    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send('Authentication required.')
  })
}

app.use(express.static(directory, { 'index': STATIC_INDEX_FILE }));

if (flags.single) {
  app.use(function(req, res, next) {
    res.sendFile(path.join(directory, STATIC_INDEX_FILE));
  });
}

app.listen(PORT || 3000);
