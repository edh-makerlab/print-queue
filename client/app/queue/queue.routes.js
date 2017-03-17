'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('queue', {
    url: '/queue',
    template: require('./queue.html'),
    controller: 'QueueController',
    controllerAs: 'q',
    authenticate: 'user'
  })
  .state('queue-new-job', {
    url: '/job/new',
    referrer: 'queue',
    template: require('./job/new_job.html'),
    controller: 'JobController',
    controllerAs: 'vm'
  })
  .state('queue-job', {
    url: '/job/:id',
    referrer: 'queue',
    template: require('./job/job.html'),
    controller: 'JobController',
    controllerAs: 'vm'
  });
}
