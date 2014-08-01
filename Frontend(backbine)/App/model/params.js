//////модель параметров с сервера
App.Models.Params = Backbone.Model.extend({
    url: "http://localhost:6210/api/bug/",
    defaults: {
        ParametersForAFilter:'',
        CountBugs:0
    },
    
    itemsToPage: 10,
    offset:0
});