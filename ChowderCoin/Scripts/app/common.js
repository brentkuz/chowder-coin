var app = app || {};

(function ($) {
    console.log("load common")
    //namespace
    

    //pub/sub
    var topics = {};

    $.Topic = function (id) {
        var callbacks,
            topic = id && topics[id];
        if (!topic) {
            callbacks = $.Callbacks();
            topic = {
                publish: callbacks.fire,
                subscribe: callbacks.add,
                unsubscribe: callbacks.remove
            };
            if (id) {
                topics[id] = topic;
            }
        }
        return topic;
    };

    //services
    app.Services = app.Services || {};

    app.Services.ValuesService = {
        getRates: function () {
            return [
                new Rate(1, "Clam", .55, 18),
                new Rate(2, "Corn", .31, -7),
                new Rate(3, "Potato", .34, 3),
                new Rate(4, "Seafood", .63, 13)
            ];
        },
        getDenominations: function () {
            return [
                new Denomination(1, "1 oz"),
                new Denomination(5, "5 oz"),
                new Denomination(10, "10 oz")
            ];
        }
    };

})(jQuery);
