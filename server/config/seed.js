/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Job from '../api/job/job.model';
import Location from  '../api/location/location.model';
import Membership from '../api/membership/membership.model';
import Printer from '../api/printer/printer.model';
import User from '../api/user/user.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    User.find({}).remove()
      .then(() => {
        User.create({
          provider: 'local',
          name: 'Test User',
          email: 'test@example.com',
          password: 'test'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'admin'
        })
        .then(() => {
          // TODO: clean this up. The dependencies are kind of messy.
          console.log('finished populating users')
          User.findOne({ name: 'Admin' }).exec((err, user) => {
            console.log("err: "+ err);
            console.log("user: "+user);
            Job.find({}).remove()
              .then(() => {
                Job.create({
                  _user: user._id,
                  title: "My nice job",
                  details: "foo bar url://...",
                  status: "New",
                },
                {
                  _user: user._id,
                  title: "My nice job 2",
                  details: "foo bar url://...",
                  status: "New",
                })
                .then(() => console.log('finished populating jobs'))
                .catch(err => console.log('error populating jobs', err));
              })
          });
        })
        .catch(err => console.log('error populating users', err));
      });




    Location.find({}).remove()
      .then(() => {
        Location.create({
          name: 'El Dorado Hills Library',
          info: 'EDHL Maker Lab',
          active: true
        }, {
          name: 'Placerville Library',
          active: true
        })
        .then(() => console.log('finished populating locations'))
        .catch(err => console.log('error populating locations', err));
      })
  }
}
