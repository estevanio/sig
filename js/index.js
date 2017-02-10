angular.module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

.controller('AppCtrl', function($scope, $mdDialog, $sigapi) {
  // $scope.status = '  ';
  // $scope.customFullscreen = false;



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


        }
        if (document.readyState === 'complete') {
          $timeout(initialize, 0, false);
        } else {
          console.log("readyState Incomplete");


          document.onreadystatechange = function() {
            if (document.readyState === "complete") {
              console.log("dehh");

              $timeout(initialize, 0, false);
            }
          };
          // $helmPlatform.ready(function () { google.maps.event.addDomListener(window, 'load', initialize); });
        }
      }
    };
  }
])


.service('$sigapi', ['$http', function($http) {


  return {
    open: open
  };
}]);


// var wrapper = document.getElementById("signature-pad"),
//     clearButton = wrapper.querySelector("[data-action=clear]"),
//     saveButton = wrapper.querySelector("[data-action=save]"),
//     canvas = wrapper.querySelector("canvas"),
//     signaturePad;

// // Adjust canvas coordinate space taking into account pixel ratio,
// // to make it look crisp on mobile devices.
// // This also causes canvas to be cleared.
// function resizeCanvas() {
//     // When zoomed out to less than 100%, for some very strange reason,
//     // some browsers report devicePixelRatio as less than 1
//     // and only part of the canvas is cleared then.
//     var ratio =  Math.max(window.devicePixelRatio || 1, 1);
//     canvas.width = canvas.offsetWidth * ratio;
//     canvas.height = canvas.offsetHeight * ratio;
//     canvas.getContext("2d").scale(ratio, ratio);
// }

// window.onresize = resizeCanvas;
// resizeCanvas();

// signaturePad = new SignaturePad(canvas);

// clearButton.addEventListener("click", function (event) {
//     signaturePad.clear();
// });

// saveButton.addEventListener("click", function (event) {
//     if (signaturePad.isEmpty()) {
//         alert("Please provide signature first.");
//     } else {
//        console.log(signaturePad.toDataURL());
//         signaturePad.clear();
//     }
// });
