//Вид одного бага
App.Views.Bug = Backbone.View.extend({
    tagName: 'tr',

    template: template('bugTemplate'),


    initialize: function () {
        this.render();
    },

    render: function () {

        this.$el.html(this.template(this.model.toJSON()));

        return this;
    }
});