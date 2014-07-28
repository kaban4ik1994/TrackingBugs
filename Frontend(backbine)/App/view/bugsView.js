App.Views.Bugs = Backbone.View.extend({
    tagName: 'table class="table table-hover"',


    initialize: function () {
    },

    render: function () {
        this.collection.each(function (bug) {
            var bugView = new App.Views.Bug({ model: bug });

            this.$el.append(bugView.render().el);
        }, this);

        return this;
    }

});