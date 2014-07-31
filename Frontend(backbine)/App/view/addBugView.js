////добавление\редактирование бага

App.Views.AddBug = Backbone.View.extend({
    el: '#addBug',

    events:
    {
        'click #add': 'addBug',
        'click #clear': 'clearField'
    },

    initialize: function () {

        _.bindAll(this, "createSuccess");
    },


    clearField: function () {
        $("#id").val(0);
        $("#whoRep").val('');
        $("#status").val('');
    },


    addBug: function () {
        var newBug = new App.Models.Bug({
            WhoReported: $("#whoRep").val(),
            Date: $("#date").val(),
            Status: $("#status").val(),
            Id: $("#id").val(),
        });



        newBug.save(null, {
            type: 'PUT',
            wait: true,

            url: 'http://localhost:6210/api/bug/'
                + '?' + 'id=' + newBug.attributes.Id
                + '&' + 'date=' + newBug.attributes.Date
                + '&' + 'status=' + newBug.attributes.Status
                + '&' + 'whoReported=' + newBug.attributes.WhoReported,

            success: this.createSuccess
        });



    },

    createSuccess: function (response) {
        var bug = _.find(this.collection.models, function (model)//можно юзать контаинс, но как-то криво работает
        {
            return model.attributes.Id == response.attributes.Id;
        });
        if (bug === undefined) {
            this.collection.add(response);

        }
        else {
            bug.set('Id', response.attributes.Id);
            bug.set('WhoReported', response.attributes.WhoReported);
            bug.set('Date', response.attributes.Date);
            bug.set('Status', response.attributes.Status);


        }
    },
});