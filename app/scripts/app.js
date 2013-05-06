/*global define */
define(['crypto'], function (Crypto) {
    'use strict';

    var hash = Crypto.HMAC(Crypto.SHA1, "Message", "Secret Passphrase", {asString: true});

    console.log(btoa(hash));
});
