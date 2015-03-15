'use strict';

app.controller('MainCtrl', function ($scope, TransactionManager) {
    $scope.foo = {}
    $scope.myHistory = TransactionManager;
});
