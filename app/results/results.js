(function(){
    angular.module('myVote').
        controller('ResultsController', ['$scope', 'candidateResource', function($scope, candidateResource){
            $scope.positions = [{
                name: 'SPL',
                totalVotes: 0,
                candidates: []
            },
            {
                    name: 'ASPL1EM',
                    totalVotes: 0,
                    candidates: []
            },
            {
                    name: 'ASPL1TM',
                    totalVotes: 0,
                    candidates: []
            },
            {
                    name: 'ASPL2EM',
                    totalVotes: 0,
                    candidates: []
            },
            {
                    name: 'ASPL2TM',
                    totalVotes: 0,
                    candidates: []
            }
            ];

            candidateResource.query(function(data){
                $scope.candidateResults = [];

                data.forEach(function(item){
                    var newCandidate = {
                        "name": item.Name,
                        "position": item.position,
                        "votes": item.voteCount
                    };
                    $scope.candidateResults.push(newCandidate);
                    switch(item.position){
                        case "SPL": $scope.positions[0].totalVotes += item.voteCount;
                            break;
                        case "ASPL1EM": $scope.positions[1].totalVotes += item.voteCount;
                            break;
                        case "ASPL1TM": $scope.positions[2].totalVotes += item.voteCount;
                            break;
                        case "ASPL2EM": $scope.positions[3].totalVotes += item.voteCount;
                            break;
                        case "ASPL2TM": $scope.positions[4].totalVotes += item.voteCount;
                            break;
                    }
                });
                $scope.winningCandidates = [];
                getWinningCandidates(data);
                getWinnerForPosition();
            });

            $scope.gridOptions = {
                enableFiltering: true,
                columnDefs: [
                    { field: 'name', width: '30%' },
                    { field: 'position'  },
                    { field: 'votes'  }
                ],
                data: $scope.candidateResults
            };

            $scope.chartOptions = {
                chart: {
                    type: 'discreteBarChart',
                    height: 450,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 55
                    },
                    x: function(d){return d.label;},
                    y: function(d){return d.value;},
                    showValues: false,
                    valueFormat: function(d){
                        return d3.format(',.2f')('%x');
                    },
                    transitionDuration: 500,
                    xAxis: {
                        axisLabel: 'Candidates'
                    },
                    yAxis: {
                        axisLabel: 'Vote Percentage',
                        axisLabelDistance: 30
                    }
                }
            };

            $scope.chartData = [
                {
                    key: "Votes",
                    values: $scope.positions[0].candidates
                }
            ];

            var getWinningCandidates = function(allCandidates){
                allCandidates.forEach(function(item) {
                    switch(item.position){
                        case "SPL":
                            setChart(item, 0);
                            break;
                        case "ASPL1EM":
                            setChart(item, 1);
                            break;
                        case "ASPL1TM":
                            setChart(item, 2);
                            break;
                        case "ASPL2EM":
                                setChart(item, 3);
                                break;
                        case "ASPL2TM":
                                setChart(item, 4);
                                break;
                    }
                });
            };

            var getWinnerForPosition = function(positionId){
                $scope.positions.forEach(function(position) {
                    var positionCandidates = position.candidates;
                    var maxVotes = positionCandidates[0].value;

                    positionCandidates.forEach(function(item) {
                        if(item.value > maxVotes) {
                            maxVotes = item.value;
                        }
                    });

                    positionCandidates.forEach(function(item) {
                        if(maxVotes !== 0 && item.value === maxVotes) {
                            $scope.winningCandidates.push(item);
                        }
                    });
                });
            }

            var setChart = function(candidate, positionId){
                var chartValues = {
                    "label": candidate.Name,
                    "value": calculatePercentage(candidate.voteCount, $scope.positions[positionId].totalVotes),
                    "position": candidate.position,
                    "profileImage": candidate.profileImage,
                    "voteCount": candidate.voteCount
                };
                $scope.positions[positionId].candidates.push(chartValues);
            }

            var calculatePercentage = function(currentCount, totalCount){
                if(totalCount !== 0 && totalCount !== undefined){
                    return (currentCount / totalCount) * 100;
                }
            }

            $scope.setPosition = function(positionId){
                var newData = [
                    {
                        key: "Votes",
                        values: $scope.positions[positionId].candidates
                    }
                ];
                $scope.chartData = angular.copy(newData);
            }
        }]);
})();