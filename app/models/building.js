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
    buildingType:{
        type: String,
        enum: ['Twin Double Flat', 'Single Flat', 'Double Flat']
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
