/**
 * Created by sbunke on 1/15/2015.
 */
var mongoose = require('mongoose')
var url = process.env.MONGODB_URL || process.env.MONGOLAB_URI || 'mongodb://test:test@ds029837.mongolab.com:29837/multivision';
mongoose.connect(url, function () {
    console.log('mongodb connected')
})
module.exports = mongoose
