/////////////////////////////////////// список багов
App.Collections.Bugs = Backbone.Collection.extend({
    model: App.Models.Bug,

    url: "http://localhost:6210/api/bug/"
});