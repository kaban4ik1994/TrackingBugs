var addBugView;
var filterView;
var paginatedView;
var paginatedCollection;

var bugs = new App.Collections.Bugs().fetch({
    data: { offset: '0', limit: '1000' },

    success: function (collection) {
        var bugsView = new App.Views.Bugs({ collection: collection });
        addBugView = new App.Views.AddBug({ collection: collection });
        filterView = new App.Views.Filter({ collection: collection });
        paginatedView = new App.Views.PaginatedView({});
        $(document.body).append(bugsView.render().el);
    }
});


