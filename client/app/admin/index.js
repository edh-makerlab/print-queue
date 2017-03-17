'use strict';

import angular from 'angular';
import routes from './admin.routes';
import AdminController from './admin.controller';
import location from './location'

export default angular.module('edhPrintQueueApp.admin', ['edhPrintQueueApp.auth', 'ui.router', location])
  .config(routes)
  .controller('AdminController', AdminController)
  .name;
