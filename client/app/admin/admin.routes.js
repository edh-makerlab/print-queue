'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('admin', {
    url: '/admin',
    template: require('./admin.html'),
    controller: 'AdminController',
    controllerAs: 'admin',
    authenticate: 'admin'
  })
  .state('admin-locations', {
    url: '/admin/location',
    referrer: 'admin',
    template: require('./location/index.html'),
    controller: 'LocationController',
    controllerAs: 'vm',
    authenticate: 'admin'
  })
  .state('admin-users', {
    url: '/admin/user',
    referrer: 'admin',
    template: require('./user/index.html'),
    controller: 'AdminController',
    controllerAs: 'admin',
    authenticate: 'admin'
  });
}
