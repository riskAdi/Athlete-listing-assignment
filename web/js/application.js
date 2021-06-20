var app = app || {};

var containerId = "#dynamicContent";
var router;
var ApplicationView = Backbone.View.extend({
    //bind view to body element (all views should be bound to DOM elements)
    el: $('body'),
    //observe navigation click events and mp to contained methods
    events: {
        'click .nav_detail': 'navigateDetail',
        'click #_dashboardPush': 'viewDashboard',
    },

    //called on instantiation
    initialize: function () {
        this.router = new AppRouter();
        router = this.router;
    },
    viewDashboard: function () {
        alert('test');
        this.router.navigate("", true);
    },
    navigateDetail: function (e) {
        var id = $(e.currentTarget).attr('data');
        var year = $(e.currentTarget).attr('year');
        window.location.href = '#detail/' + id + "/" +year;
    },
});
new ApplicationView();