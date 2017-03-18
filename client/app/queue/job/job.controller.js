'use strict';

export default class JobController {
  $http;
  socket;
  errors = {};
  jobs = [];
  newJob = '';
  newInfo = '';
  isCollapsed = true;
  getCurrentUser: Function;

  constructor($http, $scope, socket, Auth) {
    'ngInject';

    this.$http = $http;
    this.socket = socket;
    this.getCurrentUser = Auth.getCurrentUserSync;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('location');
    });
  }

  $onInit() {
    this.$http.get('/api/jobs')
      .then(response => {
        this.jobs = response.data;
        this.socket.syncUpdates('job', this.jobs);
      });
  }

  addJob() {
    if(this.newJob) {
      this.$http.post('/api/jobs', {
        name: this.newJob,
      })
      .then(() => {
        this.newJob = '';
        this.isCollapsed = !this.isCollapsed;
      })
      .catch(err => {
        this.errors = {};
        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.data.errors, (error, field) => {
          this.errors[field] = error.message;
        });
      })
    }
  }

  deleteJob(location) {
    this.$http.delete(`/api/jobs/${location._id}`);
  }
}
