'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './job.events';

var JobSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  title: String,
  details: String,
  status: String,
  printer: { type: mongoose.Schema.Types.ObjectId, ref: 'Printer' }
  // TODO: Add notes to log state of job over time.
});

registerEvents(JobSchema);
export default mongoose.model('Job', JobSchema);
