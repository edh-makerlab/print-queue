'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './location.events';

var LocationSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  inUse: Boolean, // TODO: At some point may want to cache
  printers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Printer' }]
});

// Validate name is not taken
LocationSchema
  .path('name')
  .validate(function(value, respond) {
    return this.constructor.findOne({ name: value }).exec()
      .then(location => {
        if(location) {
          if(this.id === location.id) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'The specified location name is already in use.');


registerEvents(LocationSchema);
export default mongoose.model('Location', LocationSchema);
