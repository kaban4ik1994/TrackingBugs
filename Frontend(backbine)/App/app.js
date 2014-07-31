
(function () {
    window.App =
    {
        Models: {},
        Views: {},
        Collections: {}
    };

    //хэлпер шаблона
    window.template = function (id) {
        console.log(_.template($('#' + id).html()));
        return _.template($('#' + id).html());
    };

    //////////


}());



/////////////////////////////////////////////////пагинация




