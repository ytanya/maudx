const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        min: 6,
        max: 255
    },
    firstname:{
        type:String,
        required: true,
        min: 1,
        max: 255
    },
    lastname:{
        type:String,
        required: true,
        min: 1,
        max: 255
    },
    phone:{
        type:String,
        required: false,
        min: 6,
        max: 255
    },
    password:{
        type:String,
        required: true,
        min: 8,
        max: 255
    },
    createdDate:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
