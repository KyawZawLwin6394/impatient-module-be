'use strict';

const mongoose = require('mongoose');
mongoose.promise = global.Promise;
const Schema = mongoose.Schema;
const validator = require('validator');


let PatientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  patientCode: {
    type: String,
  },
  age: {
    type: Number,
  },
  phone: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    validate: {
      isAsync: true,
      validator: validator.isEmail,
      message: 'Invalid Email Address.',
    },
    required: [true, 'User email required'],
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  address: {
    type: String,
  },
  occupation: {
    type: String,
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
  },
  seq: {
    type: Number
  },
  img: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attachments',
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

const patient = mongoose.model('Patients', PatientSchema)
module.exports = patient;


//Author: Kyaw Zaw Lwin
