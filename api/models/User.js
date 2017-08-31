"use strict";

/**
 * User
 * @description :: Model for storing users
 */

module.exports = {
  schema: true,

  attributes: {

    role : {
      type : 'string',
      enum : ['user', 'admin']
    },

    username: {
      type: 'string',
      required: true,
      unique: true,
      alphanumericdashed: true
    },

    password: {
      type: 'string'
    },

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    firstName: {
      type: 'string',
      defaultsTo: ''
    },

    lastName: {
      type: 'string',
      defaultsTo: ''
    },

    gender: {
      type : 'string',
      enum : ['female', 'male', 'other']
    },

    birthdate: {
      type: 'date'
    },

    city : {
      type : 'string'
    },

    region : {
      type: 'string'
    },

    description : {
      type : 'string'
    },

    acceptPrivate : {
      type: 'boolean',
      defaultsTo : true
    },

    lastLogin : {
      type: 'date'
    },

    socketId : {
      type: 'string'
    },

    profilePicture: {
      type: 'string',
      defaultsTo: '',
      url: true
    },

    socialProfiles: {
      type: 'object',
      defaultsTo: {}
    },
  },

  beforeUpdate(values, next) {

    if (false === values.hasOwnProperty('password')) return next();
    if (/^\$2[aby]\$[0-9]{2}\$.{53}$/.test(values.password)) return next();

    HashService.bcrypt.hash(values.password)
    .then(hash => {
      values.password = hash;
      next();
    })
    .catch(next);
  },

  beforeCreate(values, next) {
    if (false === values.hasOwnProperty('password')) return next();

    return HashService.bcrypt.hash(values.password)
      .then(hash => {
        values.password = hash;
        next();
      })
      .catch(next);
  }
};
