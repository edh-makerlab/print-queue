'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './membership.events';

var MembershipSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  number: String,    // Membership number
  lastPrint: String, // TODO: replace for date type.
  active: Boolean
});

registerEvents(MembershipSchema);
export default mongoose.model('Membership', MembershipSchema);
