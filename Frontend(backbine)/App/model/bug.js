
App.Models.Bug = Backbone.Model.extend({
    defaults: {
        Id: 0,
        WhoReported: 'name',
        Date: Date.now(),
        Status: 'fixed'
    }
});