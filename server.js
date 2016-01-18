

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
// var pkg = require('./package.json');

var HOST = '0.0.0.0';
var PORT = 3000;

var PROXY_HOST = HOST;
var PROXY_PORT = PORT + 1;

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true,
    },
    proxy: {
        '/api*': 'http://' + PROXY_HOST + ':' + PROXY_PORT + '/',
    },
}).listen(PORT, HOST, function (err) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:' + PORT);
});




/**
 * Fake API
 */

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());

// list here the apis you plan to use
fs.readdirSync(path.join(__dirname, 'app', 'server'))
    .filter(i => i.substr(0, 1) !== '.')
    .filter(i => i.substr(0, 1) !== '_')
    .forEach(function (api) {
        app.use('/api', require('./app/server/' + api));
    }
);

app.listen((PORT + 1), function () {
    // var port = server.address().port;
    console.log('Fake API /dist available at http://%s:%s', PROXY_HOST, PROXY_PORT);
});
