angular.module('app')
    .controller('PostsCtrl', function ($scope, PostsSvc) {

        $scope.messages = [];

        var socket = io.connect();

        console.log('connected');

        socket.on('connect', function () {
            console.log('connect called');
            //$scope.setName();
        });


        socket.on('message', function (msg) {
            console.log('received message: ' + msg.username + ' ' + msg.body);

            $scope.$apply(function () {
                $scope.posts.unshift(msg)
            });

            //$scope.messages.push(msg); //this should be pushing on to posts or something
            //$scope.$apply();
        });


        $scope.addPost = function () {
            if ($scope.postBody) {
                PostsSvc.create({
                    username: 'new',
                    body: $scope.postBody
                }).success(function (post) {
                    //$scope.posts.unshift(post)
                    $scope.postBody = null
                })
            }
        }

        PostsSvc.fetch().success(function (posts) {
            $scope.posts = posts
        })

    })




