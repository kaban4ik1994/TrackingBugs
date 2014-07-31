/////////////////////////////////////////модель бага
App.Models.Bug = Backbone.Model.extend({
    urlRoot: "http://localhost:6210/api/bug/",

    defaults: {
        Id: 0,
        WhoReported: 'name',
        Date: "2014-07-15",
        Status: 'fixed'
    },
    validate:
        function (attrs) {
            if (!attrs.WhoReported) {
                return 'enter whoReported';
            }

            if (!attrs.Status) {
                return 'enter status';
            }
        }

});