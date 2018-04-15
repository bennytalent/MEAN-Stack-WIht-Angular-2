const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    //uri: 'mongodb://localhost:27017/mean-angular-2',
    uri: 'mongodb://benny:benny@ds133558.mlab.com:33558/angular-2-app', //Production
    secret: crypto,
    //db: 'mean-angular-2'
    db: 'angular-2-app' //Production
};