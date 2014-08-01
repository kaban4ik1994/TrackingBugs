App.Views.PaginatedView = Backbone.View.extend({
    el: '#pagination',

    events: {
        'click .pager #prev': 'previousPage',
        'click .pager #next': 'nextPage'
    },

    totalPage: function () {
        return Math.ceil(options.attributes.CountBugs / options.itemsToPage);
    },

 

    stateNext: true,
    statePrev: true,

    previousPage: function () {
  
        options.offset = options.offset - options.itemsToPage;
        if (options.offset < 0) {
            options.offset = 0;
           
        } else {
            $('table').remove();
            $('#pagination .pager').children()[1].className = 'active';
            bugs = new App.Collections.Bugs().fetch({
                data: { offset: options.offset, limit: options.itemsToPage, WhoReported: $('#param').val() },

                success: function(collection) {
                    var bugsView = new App.Views.Bugs({ collection: collection });
                    addBugView.collection = collection;
                    if (collection.length != 0) {
                        $(document.body).append(bugsView.render().el);

                    }

                }
            });
        };
        
        if (options.offset == 0) {
            $('#pagination .pager').children()[0].className = 'disabled';
        }

    },



    nextPage: function () {
       

        // 
        options.offset = options.offset + options.itemsToPage;
        if (bugs.responseJSON.length<10) {
            options.offset = options.offset - options.itemsToPage;
            
        } else {
            $('table').remove();
            $('#pagination .pager').children()[0].className = 'active';
            bugs = new App.Collections.Bugs().fetch({
                data: { offset: options.offset, limit: options.itemsToPage, WhoReported: $('#param').val() },

                success: function (collection) {
                    

                    if (collection.length < 10) {
                        $('#pagination .pager').children()[1].className = 'disabled';
                    }

                    var bugsView = new App.Views.Bugs({ collection: collection });
                    addBugView.collection = collection;
                    $(document.body).append(bugsView.render().el);
                }
            });
        };
      
        
    },

    initialize: function () {

        $('#pagination').append('<ul class="pager">');
        $('#pagination .pager').append('<li class="disabled"><a id="prev"  href="#">Previous</a></li>');
        $('#pagination .pager').append('<li><a id="next" href="#">Next</a></li>');
        $('#pagination').append('</ul>');
    }
})
