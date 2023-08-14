const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    }

})

module.exports = mongoose.model('userlist', schema)

