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

// var newBusinesses = data.businesses.filter(shop => shop.price === price || shop.rating === rate)
var newBusinesses = data.businesses.filter(shop => {
  var isReviewCount = false

  if (numberReviews.value == 25){
    isReviewCount = shop.review_count < 25
  } else if (numberReviews.value == 101){
    isReviewCount = shop.review_count > 100 
  } else {
    isReviewCount = shop.review_count > 25 && shop.review_count < 100
  }
  return shop.price === price && shop.rating >= rate && isReviewCount
})

data.businesses = newBusinesses

  current_loc = {
    lat: data.region.center.latitude,
    lng: data.region.center.longitude,
  };

  console.log(current_loc);
  // customize options
  var options = {
    zoom: 12,
    center: current_loc,
  };

  // map
  var map = new google.maps.Map(document.querySelector("#map"), options);

  //Center the map
  center_marker = new google.maps.Marker({
    position: current_loc,
    animation: google.maps.Animation.DROP,
    map: map,
    icon: "./assets/images/home-map-marker_50x50.png",
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
      icon: "./assets/images/green_cup_40x40.png",
      // same thing as before with home map marker
      title: shop.name,
    });

    var shop_content = generateInfoWindowCard(shop);

    const infowindow = new google.maps.InfoWindow({
      content: shop_content.toString(),
      maxWidth: "45%",
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

function generateInfoWindowContent(shop) {
  var shop_content = "";
  var categories = "\n<b>Categories:</b> ";
  var image = '<img src="' + shop.image_url + '" class="responsive-img">';

  shop.categories.forEach((cat) => {
    categories += cat.title + ", ";
  });

  return shop_content + categories + image;
}

function generateInfoWindowCard(shop) {
  console.log("shop");
  console.log(shop);

  var shop_content = '<div class="col s12 m8 offset-m2 border-red">';
  shop_content += '<div class="card sticky-action border-red">';

  var title =
    '<h3 class="card-title info-window-header">' +
    shop.name +
    (shop.price ? " - " + shop.price : "") +
    "</h3>";

  var address = '<div class="card-text info-window-text">';
  address +=
    '<p class="mb-1">' +
    (shop.is_closed
      ? '<span style="color: red">Closed</span>'
      : '<span style="color: green">Open</span>') +
    "</p>";
  address += '<address class="text-truncate mb-2 info-window-address">';
  address +=
    '<a title="Address map will open in a new tab" class="font-weight-bold" target="_blank" href="https://www.google.com/maps/dir/?api=1&amp;destination=' +
    shop.coordinates.latitude +
    "," +
    shop.coordinates.longitude +
    '">' +
    shop.location.display_address +
    "</a>";
  address += "</address>";
  address +=
    '<a class="info-window-address" href="tel:' +
    shop.phone +
    '" title="Call ' +
    shop.name +
    '">' +
    shop.display_phone +
    "</a></div>";

  var image = '<div class="card-image waves-effect waves-block waves-light">';
  image +=
    '<img src="' + shop.image_url + '" class="activator responsive-img">';
  image += "</div>";

  var card_content = '<div class="card-content">';
  card_content +=
    '<span class="card-title activator grey-text text-darken-4">' +
    Math.round(shop.distance / 1609, 1) +
    ' miles away<i class="material-icons right">more_vert</i></span>';
  card_content +=
    '<p><a title="view more information on Yelp" target="_blank" href="' +
    shop.url +
    '">View on Yelp</a></p>';
  card_content += "</div>";

  var categories = '<div class="col s8 border-red">';
  categories += '<span class="black-text">';

  categories += "<b>Categories:</b> ";

  shop.categories.forEach((cat) => {
    categories += cat.title + ", ";
  });

  categories += "</span>";
  categories += "</div>";

  var card_reveal = '<div class="card-reveal">';
  card_reveal +=
    '<span class="card-title grey-text text-darken-4">More Information<i class="material-icons right">close</i></span>';
  card_reveal += categories;
  card_reveal += "</div>";

  var card_action = '<div class="card-action">';
  card_action +=
    '<button class="btn waves-effect waves-light blue-grey">Review Count: ' +
    shop.review_count +
    "</button>";
  card_action +=
    '<button class="btn waves-effect waves-light blue-grey right">Rating: ' +
    shop.rating +
    "</button>";
  card_action += "</div>";

  // var card_action = '<div class="card-action">';
  // card_action +=
  //   '<button class="btn waves-effect waves-light blue-grey"><i class="material-icons">share</i></button>';
  // card_action +=
  //   '<a class="right blue-grey-text" href="http://www.tutorialspoint.com">www.tutorialspoint.com</a>';
  // card_action += "</div>";

  // append all sections
  shop_content +=
    title + address + image + card_content + card_reveal + card_action;

  // close div tags
  shop_content += "</div></div></div>";

  return shop_content;
}

function generateInfoWindowCardPanel(shop) {
  var shop_content = '<div class="col s12 border-red">';
  shop_content +=
    '<div class="card-panel border-red grey lighten-5 z-depth-1">';
  shop_content += '<div class="row info-window-row ">';

  var image = '<div class="col s4 border-red">';
  image += '<img src="' + shop.image_url + '" class=" responsive-img">';
  image += "</div>";

  var categories = '<div class="col s8 border-red">';
  categories += '<span class="black-text info-window-text">';

  categories += "<b>Categories:</b> ";

  shop.categories.forEach((cat) => {
    categories += cat.title + ", ";
  });

  categories += "</span>";
  categories += "</div>";

  // append all sections
  shop_content += image + categories;

  // close div tags
  shop_content += "   </div></div></div>";

  return shop_content;
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
