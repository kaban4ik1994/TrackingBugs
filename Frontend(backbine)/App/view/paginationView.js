App.Views.PaginatedView = Backbone.View.extend({
    el: '#pagination',

    events: {
        'click .pager #prev': 'previousPage',
        'click .pager #next': 'nextPage'
    },

    totalPage: function () {
        return Math.ceil(options.attributes.CountBugs / options.itemsToPage);
    },

    offset: 0,

    stateNext: true,
    statePrev: true,

    previousPage: function () {
        $('table').remove();
        $('#param').val('');
        this.offset = this.offset - options.itemsToPage;
        bugs = new App.Collections.Bugs().fetch({
            data: { offset: this.offset, limit: options.itemsToPage },

            success: function(collection) {
                var bugsView = new App.Views.Bugs({ collection: collection });
                addBugView.collection = collection;
                if (collection.length != 0) {
                    $(document.body).append(bugsView.render().el);
                  
                }

            }            
        })
       
            ;
          

    },



    nextPage: function () {
        $('table').remove();
        $('#param').val('');
        this.offset = this.offset + options.itemsToPage;
        bugs = new App.Collections.Bugs().fetch({
            data: { offset: this.offset, limit: options.itemsToPage },

            success: function (collection) {
                var bugsView = new App.Views.Bugs({ collection: collection });
                addBugView.collection = collection;
                $(document.body).append(bugsView.render().el);
            }
        });
    },

    initialize: function () {

        $('#pagination').append('<ul class="pager">');
        $('#pagination .pager').append('<li><a id="prev" class="previous" href="#">Previous</a></li>');
        $('#pagination .pager').append('<li><a id="next" class="next" href="#">Next</a></li>');
        $('#pagination').append('</ul>');
    }
})
