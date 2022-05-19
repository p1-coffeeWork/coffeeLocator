// Api Key for Google Maps AIzaSyBtc9LwjWT-8vxEDwPyfs2a-H6D6aQmoLU
// My current location
// TODO: Ethan to provide current location
var center_marker;

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

function renderMap(data) {
  console.log("yelp data");
  console.log(data);
  console.log(price,rate,reviewNumber);

var newBusinesses = data.businesses.filter(shop => shop.price === price || shop.rating === rate)
console.log(data)
data.businesses = newBusinesses

  current_loc = {
    lat: data.region.center.latitude,
    lng: data.region.center.longitude,
  };

  console.log(current_loc);
  // customize options
  var options = {
    zoom: 14,
    center: current_loc,
  };

  // map
  var map = new google.maps.Map(document.querySelector("#map"), options);

  //Center the map
  center_marker = new google.maps.Marker({
    position: current_loc,
    animation: google.maps.Animation.DROP,
    map: map,
    icon: "https://p1-coffeework.github.io/coffeeLocator/images/home-map-marker_50x50.png",
    // when changing github pages to main from googleAPI put assets before images
    title: "My Location",
  });
  center_marker.addListener("click", toggleBounce);

  // The marker, positioned at center
  // only return the top 10 records
console.log(data.businesses)
  data.businesses.forEach((shop) => {
    console.log(shop.coordinates.latitude,shop.coordinates.longitude)
    const shop_marker = new google.maps.Marker({
      position: {
        lat: shop.coordinates.latitude,
        lng: shop.coordinates.longitude,
      },
      map: map,
      icon: "https://p1-coffeework.github.io/coffeeLocator/images/green_cup_40x40.png",
      // same thing as before with home map marker
      title: shop.name,
    });

    var shop_content;

    shop.categories.forEach((cat) => {
      var print;
      shop_content += cat.title + ", ";
    });

    const infowindow = new google.maps.InfoWindow({
      content: shop_content.toString(),
    });

    shop_marker.addListener("click", () => {
      infowindow.open({
        anchor: shop_marker,
        map,
        shouldFocus: false,
      });
    });
  });

  // Create the DIV to hold the control and call the CenterControl()
  // constructor passing in this DIV.
  const centerControlDiv = document.createElement("div");

  CenterControl(centerControlDiv, map);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}

function toggleBounce(event) {
  if (center_marker.getAnimation() !== null) {
    center_marker.setAnimation(null);
  } else {
    center_marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

/**
 * The CenterControl adds a control to the map that recenters the map on
 * Chicago.
 * This constructor takes the control DIV as an argument.
 * @constructor
 */
function CenterControl(controlDiv, map) {
  // Set CSS for the control border.
  const controlUI = document.createElement("div");

  controlUI.style.backgroundColor = "blue";
  controlUI.style.border = "2px solid #fff";
  controlUI.style.borderRadius = "3px";
  controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlUI.style.cursor = "pointer";
  controlUI.style.marginTop = "8px";
  controlUI.style.marginBottom = "22px";
  controlUI.style.textAlign = "center";
  controlUI.title = "Click to recenter the map";
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  const controlText = document.createElement("div");

  controlText.style.color = "#ffffff";
  controlText.style.fontFamily = "Roboto,Arial,sans-serif";
  controlText.style.fontSize = "16px";
  controlText.style.lineHeight = "38px";
  controlText.style.paddingLeft = "5px";
  controlText.style.paddingRight = "5px";
  controlText.innerHTML = "Center Map";
  controlUI.appendChild(controlText);
  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener("click", () => {
    map.setCenter(current_loc);
  });
}

//renderMap(yelp_data);
