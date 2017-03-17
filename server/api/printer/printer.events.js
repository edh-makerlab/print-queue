/**
 * Printer model events
 */

'use strict';

import {EventEmitter} from 'events';
var PrinterEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PrinterEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Printer) {
  for(var e in events) {
    let event = events[e];
    Printer.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    PrinterEvents.emit(`${event}:${doc._id}`, doc);
    PrinterEvents.emit(event, doc);
  };
}

export {registerEvents};
export default PrinterEvents;
