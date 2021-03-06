/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

(function() {
  'use strict';

  /**
   * @ngdoc virtualSummaryTableController
   * @ngController
   *
   * @description
   * Controller for the virtual summary table.
   * Serve as the focal point for table actions.
   */
  angular
    .module('horizon.dashboard.virtual.summary')
    .controller('virtualSummaryController', virtualSummaryController);

  virtualSummaryController.$inject = [
    'horizon.framework.widgets.toast.service',
    'horizon.framework.util.i18n.gettext',
    'horizon.framework.widgets.modal-wait-spinner.service',
    '$scope',
    'horizon.app.core.openstack-service-api.nova',
    'horizon.app.core.openstack-service-api.neutron',
    'horizon.app.core.openstack-service-api.glance',
    'horizon.app.core.openstack-service-api.cinder',
    'horizon.app.core.openstack-service-api.ldap',
    '$interval'
  ];

  function virtualSummaryController(toast, gettext,Spinner, $scope, novaAPI, neutronAPI, glanceAPI, cinderAPI, ldapAPI, $interval) {
    
    $scope.status = function () {
      novaAPI.getServersStatus().then(function(res){
        $scope.instances_status = res.data.instances_status;
        $scope.total_instances = res.data.total_instances;
        var instances_chart = {}
        instances_chart.type = "PieChart"
        instances_chart.data = $scope.instances_status;
        instances_chart.options = {
            displayExactValues: true,
            width: 450,
            height: 260,
            is3D: true,
            chartArea: {left:15,top:10,bottom:15, right:0},
            legend: {position:'bottom', alignment: 'start'}
        };
        $scope.instances_chart = instances_chart;
      });
      cinderAPI.getVolumesStatus().then(function(res){
        $scope.volumes_status = res.data.volumes_status;
        $scope.total_volumes = res.data.total_volumes;
        var volumes_chart = {}
        volumes_chart.type = "PieChart"
        volumes_chart.data = $scope.volumes_status;
        volumes_chart.options = {
            displayExactValues: true,
            width: 450,
            height: 260,
            is3D: true,
            chartArea: {left:15,top:10,bottom:15, right:0},
            legend: {position:'bottom', alignment: 'start'}
        };
        $scope.volumes_chart = volumes_chart;
      });
      glanceAPI.getImagesStatus().then(function(res){
        $scope.images_status = res.data.images_status;
        $scope.total_images = res.data.total_images;
        var images_chart = {}
        images_chart.type = "PieChart"
        images_chart.data = $scope.images_status;
        images_chart.options = {
            displayExactValues: true,
            width: 450,
            height: 260,
            is3D: true,
            chartArea: {left:15,top:10,bottom:15, right:0},
            legend: {position:'bottom', alignment: 'start'}
        };
        $scope.images_chart = images_chart;
      });
      ldapAPI.getAdStatus().then(function(res){
        $scope.free_ad_status = res.data.free;
        $scope.total_ad_users = res.data.total_users;
        $scope.total_ad_computers = res.data.total_computers;
        $scope.mapped = res.data.mapped;
        var free_ad_chart = {}
        free_ad_chart.type = "PieChart"
        free_ad_chart.data = $scope.free_ad_status;
        free_ad_chart.options = {
            displayExactValues: true,
            width: 450,
            height: 260,
            is3D: true,
            chartArea: {left:15,top:10,bottom:15, right:0},
            legend: {position:'bottom', alignment: 'start'}
        };
        $scope.free_ad_chart = free_ad_chart;
      });
      neutronAPI.getNetworks().then(function(res){
        $scope.networks = res.data.items;
      });
    }

   var theInterval = $interval(function(){
      $scope.status();
   }.bind(this), 5000);    

    $scope.$on('$destroy', function () {
        $interval.cancel(theInterval)
    });

    $scope.status();
  }

})();
