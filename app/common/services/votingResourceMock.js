(function(){
    "use strict";
    var mockApp = angular
        .module("votingResourceMock", ["ngMockE2E"]);

    mockApp.run(function($httpBackend){
        var candidates = [
            {
                "candidateId": 1,
                "Name":"A.RIZWANA FATHIMA",
                "position": "SPL",
                "profileImage": "assets/images/image1.jpeg",
                "voteCount": 0
            },
            {
                "candidateId": 2,
                "Name": "B.SWATHI",
                "position": "SPL",
                "profileImage": "assets/images/image2.jpeg",
                "voteCount": 0  
            },
            {
                "candidateId": 3,
                "Name": "Y.MOETHIRA DEVI",
                "position": "SPL",
                "profileImage": "assets/images/image3.jpeg",
                "voteCount": 0
            },
            {
                "candidateId": 4,
                "Name": "S.RAMYA",
                "position": "ASPL1EM",
                "profileImage": "assets/images/image4.jpeg",
                "voteCount": 0
            },
            {
                "candidateId": 5,
                "Name": "S.BHUVANESHWARI",
                "position": "ASPL1EM",
                "profileImage": "assets/images/image5.png",
                "voteCount": 0
            },
            {
                "candidateId": 6,
                "Name": "A.LAVANYA",
                "position": "ASPL1EM",
                "profileImage": "assets/images/image6.jpeg",
                "voteCount": 0
            },
            {
                "candidateId": 7,
                "Name": "A.NARMADHA",
                "position": "ASPL1TM",
                "profileImage": "assets/images/image7.jpeg",
                "voteCount": 0
            },
            {
                "candidateId": 8,
                "Name": "SHAGINDRA",
                "position": "ASPL1TM",
                "profileImage": "assets/images/image8.jpeg",
                "voteCount": 0
            },{
                "candidateId": 9,
                "Name":"P.CINDRELLA",
                "position": "ASPL2EM",
                "profileImage": "assets/images/image9.jpeg",
                "voteCount": 0
            },
            {
                "candidateId": 10,
                "Name": "K.TAMIL SELVI",
                "position": "ASPL2EM",
                "profileImage": "assets/images/image10.jpeg",
                "voteCount": 0
            },
            {
                "candidateId": 11,
                "Name": "P.KAVIPRIYA",
                "position": "ASPL2EM",
                "profileImage": "assets/images/image11.jpeg",
                "voteCount": 0
            },
            {
                "candidateId": 12,
                "Name": "V.SAVITHA SRI",
                "position": "ASPL2TM",
                "profileImage": "assets/images/image12.jpeg",
                "voteCount": 0
            },
            {
                "candidateId": 13,
                "Name": "G.JABIRA MASRATH",
                "position": "ASPL2TM",
                "profileImage": "assets/images/image13.jpeg",
                "voteCount": 0
            },
            {
                "candidateId": 14,
                "Name": "R.NIVETHA",
                "position": "ASPL2TM",
                "profileImage": "assets/images/image14.png",
                "voteCount": 0
            },
            {
                "candidateId": 15,
                "Name": "S.MONIKA",
                "position": "ASPL2TM",
                "profileImage": "assets/images/image15.jpeg",
                "voteCount": 0
            }
        ];
		

        var candidatesUrl = "/api/candidates";

        $httpBackend.whenGET(candidatesUrl).respond(candidates);
        var editRegex = new RegExp(candidatesUrl + "/[0-9][0-9]*", '');

        $httpBackend.whenGET(editRegex).respond(function(method, url, data){
            var candidate = {"candidateId": 0};
            var parameters = url.split("/");
            var length = parameters.length;
            var id = parameters[length-1];

            if(id > 0){
                for(var i=0; i < candidates.length; i++){
                    if (candidates[i].candidateId == id){
                        candidate = candidates[i];
                        break;
                    }
                };
            }
            return [200, candidate, {}]
        });

        $httpBackend.whenPOST(editRegex).respond(function(method, url, data){
            var candidate = angular.fromJson(data);
            if(!candidate.candidateId){
                candidate.candidateId = candidates[candidates.length -1].candidateId + 1;
                candidates.push(candidate);
            }
            else{
                for(var i=0; i < candidates.length; i++){
                    if (candidates[i].candidateId == candidate.candidateId){
                        candidates[i] = candidate;
                        break;
                    }
                };
            }
            return [200, candidate, {}]
        });

        var positionUrl = "/api/vote";
        var positionRegex = new RegExp(positionUrl + "/[0-9][0-9]*", '');

        $httpBackend.whenGET(positionRegex).respond(function(method, url, data){
            var candidateFilter = [];
            var positions = ["SPL", "ASPL1EM", "ASPL1TM","ASPL2EM", "ASPL2TM"];
            var parameters = url.split("/");
            var length = parameters.length;
            var id = parseInt(parameters[length-1]);

            if(id >= 0 && id < positions.length){
                for(var i=0; i < candidates.length; i++){
                    if (candidates[i].position == positions[id]){
                        candidateFilter.push(candidates[i]);
                    }
                };
            }
            return [200, candidateFilter, {}]
        });

        $httpBackend.whenGET(/app/).passThrough();
    });
})();