angular.module('extrackMobile.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('HomeCtrl',['$scope',function($scope){
    $scope.bgImage = '../img/free-finance-books-760x463.jpg';    
}])

.controller('ExpenseCtrl', ['$scope','expenseFactory',function($scope, expenseFactory) {
  $scope.expenses = expenseFactory.getExpenses().query()
    .$promise.then(
        function(response){
            $scope.expenses = response;
        
        },function(error){            
            console.log('Error: '+error);            
        }
    );

    $scope.getTotal = function(){
        var total = 0;
        for(var i=0; i<$scope.expenses.length; i++)
            {
                total+=$scope.expenses[i].expenseAmount;
            }
        return total;
    };
}])

.controller('ExpenseDetailsCtrl', ['$scope','$stateParams','expenseFactory',function($scope, $stateParams, expenseFactory) {
    $scope.expense = expenseFactory.getExpenses().get({id:parseInt($stateParams.id,10)})
    .$promise.then(
        function(response){
            $scope.expense = response;
        },function(error){
            console.log(error);
        })
}]);
