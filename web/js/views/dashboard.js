"use strict";
var dashboard = AppViewParentClass.extend({
  events: {},
  el:'div',
  initialize: function (options) {
      AppViewParentClass.prototype.initialize.call(this, options);
  },
  render: function () {
    var ref = this;
    $.get('templates/dashbords/dashboard.html', function (data) {
      
    fetch(`${ appConfig.baseUrl}athletes`).then(function (response) {
            return response.json();
    }).then(function (json) {
        var template = _.template(data);
        ref.$el.empty();
        json.data.forEach(element => {
            ref.$el.prepend(template({element:element}));
        });
        $('.owl-carousel').owlCarousel({
            loop:false,
            margin:10,
            responsiveClass:true,
            autoplay:true,
            rewind:true,
            responsive:{
                0:{
                    items:1,
                    nav:true
                },
                600:{
                    items:4,
                    nav:false
                },
                1000:{
                    items:8,
                    nav:true,
                    loop:false
                }
            }
        });
    }).catch(function(error){
    });
   }, 'html');
  }
});

