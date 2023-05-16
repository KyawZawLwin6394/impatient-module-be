'use strict';

const mongoose = require('mongoose');
mongoose.promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator');

let BuildingSchema = new Schema({
    code: {
        type: String
    },
    name: {
        type: String
    },
    floorCount: {
        type: Number
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

const patient = mongoose.model('Buildings', BuildingSchema)
module.exports = patient;


//Author: Kyaw Zaw Lwin
