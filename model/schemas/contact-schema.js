const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose
 
 
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
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'user',               
      }
},
{
    versionKey: false, timestamps: true})
 
const Contact = model('contact', contactSchema)     
 
 
module.exports = Contact
  