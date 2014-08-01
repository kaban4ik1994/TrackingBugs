////////////////////////////////////////////////////////////////////////////////////////////// тут фильтрация
var options = new App.Models.Params();
App.Views.Filter = Backbone.View.extend(
    {
        el: '#filter',
        events:
        {
            'click #filt': 'filterBugs'
        },


        filterBugs: function () {
            $('table').remove();
            $('#pagination .pager').children()[0].className = 'disabled';
            $('#pagination .pager').children()[1].className = 'active';
            options.offset = 0;
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
                        options.set('ParametersForAFilter', names);
                        options.set('CountBugs', response.toJSON().CountBugs);

                    }
            });
        }

    }

);