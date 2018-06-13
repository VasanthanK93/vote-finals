(function(){
    "use strict";
    angular
        .module("common.services")
        .factory("candidateResource", ["$resource", function($resource){
            return $resource("/api/candidates/:candidateId", {
                candidateId: '@candidateId'
            });
        }]);
})();