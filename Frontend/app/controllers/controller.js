
app.controller('BugListCtrl', ['$scope', 'Bug', '$modal', '$interval', function ($scope, Bug, $modal, $interval) {



    //////////////////тут алерты
    $scope.alerts = [];
    $scope.isLoading = true;


    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };



    $scope.addAlert = function (type, msg) {
        $scope.alerts.push({
            type: type,
            msg: msg,

        });
        $interval(function () {
            $scope.closeAlert(0);
        }, 5000, 1);
    };



    ////////////////////////

    ///// колапс
    $scope.isCollapsed = true;

    /////



    ///////это выпадающий список

    $scope.status = {
        isopen: false,
        isopen1: false,
        isopen2: false,

    };



    $scope.filterParams =

    {
        whoRep: '',
        stat: '',
        sortBy: '',
        sortDirection: null
    };



    $scope.chooseItem = function (whoR, st, sortBy, sortD) {
        $scope.isLoading = true;
        $scope.status.isopen = false;
        $scope.status.isopen1 = false;
        $scope.status.isopen2 = false;
        $scope.filterParams.whoRep = whoR;
        $scope.filterParams.stat = st;
        $scope.filterParams.sortBy = sortBy;
        $scope.filterParams.sortDirection = sortD;
        $scope.currentPage = 1;
        $scope.bugs = Bug.query({ offset: ($scope.currentPage - 1) * 10, limit: 10, WhoReported: $scope.filterParams.whoRep, Status: $scope.filterParams.stat, SortDirection: $scope.filterParams.sortDirection, SortBy: $scope.filterParams.sortBy },
            function() { $scope.isLoading = false; });
        $scope.parameters = Bug.get({ WhoReported: $scope.filterParams.whoRep, Status: $scope.filterParams.stat });
    };
    /////////


    //////////////////////////////// тут пагинация 

    $scope.currentPage = 1;

    $scope.StatusDropDownList = ['fixed',
        'not fixed'];

    $scope.parameters = Bug.get({ WhoReported: $scope.filterParams.whoRep, Status: $scope.filterParams.stat, SortBy: $scope.filterParams.sortBy, SortDirection: $scope.filterParams.sortDirection });

    $scope.pageChanged = function () {
        $scope.isLoading = true;
        $scope.bugs = Bug.query({ offset: ($scope.currentPage - 1) * 10, limit: 10, WhoReported: $scope.filterParams.whoRep, Status: $scope.filterParams.stat, SortBy: $scope.filterParams.sortBy, SortDirection: $scope.filterParams.sortDirection }
        ,function () { $scope.isLoading = false; });
    };
    //////////////////////////////////

    $scope.bugs = Bug.query({
        offset: ($scope.currentPage - 1) * 10, limit: 10, WhoReported: $scope.filterParams.whoRep, Status: $scope.filterParams.stat, SortBy: $scope.filterParams.sortBy, SortDirection: $scope.filterParams.sortDirection
    }, function () { $scope.isLoading = false; });

    //////////////////////////////////////тут модальное окно


    $scope.open = function (bug) {
        $scope.isCollapsed = true;
        var modalInstance = $modal.open({
            templateUrl: 'app/partials/EditBug.html',
            controller: EditBug,

            resolve: {
                item: function () {
                    if (!bug) {
                        bug = { WhoReported: '', Status: '', Id: 0 };

                    };
                    return bug;
                },


            }
        });

        modalInstance.result.then(function (item) {

            Bug.update({ id: item.Id, status: item.Status, date: item.Date, whoReported: item.WhoReported }, function (data) {
                $scope.addAlert('success', 'success');
                if (item.Id == 0) {
                    if ($scope.currentPage == Math.ceil($scope.parameters.CountBugs / 10)) { //если находимся на посл странице- нужно обновить содержимое

                        item.Id = data.Id;
                        $scope.bugs.push(item);
                        //     $scope.bugs = Bug.query({ offset: ($scope.currentPage - 1) * 10, limit: 10, WhoReported: $scope.filterParams.whoRep, Status: $scope.filterParams.stat, SortBy: $scope.filterParams.sortBy, SortDirection: $scope.filterParams.sortDirection });

                    }
                    $scope.parameters.CountBugs++;

                }

            }, function () {
                $scope.addAlert('danger', 'error');
            });


        });
    };


    /////////////////////////////////////

    $scope.delete = function (bug) {
        Bug.delete({ id: bug.Id }, function () { $scope.addAlert('', 'deleted'); }, function () { $scope.addAlert('danger', 'error'); });
        $scope.parameters.CountBugs--;
        _.remove($scope.bugs, bug);
    };

}
]);





app.controller('Pagination', ['$scope', 'Bug', function ($scope, Bug) {
    $scope.parameters = Bug.get();
    $scope.currentPage = 1;
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

}]);





var EditBug = function ($scope, $modalInstance, item) {

    $scope.bug = item;
    $scope.error = false;

    $scope.stat = {
        isopen: false,
        isopen1: false
    };
    ////////////////это данные для списков
    $scope.statuses = [
        'fixed',
        'not fixed'
    ];

    $scope.names = ['pupkin', 'ivanov', 'kiselev'];
    //////

    $scope.ok = function (bug) {
        if ((!bug.WhoReported == '') && (!bug.Status == '') && (bug.Date)) {
            $scope.error = false;
            $modalInstance.close(bug);
        } else {
            $scope.error = true;
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};