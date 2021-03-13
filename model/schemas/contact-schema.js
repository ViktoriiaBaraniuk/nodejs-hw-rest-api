const mongoose = require('mongoose')
const { Schema, model } = mongoose;
 
 
const contactSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Set contact name'],   
    },
    email:{
        type: String,
        required: [true, 'Set contact email'],
        unique: true,
    },
    phone:{
        type: String,
        required: [true, 'Set contact email'],

    },
    subscription:{
        type: String,

    },
    password:{
        type: String,
    },
    token:{
        type: String,
        default: '',
    },
},
{
    versionKey: false, timestamps: true})
 
const Contact = model('contact', contactSchema)     
 
 
module.exports = Contact
  