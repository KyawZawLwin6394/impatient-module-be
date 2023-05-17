'use strict';

const mongoose = require('mongoose');
mongoose.promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator');

let RoomSchema = new Schema({
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
    relatedFloor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Floors'
    },
    roomType: {
        type: String,
        enum:['900 square feet','600 square feet']
    },
    roomPrefix: {
        type: String
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

const patient = mongoose.model('Rooms', RoomSchema)
module.exports = patient;


//Author: Kyaw Zaw Lwin
