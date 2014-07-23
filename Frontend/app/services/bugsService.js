app.factory('Bug', ['$resource', function ($resource) {
    return $resource('http://localhost:6210/api/bug', null, {
        update: { method: 'PUT', params: { id:'@id', date:'@date', status:'@status', whoReported:'@whoReported' } }

    })
}]);
