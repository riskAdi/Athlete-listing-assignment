"use strict";

var detail = AppViewParentClass.extend({
  events: {},
  el:'div',
  initialize: function (options) {
      AppViewParentClass.prototype.initialize.call(this, options);
  },
  showHistory : function(id){
    var ref = this;
    fetch(appConfig.baseUrl + "athletes/history/"+id).then(function (response) {
            return response.json();
        }).then(function (json) { 
            if(json.data.length > 0){
                ref.$el.find('#games_history').empty();
                json.data.forEach(element => {
                    var template = '<tr> \
                            <td>'+element.year+', '+element.city+'</td> \
                            // <td>G <button class="btn btn-circle" style="background-color: #ffce00;color: black;" type="button">'+element.gold+'</button> S  <button style="background-color: #d8d8d8;color: black;" class="btn btn-circle" type="button" >'+element.silver+'</button> B <button style="background-color: #cc8251;color: black;" class="btn btn-circle" type="button">'+element.bronze+'</button></td>\
                        </tr>';
                   ref.$el.find('#games_history').append(template);
                });
            }
        }).catch(function(error){});

  },
  render: function (id,year) {
    var ref = this;
    $.get('templates/detail/detail.html', function (data) {
      fetch(appConfig.baseUrl +"athletes/detail/"+id+"/"+year).then(function (response) {
            return response.json();
        }).then(function (json) {
            if(json.data.length > 0){
                var template = _.template(data);
                ref.$el.html(template({obj:json.data[0]}));
                ref.$el.find('.ath_detail').removeClass('hide');
                ref.showHistory(id);
            }else{
                var template = _.template(data);
                ref.$el.html(template({obj:{}}));
                ref.$el.find('.error_404').removeClass('hide');
            }
        }).catch(function(error){
            var template = _.template(data);
            ref.$el.html(template({obj:{}}));
        });

   }, 'html');
  }
});
