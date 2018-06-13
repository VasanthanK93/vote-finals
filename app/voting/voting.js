(function(){
    angular.module('myVote').
        controller('VoteController', ['$scope', '$stateParams', 'votingResource', function($scope, $stateParams, votingResource){

        votingResource.query({id: $stateParams.positionId}, function(data){
            $scope.candidates = data;
            $scope.currentPositionIndex = $stateParams.positionId;
            $scope.positionFilter = $scope.positions[$scope.currentPositionIndex].name;
        });

        $scope.positions = [{
            name: 'SPL',
            status: 'active'
            },
            {
                name: 'ASPL1EM',
                status: 'active'
            },
            {
                name: 'ASPL1TM',
                status: 'active'
            },
            {
                name: 'ASPL2EM',
                status: 'active'
            },
            {
                name: 'ASPL2TM',
                status: 'active'
            }
        ];

        $scope.registerVote = function(candidateId) {
            $scope.candidates[candidateId].voteCount += 1;
            $scope.positions[$scope.currentPositionIndex].status = 'completed';
		
		}
    }]);
})();