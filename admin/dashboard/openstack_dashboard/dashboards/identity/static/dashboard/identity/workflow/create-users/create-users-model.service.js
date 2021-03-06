/**
 * Created by Raja on 6/29/2016.
 */
(function () {
  'use strict';

  var push = Array.prototype.push;
  var noop = angular.noop;

  /**
   * @ngdoc overview
   * @name horizon.dashboard.virtual.workflow.launch-instance
   *
   * @description
   * Manage workflow of creating server.
   */

  angular
    .module('horizon.dashboard.identity.workflow.create-users')
    .factory('createUsersModel', createUsersModel);

  createUsersModel.$inject = [
    '$q',
    '$log',
    '$rootScope',
    'horizon.app.core.openstack-service-api.ldap',
    'horizon.framework.widgets.toast.service',
    'horizon.framework.widgets.modal-wait-spinner.service',
  ];

  /**
   * @ngdoc service
   * @name createUsersModel
   *
   * @param {Object} $q
   * @param {Object} $log
   * @param {Object} ldapAPI
   * @param {Object} settings
   * @param {Object} toast
   * @description
   * This is the M part in MVC design pattern for Map VM
   * wizard workflow. It is responsible for providing data to the
   * view of each step in map vm workflow and collecting
   * user's input from view for  mapping of new vm.  It is
   * also the center point of communication between map vm
   * UI and services API.
   * @returns {Object} The model
   */
  function createUsersModel(
    $q,
    $log,
    $rootScope,
    ldapAPI,
    toast,
    Spinner
  ) {

    var initPromise;

    /**
     * @ngdoc model api object
     */

      var model = {

      initializing: false,
      initialized: false,

      newUserSpec: {},
      singleUser: {},
      isCurrentModelPushed: false,
      /**
       * cloud service properties, they should be READ-ONLY to all UI controllers
       */
        availableComputers: [],
      /**
       * api methods for UI controllers
       */

      initialize: initialize,
      createUsers: createUsers
    };

    // Local function.
    function initializeNewMappingSpec() {

      model.singleUser = {},
      model.newUserSpec = {
        users: [],
        isAssignVm: "False",
        isAutoMap: "True"
      };

    }

    /**
     * @ngdoc method
     * @name createUsersModel.initialize
     * @returns {promise}
     *
     * @description
     * Send request to get all data to initialize the model.
     */

    function initialize(deep) {
      var deferred, promise;

      // Each time opening launch instance wizard, we need to do this, or
      // we can call the whole methods `reset` instead of `initialize`.
      initializeNewMappingSpec();

      if (model.initializing) {
        promise = initPromise;

      } else if (model.initialized && !deep) {
        deferred = $q.defer();
        promise = deferred.promise;
        deferred.resolve();

      } else {
        model.initializing = true;

        promise = $q.all([

        ]);

        promise.then(onInitSuccess, onInitFail);
      }

      return promise;
    }

    function onInitSuccess() {
      model.initializing = false;
      model.initialized = true;
    }

    function onInitFail() {
      model.initializing = false;
      model.initialized = false;
    }

    function createUsers() {
      console.log("create-users.module.service.js")
        if(model.singleUser.hasOwnProperty('username') && model.isCurrentModelPushed == false)
            model.newUserSpec.users.push(model.singleUser);
        Spinner.showModalSpinner(gettext("Creating....."));
        return ldapAPI.createUsers(model.newUserSpec).then(successMessage,Failed);
    }
      function successMessage(response) {
          Spinner.hideModalSpinner();
           $rootScope.$emit("callretieveLdapUsers", {});
          var res = response.data;
          for(var i=0;i<res.length;i++) {
              if (res[i].status.includes("success"))
                  toast.add('success', res[i].status);
              else
                  toast.add('danger', res[i].status);
          }
    }
      function Failed(){
          Spinner.hideModalSpinner();
      }
    return model;
  }

})();
