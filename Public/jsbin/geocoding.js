var geocoder;
var map;

function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(39.205343, -76.8112909);
  var mapOptions = {
    zoom: 16,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function codeAddress(origin, address) {
  var address = document.getElementById('address').value;
  
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
      console.log("Lat Lng "+ results[0].geometry.location)
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function letMeCallYou()
{
  console.log("HELLO WOERLS!")
}