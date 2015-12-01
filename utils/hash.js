var crypto = require('crypto');
var len = 128;
var iterations = 12000;

/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `pass` and invoke `fn(err, salt, hash)`.
 *
 * @param {Object} password to hash
 * @param {Object} salt - optinal
 * @param {Function} callback
 * @api public
 */
module.exports = function (password, salt, callback) {
    if (3 == arguments.length) {
        crypto.pbkdf2(pwd, salt, iterations, len, fn);
    } else {
        callback = salt;
        crypto.randomBytes(len, function (err, salt) {
            if (err) return fn(err);
            salt = salt.toString('base64');

            crypto.pbkdf2(pwd, salt, iterations, len, function (err, hash) {
                if (err) return callback(err);
                fn(null, salt, hash);
            });
        });
    }
};