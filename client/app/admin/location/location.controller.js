'use strict';

export default class LocationController {
  $http;
  socket;
  errors = {};
  locations = [];
  newLocation = '';
  newInfo = '';
  isCollapsed = true;

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('location');
    });
  }

  $onInit() {
    this.$http.get('/api/locations')
      .then(response => {
        this.locations = response.data;
        this.socket.syncUpdates('location', this.locations);
      });
  }

  addLocation() {
    if(this.newLocation) {
      this.$http.post('/api/locations', {
        name: this.newLocation,
        info: this.newInfo,
        active: true
      })
      .then(() => {
        this.newLocation = '';
        this.newInfo = '';
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

  deleteLocation(location) {
    this.$http.delete(`/api/locations/${location._id}`);
  }
}
