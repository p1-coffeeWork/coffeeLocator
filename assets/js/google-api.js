// Api Key for Google Maps AIzaSyBtc9LwjWT-8vxEDwPyfs2a-H6D6aQmoLU

var center_marker; // My current location
var infoWindow;
var infoWindowIsClosed = true; // Tracks the state of the info window

// Sample location for testing
var current_loc = {
  name: "My Place",
  lat: 41.87396088943666,
  lng: -87.95070683026313,
};

// Renders google map after modal is submitted
function renderMap(data) {
  //console.log("yelp data", data);

  infoWindowIsClosed = true;

  // filter based on modal params
  var newBusinesses = data.businesses.filter((shop) => {
    var isValid = true;

    // This allows user to select a subset of filters
    if (price && isValid) {
      isValid = shop.price === price;
    }
    if (rate && isValid) {
      isValid = shop.rating >= rate;
    }
    if (numberReviews.value && isValid) {
      if (numberReviews.value == 25) {
        isValid = shop.review_count < 25;
      } else if (numberReviews.value == 101) {
        isValid = shop.review_count > 100;
      } else {
        isValid = shop.review_count > 25 && shop.review_count < 100;
      }
    }

    return isValid;
  });

  data.businesses = newBusinesses;

  current_loc = {
    lat: data.region.center.latitude,
    lng: data.region.center.longitude,
  };

  //console.log("current location: ", current_loc);
  // customize map options
  var options = {
    zoom: 12,
    center: current_loc,
  };

  // map object
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
  //console.log(data.businesses);
  data.businesses.forEach((shop) => {
    //console.log(shop.coordinates.latitude, shop.coordinates.longitude);
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

    shop_marker.addListener("click", () => {
      // Do the check
      if (infoWindow && !infoWindowIsClosed) {
        // Close the info window
        infoWindow.close();
        infoWindowIsClosed = true;
      }
      infoWindowIsClosed = false;

      //Set the new content
      infoWindow = new google.maps.InfoWindow({
        content: shop_content.toString(),
        maxWidth: screen.width,
      });

      infoWindow.setAnchor(shop_marker);

      //Open the infowindow
      infoWindow.open({
        anchor: shop_marker,
        map,
        shouldFocus: true,
      });
    });
  });

  // Create the DIV to hold the control and call the CenterControl()
  // constructor passing in this DIV.
  const centerControlDiv = document.createElement("div");

  CenterControl(centerControlDiv, map);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}

function generateInfoWindowCard(shop) {
  //console.log("shop");
  //console.log(shop);

  var shop_content = '<div class="col s12 border-red">';
  shop_content +=
    '<div class="card sticky-action border-red" style="padding: 10px">';

  var title =
    '<h3 class="card-title info-window-header truncate">' +
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
  address += '<address class="truncate mb-2 info-window-address">';
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
    '<a class="info-window-address truncate" href="tel:' +
    shop.phone +
    '" title="Call ' +
    shop.name +
    '">' +
    shop.display_phone +
    "</a></div>";

  var image = '<div class="card-image waves-effect waves-block waves-light">';
  image +=
    '<img src="' +
    shop.image_url +
    '" class="activator responsive-img info-window-img" style="margin: 10px">';
  image += "</div>";

  var card_content =
    '<div class="card-content" style="padding: 0px !important">';
  card_content +=
    '<span class="card-title activator grey-text text-darken-4 truncate">' +
    Math.round(shop.distance / 1609, 1) +
    ' mile(s) away<i class="material-icons right">more_vert</i></span>'; // convert distance from meters to miles
  card_content +=
    '<span class="card-title activator grey-text text-darken-4 truncate"><a title="view more information on Yelp" target="_blank" href="' +
    shop.url +
    '">View on Yelp</a></span>';
  card_content += "</div>";

  var categories = '<div class="col s12 border-red">';
  categories += '<span class="black-text">';

  categories += '<b style="font-size=14">Categories:</b> ';

  shop.categories.forEach((cat) => {
    categories += cat.title + ", ";
  });

  categories += "</span>";
  categories += "</div>";

  var card_reveal = '<div class="card-reveal">';
  card_reveal +=
    '<span class="card-title grey-text text-darken-4 text-truncate info-window-header">More Information<i class="material-icons right">close</i></span>';
  card_reveal += categories;
  card_reveal += "</div>";

  var card_action = '<div class="card-action">';
  card_action +=
    '<button class="btn waves-effect waves-light blue-grey col s12 m4 left">Review Count: ' +
    shop.review_count +
    "</button>";
  card_action +=
    '<button class="btn waves-effect waves-light blue-grey right col s12 m4 offset-m2">Rating: ' +
    shop.rating +
    "</button>";
  card_action += "</div>";

  // append all sections
  shop_content +=
    title + address + image + card_content + card_reveal + card_action;

  // close div tags
  shop_content += "</div></div></div>";

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

  controlUI.style.backgroundColor = "#0097a7";
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
  controlText.innerHTML = "Re-center map";
  controlUI.appendChild(controlText);
  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener("click", () => {
    map.setCenter(current_loc);
  });
}
