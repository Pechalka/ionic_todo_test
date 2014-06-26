var App = angular.module('TodoApp', ['ionic']);

App.service('Backend', ['$http', '$log', Backend])
App.controller('AppCtrl', ['$scope', 'Backend', '$log', AppCtrl]);

function AppCtrl($scrope, Backend, $log) {
	$scrope.todos = [];
	$scrope.refresh = function(){
		Backend.getTodos($scrope);
	}

	$scrope.remove = function(todo){
		alert('delete ' + todo.title);
	}
}


function Backend($http, $log){
	this.getTodos = function($scrope){

		$scrope.todos = [
			{ title : 'заплатить за net', competed : false },
			{ title : 'купить лампочки', competed : false},
			{ title : 'разобратся с ionic', competed : false}
		]
		$scrope.$broadcast('scroll.refreshComplete');

	}
}