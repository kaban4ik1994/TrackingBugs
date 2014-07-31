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