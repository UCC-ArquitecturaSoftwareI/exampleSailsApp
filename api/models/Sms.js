/**
 * Sms.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    sms: 'string',
    writer: {
      model: 'user'
    },
    respuestas: {
      collection: 'sms',
      via: 'padre'
    },
    padre: {
      model: 'sms'
    },
    likes: {
      collection: 'user',
      via: 'sms_liked'
    },
  },
};

