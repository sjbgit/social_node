/**
 * Created by sbunke on 1/29/2015.
 */
exports.config = {
    framework: 'mocha',
    specs: [
        'test/e2e/**/*.spec.js'
    ],
    mochaOpts: {
        enableTimeouts: false
    }
    /*
    ,
    onPrepare: function () {
        process.env.PORT = 3001;
        require('./server');
    }
    */
}