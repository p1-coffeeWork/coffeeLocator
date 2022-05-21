// modal trigger
$(document).ready(function () {
  $(".modal").modal();

  console.log(
    "local storage filters: ",
    JSON.parse(localStorage.getItem("coffee-locator-filter"))
  );

  var filter = JSON.parse(localStorage.getItem("coffee-locator-filter"));

  if (filter) {
    $("#price-range").val(filter.price);
    $("#rating").val(filter.rate);
    $("#number-of-reviews").val(filter.reviewNumber);
  }
});

// form selection options
$(document).ready(function () {
  $("select").formSelect();
});

// form text-input(zipcode)
$(document).ready(function () {
  M.updateTextFields();
});
