var place;
var country;
var weatherstate;
var temperature;
var fahrenheit;
var weather;
/*This function will find the location of the current IP Address and access the fcc weather API*/
function getWeather() {

/*If geolocation is not supported by browser, an error message will display*/
  if (!navigator.geolocation){
   $('.weather'). html("Geolocation is not supported");
    return;
  }

  function success(position) {
    var latitude = position.coords.latitude;
     var longitude = position.coords.longitude;
     /*Retrieves weather API from server*/
     $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&" + "lon=" + longitude, function(json) {

      
      place = json['name'];
      country = json['sys']['country'];
      weatherstate= json['weather'][0]['main'];
      temperature = json['main']['temp'];
      fahrenheit = (9/5) * temperature + 32;
      weather = json['weather'][0]['icon'];

      $('.location').html(place + "," + country);
      $('.temperature').html(Math.round(temperature));
      $('#number').text("°C");
      $('.weatherstate').html(weatherstate);
      $('.image').attr('src', weather);
  
});


  }


/*Displays error message if location cannot be identified*/
  function error() {
    $('.weather'). html("Unable to retrieve your location");
  }

  $('.temperature'). html("Local...");
  /*Retrieves the latitude and longitude of the IP Address*/
if (navigator.geolocation){
  navigator.geolocation.getCurrentPosition(success, error);
   }
}

$(document).ready(function(){

  getWeather();
  
/*Converts temperature when button is pressed*/
$('.convert').on('click', function(){



if ($('#number').text() == "°C"){
$('.temperature').html(Math.round(fahrenheit));
$('#number').text('°F');
}

else{

  $('.temperature').html(Math.round(temperature));
    $('#number').text('°C');
}
 
 
    });

});

























