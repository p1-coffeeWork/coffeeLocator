var token =
  "Bearer msMwMqOdMhH4dl0FgHEy0F7ETBrij21nJbjNtU-jmoM4jg48xbTxsvWNg7Ejoc0l341jD7ZveF2e7P4DKtDIdlTOkfR2bwglwWjBHoZguaOCIPB3TH4QHmh8umx9YnYx";
var cors_anywhere_url = "https://cors-anywhere-bc.herokuapp.com";
var yelp_search_url = "https://api.yelp.com/v3/businesses/search";
function clientCallback() {
  console.log("made it to the client callback");
}

var requestObj = {
  url: cors_anywhere_url + "/" + yelp_search_url,
  data: { term: "coffee", location: "60611" },
  headers: { Authorization: token },
  error: function (jqXHR, textStatus, errorThrown) {
    console.log(
      "AJAX error,jqXHR = ",
      jqXHR,
      ", textStatus = ",
      textStatus,
      ",errorThrown = ",
      errorThrown
    );
  },
};

function searchYelp() {
  $.ajax(requestObj).done(function (response) {
    console.log("typeof response = " + typeof response);
    console.log("response = ", response);

    // Display business on Map
    renderMap(response);
  });
}

// initialize Yelp request
searchYelp();
