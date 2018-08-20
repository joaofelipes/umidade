var g1
var humidity = getHumidity()

$(document).ready( function(){
      g1 = new JustGage({
      id: "g1",
      value: 0,
      min: 0,
      max: 100,
      title: "Humidade relativa",
      label: "porcento",
      shadowOpacity: 1,
      shadowSize: 5,
      shadowVerticalOffset: 10,
       customSectors: [{
        color : "#ff0000",
        lo : 0,
        hi : 30
      },{
        color : "#F7FE2E",
        lo : 30,
        hi : 60
      },{
        color : "#00ff00",
        lo : 60,
        hi : 100
      }],
    });
});

function getHumidity(){
    baseUrl =     "http://localhost:8080/"
    queryString = "?exclude=minutely,hourly,daily,flags,alerts&lang=pt"
    mylocation = [23.5287355,-46.842231];
    
    var now = new Date();
    Date.prototype.addHours= function(h){
        this.setHours(this.getHours()+h);
        return this;
    }
    
    if(this.id == "btnhour") {
        mylocation.push( Math.round((now.addHours(-1)).getTime() / 1000))
        url = baseUrl + mylocation.join() + queryString
    } else if (this.id == "btnday") {
        mylocation.push( Math.round((now.addHours(-24)).getTime() / 1000))
        url = baseUrl + mylocation.join() + queryString
    } else {
        url = baseUrl + mylocation.join() + queryString
    }
    $.ajax(url, {
        type: "GET",
        contentType: "application/json",
        //async:false,
    }).done(function (data) {
        humidity = (data.currently.humidity * 100);
        g1.refresh(humidity);
    }).fail(function (xhr, status, error) {
        $("#error").html("Could not reach the API: " + error);
    });
}


function notify (message) {
    var notification = document.querySelector('.mdl-js-snackbar');
    notification.MaterialSnackbar.showSnackbar(
      {
        message: message,
        timeout: 2000,
        actionHandler: function(event) {},
        actionText: 'Done'
      }
    );    

}

function dummie (){}

$( document ).ready(function(){
    $( "#btnday" ).on( "click", getHumidity );
    $( "#btnhour" ).on( "click", getHumidity );
    $( "#btnrefresh" ).on( "click", getHumidity );
});



