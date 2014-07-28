
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


    //модель бага
    App.Models.Bug = Backbone.Model.extend({
        urlRoot: "http://localhost:6210/api/bug/",
        defaults: {
            Id: 0,
            WhoReported: 'name',
            Date: "2014-07-15T00:00:00",
            Status: 'fixed'
            
        },

    });
   

    // список багов
    App.Collections.Bugs = Backbone.Collection.extend({
        model: App.Models.Bug,
        url: "http://localhost:6210/api/bug/"
    });


    //Вид списка багов. Сюда пихнем добавление
    App.Views.Bugs = Backbone.View.extend({
        tagName: 'table class="table table-hover"',

        initialize: function () {
            this.collection.on('add', this.addOne, this);
        },
        

        addOne: function(bug) {
            // создавать новый дочерний вид
            var bugView = new App.Views.Bug({ model: bug });
            // добавлять его в корневой элемент
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


    //Вид одного бага
    App.Views.Bug = Backbone.View.extend({
        tagName: 'tr',
        template: template('bugTemplate'),

        initialize: function () {

            this.model.on('destroy', this.remove, this);
            this.render();

        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        events: {
            'click .delete': 'destroy'
        },

        destroy: function () { //какой-то  костыль вышел, нужно исправить

            var bug = new App.Models.Bug({ id: this.model.attributes.Id }); // тупо заберем айди из нашей модельки и удалим объект, иначе не работает((( 
            bug.destroy();
            this.model.destroy();

        },

        remove: function () {
            this.$el.remove();

        }

    });

}());



////добавление бага

App.Views.AddBug = Backbone.View.extend({  //добавление добавить
    el: '#addBug',

    events:
    {
        'submit': 'submit'
    },

    initialize: function () {

    },


    submit: function (e) {
        e.preventDefault();

        var newWhoRep = $(e.currentTarget).find('input[type=text]').val();
        var newBug = new App.Models.Bug({ WhoReported: newWhoRep });
        this.collection.add(newBug);
        newBug.save({ data: { date: newBug.Date } });
        console.log(newBug.attributes.Date);
    }
});



var addBugView;
var bugs = new App.Collections.Bugs().fetch({
    data: { offset: '0', limit: '1000' },

    success: function (collection) {
        var bugsView = new App.Views.Bugs({ collection: collection });
        addBugView = new App.Views.AddBug({ collection: collection });
        $(document.body).append(bugsView.render().el);
    }

});



//var bugsView = new App.Views.Bugs({ collection: bugs });

