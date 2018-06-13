
(function(){
    angular.module('myVote').
        controller('CandidateController', ['$scope', 'candidateResource', '$state', function($scope, candidateResource, $state){
            candidateResource.query(function(data){
                $scope.candidates = data;
            });
        }]);
})();