"use strict";
var historyArray = [];
var AppRouter = Backbone.Router.extend({
    routes: {
        "add/newTicket": "addNewTicket",
        "detail/:id/:year": "athleteDetail",
        '': 'index',
    },

    $container: $('#dynamicContent'),
    initialize: function () {
        Backbone.history.start();
    },
    athleteDetail: function (id,year) {
        console.log(id)
        console.log(year)
        var view = new detail({
            el: $('#dynamicContent')
        });
        this.$container.html(view.render(id,year));
    },
    index: function () {
        var view = new dashboard({
            el: $('#dynamicContent')
        });
        this.$container.html(view.render());
    }
});

Backbone.Router.prototype.route = function (route, name, callback) {
    if (!_.isRegExp(route)) route = this._routeToRegExp(route);
    if (_.isFunction(name)) {
        callback = name;
        name = '';
    }
    if (!callback) callback = this[name];

    var router = this;

    Backbone.history.route(route, function (fragment) {
        var args = router._extractParameters(route, fragment);

        router.before.apply(router, arguments);
        callback && callback.apply(router, args);
        router.after.apply(router, arguments);

        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
    });
    return this;
};

Backbone.Router.prototype.before = function () {
    Backbone.Events.trigger('close');
};
Backbone.Router.prototype.after = function () {
};