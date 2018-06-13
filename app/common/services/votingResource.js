(function(){
    "use strict";
    angular
        .module("common.services")
        .factory("votingResource", ["$resource", function($resource){
            return $resource("/api/vote/:id", {
                id: '@id'
            });
        }]);
})();