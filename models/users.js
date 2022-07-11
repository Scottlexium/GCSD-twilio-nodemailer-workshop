const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// user schema
const user = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    todo:{
        type:Array,
        required: true
    }
}, {timeseries:true})
// user model
const User = mongoose.model('User', user);
module.exports = User;
