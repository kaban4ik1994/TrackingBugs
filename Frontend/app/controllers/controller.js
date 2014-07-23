
app.controller('BugListCtrl', ['$scope', 'Bug', '$timeout', '$modal', function ($scope, Bug, $timeout, $modal) {


    ///////это выпадающий список

    $scope.status = {
        isopen: false,
        isopen1: false,
        isopen2:false
};



$scope.filterParams =

{
    whoRep: '',
    stat: '',
    sortBy: '',
    sortDirection:null
};



$scope.chooseItem = function (whoR, st, sortBy, sortD) {
    $scope.status.isopen = false;
    $scope.status.isopen1 = false;
    $scope.status.isopen2 = false;
    $scope.filterParams.whoRep = whoR;
    $scope.filterParams.stat = st;
    $scope.filterParams.sortBy = sortBy;
    $scope.filterParams.sortDirection = sortD;
    $scope.currentPage = 1;
    $scope.bugs = Bug.query({ offset: ($scope.currentPage - 1) * 10, limit: 10, WhoReported: $scope.filterParams.whoRep, Status: $scope.filterParams.stat, SortDirection: $scope.filterParams.sortDirection, SortBy: $scope.filterParams.sortBy });
    $scope.parameters = Bug.get({ WhoReported: $scope.filterParams.whoRep, Status: $scope.filterParams.stat });
};
/////////


//////////////////////////////// тут пагинация 

$scope.currentPage = 1;


$scope.StatusDropDownList = ['fixed',
    'not fixed'];


$scope.parameters = Bug.get({ WhoReported: $scope.filterParams.whoRep, Status: $scope.filterParams.stat, SortBy: $scope.filterParams.sortBy, SortDirection: $scope.filterParams.sortDirection });


$scope.pageChanged = function () {
    $scope.bugs = Bug.query({ offset: ($scope.currentPage - 1) * 10, limit: 10, WhoReported: $scope.filterParams.whoRep, Status: $scope.filterParams.stat, SortBy: $scope.filterParams.sortBy, SortDirection: $scope.filterParams.sortDirection });
};
//////////////////////////////////


$scope.bugs = Bug.query({
    offset: ($scope.currentPage - 1) * 10, limit: 10, WhoReported: $scope.filterParams.whoRep, Status: $scope.filterParams.stat, SortBy: $scope.filterParams.sortBy, SortDirection: $scope.filterParams.sortDirection
});

//////////////////////////////////////тут модальное окно


$scope.open = function (bug) {

    var modalInstance = $modal.open({
        templateUrl: 'app/partials/EditBug.html',
        controller: EditBug,

        resolve: {
            item: function () {
                return bug;
            },


        }
    });

    modalInstance.result.then(function (item) {

        Bug.update({ id: item.Id, status: item.Status, date: item.Date, whoReported: item.WhoReported }, function () {
            if (item.Id == 0) {
                if ($scope.currentPage == Math.ceil($scope.parameters.CountBugs / 10)) { //если находимся на посл странице- нужно обновить содержимое

                    $scope.bugs = Bug.query({ offset: ($scope.currentPage - 1) * 10, limit: 10, WhoReported: $scope.filterParams.whoRep, Status: $scope.filterParams.stat, SortBy: $scope.filterParams.sortBy, SortDirection: $scope.filterParams.sortDirection });
                }
                $scope.parameters.CountBugs++;

            }

        });


    });
};


/////////////////////////////////////

$scope.delete = function (bug) {
    Bug.delete({ id: bug.Id });
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

    ////////////////это данные для списков
    $scope.statuses = [
        'fixed',
        'not fixed'
    ];

    $scope.names = ['pupkin', 'ivanov', 'kiselev'];
    //////

    $scope.ok = function (bug) {
        if (isNaN(bug.Id)) {
            bug.Id = 0;
        }
        $modalInstance.close(bug);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};