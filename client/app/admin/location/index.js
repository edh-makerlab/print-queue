'use strict';

import angular from 'angular';
import LocationController from './location.controller';

export default angular.module('edhPrintQueueApp.location', [])
  .controller('LocationController', LocationController)
  .name;
