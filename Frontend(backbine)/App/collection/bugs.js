App.Collections.Bugs = Backbone.Collection.extend({
    model: App.Models.Bug,
    url: function () { return 'http://localhost:6210/api/bug/'; }
});