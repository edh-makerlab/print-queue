'use strict';

import angular from 'angular';
import routes from './queue.routes';
import QueueController from './queue.controller';
import job from './job'

export default angular.module('edhPrintQueueApp.queue', ['edhPrintQueueApp.auth', 'ui.router', job])
  .config(routes)
  .controller('QueueController', QueueController)
  .name;
