(function () {
    'user strict';

    angular
        .module('UPDT', [])
        .controller('DashController', DashController);

    DashController.$inject = ['$scope', '$interval']
    function DashController($scope, $interval) {
        $scope.data = [];

        var updateStock = function (event) {
            if (event.data.length > 0) {
                console.log('res-->', event.data);
                console.log('scope-->', $scope.data);
                $scope.data = JSON.parse(event.data);
                $scope.$apply();
            }
        };

        function startSSE() {
            if (typeof (EventSource) !== "undefined") {
                var url = "/api/shares";
                var source = new EventSource(url);
                source.onmessage = updateStock;
            } else {
                document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
            }
        }

        //startSSE();
        setTimeout(function() {startSSE();}, 1000);
    }
})();