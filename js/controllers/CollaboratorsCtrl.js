angular.module('todos').controller('CollaboratorsCtrl', ['$scope', 'config',
  /**
   * Controller for displaying the list of current collaborators. Expects
   * to inherit the document from a parent scope.
   *
   * @param {angular.Scope} $scope
   * @param {object} config
   * @constructor
   */
  function ($scope, config) {
    var appId = config.clientId.split('.').shift();

    var collaboratorListener = function () {
      $scope.$apply(function () {
        $scope.collaborators = $scope.document.getCollaborators();
      });
    };
    $scope.collaborators = $scope.document.getCollaborators();

    $scope.document.addEventListener(gapi.drive.realtime.EventType.COLLABORATOR_LEFT, collaboratorListener);
    $scope.document.addEventListener(gapi.drive.realtime.EventType.COLLABORATOR_JOINED, collaboratorListener);

    $scope.$on('$destroy', function () {
      var doc = $scope.document;
      if (doc) {
        doc.removeEventListener(gapi.drive.realtime.EventType.COLLABORATOR_LEFT, collaboratorListener);
        doc.removeEventListener(gapi.drive.realtime.EventType.COLLABORATOR_JOINED, collaboratorListener);
      }
    });

    $scope.share = function () {
      var fileId = this.fileId;
      var client = new gapi.drive.share.ShareClient(appId);
      client.setItemIds([fileId]);
      client.showSettingsDialog();
    };

  }]
);