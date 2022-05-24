const baseURL = 'https://api.sampleapis.com/coffee/hot';

function renderHotCoffee (data){
  //console.log(data);
  $('#title1').text(data[0].title);
  $('#description1').text(data[0].description);
  $('#ingredient1').text(data[0].ingredients[0]);
  $('#ingredient2').text(data[0].ingredients[1]);
  $('#ingredient3').text(data[0].ingredients[2]);
  $('#ingredient4').text(data[0].ingredients[3]);
  
  $('#title2').text(data[1].title);
  $('#description2').text(data[1].description);
  $('#ingredient5').text(data[1].ingredients[0]);
  $('#ingredient6').text(data[1].ingredients[1]);
  $('#ingredient7').text(data[1].ingredients[2]);
  $('#ingredient8').text(data[1].ingredients[3]);
   
  $('#title3').text(data[2].title);
  $('#description3').text(data[2].description);
  $('#ingredient9').text(data[2].ingredients[0]);
  $('#ingredient10').text(data[2].ingredients[1]);
  
  $('#title4').text(data[11].title);
  $('#description4').text(data[11].description);
  $('#ingredient11').text(data[11].ingredients[0]);
  $('#ingredient12').text(data[11].ingredients[1]);
  $('#ingredient13').text(data[11].ingredients[2]);
 
  $('#title5').text(data[4].title);
  $('#description5').text(data[4].description);
  $('#ingredient14').text(data[4].ingredients[0]);
  $('#ingredient15').text(data[4].ingredients[1]);
  $('#ingredient16').text(data[4].ingredients[2]);
  $('#ingredient17').text(data[4].ingredients[3]);
 
  $('#title6').text(data[16].title);
  $('#description6').text(data[16].description);
  $('#ingredient18').text(data[16].ingredients[0]);
  $('#ingredient19').text(data[16].ingredients[1]);
  $('#ingredient20').text(data[16].ingredients[2]);
  $('#ingredient21').text(data[16].ingredients[3]);
  
 }
 
function coffeeApi (){
 fetch(baseURL)
  .then(resp => resp.json())
  
  .then(data => renderHotCoffee(data));

// function displayData(data) {
//   document.querySelector("pre").innerHTML = JSON.stringify(data, null, 2);
}

coffeeApi();
