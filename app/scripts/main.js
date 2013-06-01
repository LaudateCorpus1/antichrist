
require.config({
    paths: {
        'jquery': '../components/jquery/jquery',
        'bootstrap': 'vendor/bootstrap',
        'angular': '../components/angular/angular',
        'underscore': '../components/underscore/underscore',
        'q': '../components/q/q',
        'base64': '../components/base64/base64',
        'lib/Crypto': '../components/cryptojs/lib/Crypto',
        'lib/CryptoMath': '../components/cryptojs/lib/CryptoMath',
        'lib/BlockModes': '../components/cryptojs/lib/BlockModes',
        'lib/DES': '../components/cryptojs/lib/DES',
        'lib/AES': '../components/cryptojs/lib/AES',
        'lib/HMAC': '../components/cryptojs/lib/HMAC',
        'lib/MARC4': '../components/cryptojs/lib/MARC4',
        'lib/MD5': '../components/cryptojs/lib/MD5',
        'lib/PBKDF2': '../components/cryptojs/lib/PBKDF2',
        'lib/PBKDF2Async': '../components/cryptojs/lib/PBKDF2Async',
        'lib/Rabbit': '../components/cryptojs/lib/Rabbit',
        'lib/SHA1': '../components/cryptojs/lib/SHA1',
        'lib/SHA256': '../components/cryptojs/lib/SHA256'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jquery'
        },
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'underscore': {
            deps: [],
            exports: '_'
        },
        'base64': {
            deps: [],
            exports: 'window'
        },
        'lib/Crypto': {
            deps: [],
            exports: 'Crypto'
        },
        'lib/CryptoMath': {
            deps: [],
            exports: 'Crypto'
        },
        'lib/BlockModes': {
            deps: [],
            exports: 'Crypto'
        },
        'lib/DES': {
            deps: ['lib/Crypto'],
            exports: 'Crypto'
        },
        'lib/AES': {
            deps: ['lib/Crypto', 'lib/BlockModes', 'lib/PBKDF2'],
            exports: 'Crypto'
        },
        'lib/HMAC': {
            deps: ['lib/Crypto'],
            exports: 'Crypto'
        },
        'lib/MARC4': {
            deps: ['lib/Crypto'],
            exports: 'Crypto'
        },
        'lib/MD5': {
            deps: ['lib/Crypto'],
            exports: 'Crypto'
        },
        'lib/PBKDF2': {
            deps: ['lib/Crypto'],
            exports: 'Crypto'
        },
        'lib/PBKDF2Async': {
            deps: ['lib/Crypto'],
            exports: 'Crypto'
        },
        'lib/Rabbit': {
            deps: ['lib/Crypto'],
            exports: 'Crypto'
        },
        'lib/SHA1': {
            deps: ['lib/Crypto'],
            exports: 'Crypto'
        },
        'lib/SHA256': {
            deps: ['lib/Crypto'],
            exports: 'Crypto'
        },
    }
});

require(['jquery', 'angular', 'app', 'bootstrap'], function ($, angular, app) {
    'use strict';

    angular.bootstrap(document, ['app']);
});
