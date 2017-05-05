'use strict';
angular.module('extrackMobile.services',['ngResource'])
        .constant("baseURL","http://localhost:3000/")
        .service('expenseFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
                this.getExpenses = function(){
                    
                    return $resource(baseURL+"expenses/:id",null,  {'update':{method:'PUT' }});
                    
                };    
                        
        }])
;
