angular.module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

.controller('AppCtrl', function($scope, $mdDialog, $sigapi) {
  $scope.showdialog = function(ev) {
    $mdDialog.show({
        controller: DialogController,
        templateUrl: 'dialog1.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
  };
  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

})

.directive('sigdir', ['$timeout', '$q',
  function($timeout, $q) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {
        function initialize() {
          console.log("initialized");
          var wrapper = $element[0],
            clearButton = wrapper.querySelector("[data-action=clear]"),
            saveButton = wrapper.querySelector("[data-action=save]"),
            canvas = wrapper.querySelector("canvas"),
            signaturePad;

            signaturePad = new SignaturePad(canvas);
            console.log($element[0]);

          function resizeCanvas() {
            var ratio = Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);
          }

          window.onresize = resizeCanvas;
          resizeCanvas();


          clearButton.addEventListener("click", function(event) {
            signaturePad.clear();
          });

          saveButton.addEventListener("click", function(event) {
            if (signaturePad.isEmpty()) {
              alert("Please provide signature first.");
            } else {
              console.log(signaturePad.toDataURL());
              signaturePad.clear();
            }
          });

          console.log("Initialized");
        }
        if (document.readyState === 'complete') {
          $timeout(initialize, 5000, false);
        } else {
          console.log("readyState Incomplete");
          document.onreadystatechange = function() {
            if (document.readyState === "complete") {
              console.log("dehh");

              $timeout(initialize, 5000, false);
            }
          };
          // $helmPlatform.ready(function () { google.maps.event.addDomListener(window, 'load', initialize); });
        }
      }
    };
  }
])


.service('$sigapi', ['$http', function($http) {


  return {};
}]);


