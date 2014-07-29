
(function () {
    window.App =
    {
        Models: {},
        Views: {},
        Collections: {}
    };

    //хэлпер шаблона
    window.template = function (id) {
        return _.template($('#' + id).html());
    };

    //////модель параметров с сервера
    App.Models.Params = Backbone.Model.extend({
        url: "http://localhost:6210/api/bug/",

    });

    //////////


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


    /////////////////////////////////////// список багов
    App.Collections.Bugs = Backbone.Collection.extend({
        model: App.Models.Bug,
        url: "http://localhost:6210/api/bug/"
    });


    //////////////////////////////////////////////Вид списка багов
    App.Views.Bugs = Backbone.View.extend({
        tagName: 'table',
        attributes:
        {
            "class": "table table-hover"
        },
        initialize: function () {
            this.collection.on('add', this.addOne, this);
        },


        addOne: function (bug) {
            var bugView = new App.Views.Bug({ model: bug });
            this.$el.append(bugView.render().el);
        },

        render: function () {

            this.collection.each(function (bug) {
                var bugView = new App.Views.Bug({ model: bug });
                this.$el.append(bugView.render().el);
            }, this);

            return this;
        }

    });


    ////////////////////////////////////////////////////////Вид одного бага
    App.Views.Bug = Backbone.View.extend({
        tagName: 'tr',
        template: template('bugTemplate'),



        initialize: function () {

            this.model.on('destroy', this.remove, this);
            this.model.on('change', this.render, this);
            this.render();

        },


        render: function () {
            this.model.attributes.Date = this.model.attributes.Date.split('T')[0];
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        events: {
            'click .delete': 'destroy',
            'click .edit': 'edit'
        },

        destroy: function () { //какой-то  костыль вышел, нужно исправить

            var bug = new App.Models.Bug({ id: this.model.attributes.Id }); // тупо заберем айди из нашей модельки и удалим объект, иначе не работает((( 
            bug.destroy();
            this.model.destroy();

        },

        edit: function () {

            $("#id").val(this.model.attributes.Id);
            $("#whoRep").val(this.model.attributes.WhoReported);
            $("#date").val(this.model.attributes.Date.split('T')[0]);
            $("#status").val(this.model.attributes.Status);
        },

        remove: function () {
            this.$el.remove();

        }

    });

}());

////////////////////////////////////////////////////////////////когда-нибудь тут будет пагинация
App.Views.PaginationView = Backbone.View.extend(
    {


    });

////добавление\редактирование бага

App.Views.AddBug = Backbone.View.extend({  ////ппц криво работает
    el: '#addBug',

    events:
    {
        'click #add': 'submit',
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

    submit: function () {
        console.log("dsdasda");
        var newBug = new App.Models.Bug({
            WhoReported: $("#whoRep").val(),
            Date: $("#date").val(),
            Status: $("#status").val(),
            Id: $("#id").val(),
        });

        newBug.fetch({
            // тут должен быть метод save, но он не работет) поэтому костыль(
            type: 'PUT',
            url: 'http://localhost:6210/api/bug/' + '?' + 'id=' + newBug.attributes.Id + '&' + 'date=' + newBug.attributes.Date + '&' + 'status=' + newBug.attributes.Status + '&' + 'whoReported=' + newBug.attributes.WhoReported,
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

////////////////////////////////////////////////////////////////////////////////////////////// тут фильтрация
App.Views.Filter = Backbone.View.extend(
    {
        el: '#filter',

        events:
        {
            'click #filt':'filterBugs'
        },


        filterBugs: function() {
            console.log($('#param').val());
            $('table').remove();
            bugs = new App.Collections.Bugs().fetch({
                data: { offset: '0', limit: '1000', WhoReported: $('#param').val()},

                success: function (collection) {
                    var bugsView = new App.Views.Bugs({ collection: collection });
                    addBugView = new App.Views.AddBug({ collection: collection });
                    $(document.body).append(bugsView.render().el);
                }

            });



        },

        initialize: function () {
            var params = new App.Models.Params().fetch({
                success:
                    function (response) {

                        var names = response.toJSON().ParametersForAFilter;
                        $('#filter').append('<select id="param">');
                        $('#filter select').append('<option></option>');
                        for (var i = 0; i < names.length; i++) {
                            $('#filter select').append('<option>' + names[i] + '</option>');
                        }
                        $('#filter').append('</select>');

                        $('#filter').append('<button id="filt" class="btn btn-info">filter</button>');
                    }
            });
            


        }

    }

);

new App.Views.Filter();






//////////////////////////////////////////////////////////////////////////////////////////////

var addBugView;
var bugs = new App.Collections.Bugs().fetch({
    data: { offset: '0', limit: '1000' },

    success: function (collection) {
        var bugsView = new App.Views.Bugs({ collection: collection });
        addBugView = new App.Views.AddBug({ collection: collection });
        $(document.body).append(bugsView.render().el);
    }

});



