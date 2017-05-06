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

.controller('ExpenseCtrl', ['$scope','$ionicModal','$state','expenseFactory',function($scope,$ionicModal,$state, expenseFactory) {
/*--------------------------------------------Routes--------------------------------------------------*/
  $scope.expenses = expenseFactory.getExpenses().query()
    .$promise.then(
        function(response){
            $scope.expenses = response;
        
        },function(error){            
            console.log('Error: '+error);            
        }
    );
/*--------------------------------------------Functions------------------------------------------------*/
    $scope.getTotal = function(){
        var total = 0;
        for(var i=0; i<$scope.expenses.length; i++)
            {
                total+=parseInt($scope.expenses[i].expenseAmount);
            }
        return total;
    };
/*--------------------------------------------Modals--------------------------------------------------*/
    
    //create expense
    $scope.newExpense = {};
    $ionicModal.fromTemplateUrl('templates/createexpense.html', {scope: $scope})
        .then(function(modal) {
            $scope.createexpenseform = modal;
      });
    
    $scope.openCreateExpenseModal = function(){
        $scope.createexpenseform.show();
    };
    
    $scope.closeCreateExpenseModal = function(){
        $scope.createexpenseform.hide();
        $state.go($state.current, {}, {reload: true});
    };
    
    $scope.createExpense = function(){
        
        console.log($scope.newExpense);
        expenseFactory.getExpenses().create($scope.newExpense)
        .$promise.then(
            function(resp){
                console.log(resp);                
            },
            function(error){
                console.log(error);                
            });        
                
    };    
    
}])

.controller('ExpenseDetailsCtrl', ['$scope','$stateParams','$ionicModal','$state','expenseFactory',function($scope, $stateParams,$ionicModal,$state, expenseFactory) {
    /*---------------------------------------route-----------------------------------------------*/
    $scope.expense = expenseFactory.getExpenses().get({id:parseInt($stateParams.id,10)})
    .$promise.then(
        function(response){
            $scope.expense = response;
        },function(error){
            console.log(error);
        });
    
    /*---------------------------------------function-----------------------------------------------*/
    
    $scope.deleteExpense = function(){
        
        $scope.expense = expenseFactory.getExpenses().delete({id:$scope.expense.id})
            .$promise.then(
                function(response){
                    $scope.expense = response;
                    $state.go('app.expense', {}, {reload: true});
                },function(error){
                    console.log(error);
            }); 
        
        
    };
    
    /*---------------------------------------modal-----------------------------------------------*/
    //Edit expense
    $ionicModal.fromTemplateUrl('templates/editexpense.html', {scope: $scope})
        .then(function(modal) {
            $scope.editexpenseform = modal;
      });
    
    $scope.openEditExpenseModal = function(){
        $scope.editexpenseform.show();
    };
    
    $scope.closeEditExpenseModal = function(){
        $scope.editexpenseform.hide();
        $state.go($state.current, {}, {reload: true});
    };
    
    $scope.editExpense = function(){
        
        console.log($scope.expense);
        expenseFactory.getExpenses().update({id:$scope.expense.id})
        .$promise.then(
            function(resp){
                console.log(resp);               
            },
            function(error){
                console.log(error);                
            });                
    };
    
}]);
