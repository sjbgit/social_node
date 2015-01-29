angular.module('app')
    .controller('LoginCtrl', function ($scope, UserSvc, $location) {
        $scope.username = 'a';
        $scope.password = 'b';
        $scope.login = function (username, password) {
            UserSvc.login(username, password)
                .then(function (response) {
                    console.log(response);
                    $scope.$emit('login', response.data);
                    $location.path('/');
                })
        }
    });
