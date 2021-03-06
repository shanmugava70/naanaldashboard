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
   * @ngdoc horizon.dashboard.identity
   * @ngModule
   *
   * @description
   * Dashboard module to host various identity panels.
   */
  angular
    .module('horizon.dashboard.identity', [
      'horizon.dashboard.identity.users',
      'horizon.dashboard.identity.projects',
      'horizon.dashboard.identity.workflow',
      'horizon.dashboard.identity.eventlog'
    ])
    .config(config);

  config.$inject = [
    '$provide',
    '$windowProvider'
  ];

  function config($provide, $windowProvider) {
    var path = $windowProvider.$get().STATIC_URL + 'dashboard/identity/';
    $provide.constant('horizon.dashboard.identity.basePath', path);
  }

})();
