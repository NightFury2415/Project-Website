
  function buildCardsUsingStrings(data) {
    return `<button class="product-card" id="${data.id}" onclick="fadeOut(id)">
                <img class="prod-img" src="${data.thumbnail}" alt="Fake photo for id: ${data.id}" />
                <div class="prod-info">
                    <p class="prod-title">${data.title}</p>
                    <p class="prod-cost">${data.price}</p>
                </div>
            </div>`;
}

function fetchPhotos(){
  var url = "https://dummyjson.com/products";
  var total = 0;
  fetch(url)
  .then((response) =>{
      return response.json();
  }).then( (products) => {
      let productsList = products.products;
      let htmlString = '';
      productsList.forEach(element => {
          htmlString += buildCardsUsingStrings(element);
          total++;
      });
      document.getElementById('product-list').innerHTML = htmlString;
      document.getElementById("count").innerHTML= "The total number of pictures are: " + total;
  })
  .catch((error) =>{
      console.log(error);
  });

      var val = document.images.length;
       document.write("<br>Number of images in the document: "+val);
}


fetchPhotos();

function fadeOut(id) {
    var total = document.querySelectorAll(".product-card").length-1;
    document.getElementById("count").style.color="#e76006";
    document.getElementById("count").innerHTML= "The total number of pictures are: " + total;
    var element = document.getElementById(id);
    var op = 1; 
    var timer = setInterval(function () {
      if (op <= 0.1) {
        clearInterval(timer);
        element.remove(); 
      }
      element.style.opacity = op;
      op -= 0.1;
    }, 50);
}