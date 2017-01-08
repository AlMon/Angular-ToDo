var td = angular.module("td", ["LocalStorageModule", "xeditable", "ngAnimate"]);

td.config(function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('ngtd');
});

td.run(function(editableOptions) {
  editableOptions.theme = 'default';
});

td.controller("ToDoCtrl", ["$scope", "localStorageService", function($scope, localStorageService){
  
  //Start off the todos variable as an array to contain the objects  
  $scope.todos = [];
  
  //Get the todoData from Local Storage if there is some already in place
  $scope.getTodos = function (){
    if(localStorageService.get("todoData")){
      $scope.todos = localStorageService.get("todoData");
    } else {
      $scope.todos = [];
    }
  }
  
  $scope.addToDo = function(){
    $scope.todos.unshift({
      title: $scope.newToDo, 
      done: false
    });
    localStorageService.set("todoData", $scope.todos);
    $scope.newToDo = "";
  }
  
  $scope.clearCompleted = function () {
    $scope.todos = $scope.todos.filter(function(task){
      return !task.done;
    });
    localStorageService.set("todoData", $scope.todos);
  }
  
  $scope.getTotal = function() {
    return $scope.todos.length;
  }
  
  $scope.removeTodo = function(start){
    $scope.todos.splice(start, 1);
    localStorageService.set("todoData", $scope.todos);
  }
  
  $scope.updateToDo = function(){
    localStorageService.set("todoData", $scope.todos);
  }
  
  $scope.clearAll = function(){
    var confirmClear = confirm("Are you sure you want to clear all of your ToDos?");
    if (confirmClear) {
      $scope.todos = localStorageService.clearAll;
      $scope.todos = []
      localStorageService.set("todoData", $scope.todos);
    }
  }
  
  
}]);
