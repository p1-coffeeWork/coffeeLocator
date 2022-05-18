var token =
  "Bearer msMwMqOdMhH4dl0FgHEy0F7ETBrij21nJbjNtU-jmoM4jg48xbTxsvWNg7Ejoc0l341jD7ZveF2e7P4DKtDIdlTOkfR2bwglwWjBHoZguaOCIPB3TH4QHmh8umx9YnYx";
var cors_anywhere_url = "https://cors-anywhere-bc.herokuapp.com";
var yelp_search_url = "https://api.yelp.com/v3/businesses/search";

var yelp_data;

function clientCallback() {
  console.log("made it to the client callback");
}
var requestObj;
if ("geolocation" in navigator) {
  var modalEl = document.querySelector("#modal1");
  var maplink = document.querySelector("#map-link");

  function handleYelpData(data) {
    console.log(data);
    //window.location = "./maps.html";
    // yelp_data = data;
    renderMap(data);
  }

  // requesting permission to get location info
  navigator.geolocation.getCurrentPosition(
    // will be called if user allows location info
    function (position) {
      maplink.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(event);

        var queryParams = new URLSearchParams({
          term: "coffee",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        fetch(`${cors_anywhere_url}/${yelp_search_url}?${queryParams}`, {
          headers: { Authorization: token },
        })
          .then(function (response) {
            return response.json();
          })
          .then(handleYelpData)
          .catch(function (error) {
            console.error(error);
          });
      });
    },
    // will be called if user denies or there is an error
    function (error) {
      // adding zip input for location
      $(modalEl.querySelector(".modal-content")).append(`
        <div class="input-field col s6">
          <input id="zip_code" type="text" class="validate">
          <label for="zip_code">Zip Code</label>
        </div>
      `);

      modalEl.addEventListener("submit", function (event) {
        event.preventDefault();

        var zipCode = modalEl.querySelector("input#zip_code").value.trim();
        var queryParams = new URLSearchParams({
          term: "coffee",
          location: zipCode,
        });
        fetch(`${cors_anywhere_url}/${yelp_search_url}?${queryParams}`, {
          headers: { Authorization: token },
        })
          .then(function (response) {
            return response.json();
          })
          .then(handleYelpData)
          .catch(function (error) {
            console.error(error);
          });
      });
    }
  );
}

// function displayMap() {
//   var queryParams = new URLSearchParams({
//     term: "coffee",
//     latitude: 41.87396088943666,
//     longitude: -87.95070683026313,
//   });
//   fetch(`${cors_anywhere_url}/${yelp_search_url}?${queryParams}`, {
//     headers: { Authorization: token },
//   })
//     .then(function (response) {
//       return response.json();
//     })
//     .then(handleYelpData);
// }

// maplink.addEventListener("click", displayMap);
