const express = require('express');
const prerender = require('prerender-node');
const path = require('path');

// Load from env vars
const port = process.env.PORT || 9000;
const indexHtml = process.env.INDEX_HTML;
const prerenderToken = process.env.PRERENDER_TOKEN;

const app = express();

// Use prerender io middleware
app.use(require('prerender-node').set('prerenderToken', 'p3NICJn2V2uodfrSquJr'));

// Serve index.html on every url.
app.get('*', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile(path.resolve('./dist/index.ssr.html'));
});

console.log(`listening on ${port}`);
//app.listen(port);

module.exports = app;
