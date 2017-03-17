'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './printer.events';

var PrinterSchema = new mongoose.Schema({
  model: String,
  info: String,
  hostname: String,
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  active: Boolean
});

// Validate no duplicate hostname
PrinterSchema
  .path('hostname')
  .validate(function(value, respond) {
    return this.constructor.findOne({ name: value }).exec()
      .then(p => {
        if(p) {
          if(this.id === p.id) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'The specified printer hostname is already in use.');

registerEvents(PrinterSchema);
export default mongoose.model('Printer', PrinterSchema);
