(function () {
    window.App = {
        Models: {},
        Views: {},
        Collections: {}
    };

    // хелпер шаблона
    window.template = function (id) {
        return _.template($('#' + id).html());
    };

    //модель бага
    App.Models.Bug = Backbone.Model.extend({
        defaults: {
            id: 0,
            whoReported: 'name',
            date: Date.now(),
            status: 'fixed'
        }
    });

    //вид одного бага
    App.Views.Bug = Backbone.View.extend({
        tagName: 'li',
        template: template('bugTemplate'),
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });


    //список багов
    App.Collections.Bugs = Backbone.Collection.extend(
   {
       model: App.Models.Bug
   });
    //вид списка багов
    App.Views.Bugs = Backbone.View.extend(
        {
            tagName: 'ul',
            initialize: function () {
                console.log(this.collection);
            },
            render: function () {
                this.collection.each(function (bug) {
                    var bugView = new App.Views.Bug({ model: bug })
                    this.$el.append(bugView.render().el);
                }, this);
                return this;
            }
        });




    var bugsCollection = new App.Collections.Bugs([
        {
            whoReported: 'Andrey'
        },
        {
            whoReported: 'Sasha'
        },
        {
            whoReported: 'Vasia'
        }
    ]);

    var bugsView = new App.Views.Bugs({ collection: bugsCollection });


    $(document.body).append(bugsView.render().el);
    console.log(bugsCollection);

}());
