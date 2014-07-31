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