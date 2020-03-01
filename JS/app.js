"use strict";

var productsNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var images = document.querySelector('#images');
var firstImage = document.querySelector('#firstImg');
var secondImage = document.querySelector('#secondImg');
var thirdImage = document.querySelector('#thirdImg');


function Product(name) {
    this.name = name;
    this.imgPath = `IMG/${this.name}`;
    this.clicks = 0;
    this.views = 0;
    Product.all.push(this);
}

Product.all = [];


for (var i = 0; i < productsNames.length; i++) {
    new Product(productsNames[i]);
}



var firstProduct, secondProduct, thirdProduct;


function render() {
    firstProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
    secondProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
    thirdProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];


    while (firstProduct === secondProduct || secondProduct === thirdProduct || thirdProduct === firstProduct) {
        firstProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
        secondProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
        thirdProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
    }


    firstImage.setAttribute('alt', firstProduct.productName);
    firstImage.setAttribute('src', firstProduct.imgPath);
    firstImage.setAttribute('title', firstProduct.productName);

    secondImage.setAttribute('alt', secondProduct.productName);
    secondImage.setAttribute('src', secondProduct.imgPath);
    secondImage.setAttribute('title', secondProduct.productName);

    thirdImage.setAttribute('alt', thirdProduct.productName);
    thirdImage.setAttribute('src', thirdProduct.imgPath);
    thirdImage.setAttribute('title', thirdProduct.productName);

}



render();

images.addEventListener('click', productClick);
var totalClicks = 0;

function productClick(event) {

    if (totalClicks < 25) {
        if (event.target.id !== 'images') {
            if (event.target.id === 'firstImg') {
                firstProduct.clicks++;
            } else if (event.target.id === 'secondImg') {
                secondProduct.clicks++;
            } else if (event.target.id === 'thirdImg') {
                thirdProduct.clicks++;
            }
            totalClicks++;
            firstProduct.views++;
            secondProduct.views++;
            thirdImage.views++;
            render();

        }
    } else {
        images.removeEventListener('click', productClick);
        renderResults();
    }
}

function renderResults() {

    var tableResult = document.getElementById('results');

    var tr1Result = document.createElement('tr');
    tableResult.appendChild(tr1Result);

    var th1Result = document.createElement('th');
    th1Result.textContent = 'Product';
    tr1Result.appendChild(th1Result);

    var th2Result = document.createElement('th');
    th2Result.textContent = 'Views';
    tr1Result.appendChild(th2Result);


    var th3Result = document.createElement('th');
    th3Result.textContent = 'Clicks';
    tr1Result.appendChild(th3Result);




    for (var i = 0; i < Product.all.length; i++) {

        var tr2Result = document.createElement('tr');
        tableResult.appendChild(tr2Result);

        var td1Result = document.createElement('td');
        td1Result.textContent = Product.all[i].name;
        tr2Result.appendChild(td1Result);

        var td2Result = document.createElement('td');
        td2Result.textContent = Product.all[i].views;
        tr2Result.appendChild(td2Result);

        var td3Result = document.createElement('td');
        td3Result.textContent = Product.all[i].clicks;
        tr2Result.appendChild(td3Result);

        // console.log(Product.all[i].name);

        // tdResult.textContent = `${Product.all[i].name}: ${Product.all[i].clicks} clicks and ${Product.all[i].views} views.`;
    }



}


function globalRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
