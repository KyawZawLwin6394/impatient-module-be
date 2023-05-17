'use strict';

const mongoose = require('mongoose');
mongoose.promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator');

let FloorSchema = new Schema({
    code: {
        type: String
    },
    name: {
        type: String
    },
    relatedBuilding:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buildings'
    },
    floorCount: {
        type: Number,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

const patient = mongoose.model('Floors', FloorSchema)
module.exports = patient;


//Author: Kyaw Zaw Lwin
