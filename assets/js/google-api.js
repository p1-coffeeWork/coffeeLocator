// Api Key for Google Maps AIzaSyBtc9LwjWT-8vxEDwPyfs2a-H6D6aQmoLU
// My current location
// TODO: Ethan to provide current location
var current_loc = {
  name: "My Place",
  lat: 41.87396088943666,
  lng: -87.95070683026313,
};

// TODO: Ethan to provide global array for shop locations
var shop_locs = [
  { name: "shop-1", lat: 41.87396088943666, lng: -87.95070683026313 },
  { name: "shop-2", lat: 41.87421, lng: -87.950763 },
  { name: "shop-3", lat: 41.877929, lng: -87.949245 },
  { name: "shop-4", lat: 41.875831, lng: -87.94628 },
];

// function updateCurrentLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       current_loc = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//       };
//       console.log("updateCurrentLocation-loc: ");
//       console.log(current_loc);
//     });
//   }
// }

// callback function
function initMap() {
  // Update current location is not working

  // updateCurrentLocation();

  console.log("initMap-loc: ");
  console.log(current_loc);
  // customize options
  var options = {
    zoom: 15,
    //center: { lat: 41.87396088943666, lng: -87.95070683026313 },
    center: { lat: current_loc.lat, lng: current_loc.lng },
    // center: { lat: 41.8739283, lng: -87.9509309 },
  };

  // map
  var map = new google.maps.Map(document.querySelector("#map"), options);

  // The marker, positioned at center
  shop_locs.forEach((shop) => {
    const marker = new google.maps.Marker({
      position: { lat: shop.lat, lng: shop.lng },
      map: map,
      //icon: "images/coffee_24x24.jpeg",
      title: shop.name,
    });
  });
}
