var App = angular.module('TodoApp', ['ionic']);

App.service('Backend', ['$http', '$log', Backend])
App.controller('AppCtrl', ['$scope', 'Backend', '$log', '$ionicListDelegate', AppCtrl]);

function AppCtrl($scope, Backend, $log, $ionicListDelegate) {
	$scope.todos = [];
	$scope.todo = {
		title : ''
	}
	$scope.shouldShowReorder = false;
	$scope.shouldShowDone = true;

	$scope.toogleDelete = function(){
		$scope.shouldShowReorder = !$scope.shouldShowReorder;
	}

	$scope.remove = function(index){
		var todo = $scope.todos[index];
		Backend.removeTodo(todo.id)
			   .success(function(){
			   		$scope.todos.splice(index, 1);
			   })
	}

	$scope.add = function(){
		if ($scope.todo.title == '') return;

		Backend.addTodo($scope.todo.title)
			   .success(function(todo){
					$scope.todos.push(todo);
					$scope.todo.title = '';	 	
			 	})
	}

	var updateStatus = function(todo, competed){
		todo.competed = competed;
		Backend.updateTodo(todo.id, todo)
			   .success(function(){
					$ionicListDelegate.closeOptionButtons();	
			   })
	}

	$scope.done = function(todo){
		updateStatus(todo, true);
	}

	$scope.not_done = function(todo){
		updateStatus(todo, false);
	}

	Backend.getTodos($scope)
		   .success(function(todos){
				$scope.todos = todos;	 	
			})
}


function Backend($http, $log){
	this.getTodos = function($scope){
		return $http.get('/api/todos')
	}
	this.updateTodo = function(id, data){
		return $http({ method: 'PUT', url: '/api/todos/' + id , data : data})	
	}

	this.removeTodo = function(id){
		return $http({ method: 'DELETE', url: '/api/todos/' + id })
	}

	this.addTodo = function(title){
		return $http.post('/api/todos', { title : title, competed : false })			 
	}
}



// 	// $scope.refresh = function(){
// 	// 	Backend.getTodos($scope);
// 	// }
// $scope.$broadcast('scroll.refreshComplete');

// 	<!-- 	<div ng-show="!todos.length">
// 			<br/>
// 			<br/>
// 			<center>
// 				<h1>Pull to refresh</h1>
// 			</center>
// 		</div> -->