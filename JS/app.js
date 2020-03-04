"use strict";

var productsNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var clicksArray = [];
var viewsArray = [];

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

function sendProducts() {
    var productsString = JSON.stringify(Product.all);
    localStorage.setItem('Products', productsString);
}

function retrieveProducts() {
    var productsString = localStorage.getItem('Products');
    if (productsString) {
        Product.all = JSON.parse(productsString);
        render();
        renderResults();
        renderChart1();
    }


}


for (var i = 0; i < productsNames.length; i++) {
    new Product(productsNames[i]);
}





retrieveProducts();



var firstProduct, secondProduct, thirdProduct;

function render() {

    var unBiasedArray1 = [];

    firstProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
    secondProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
    thirdProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];

    unBiasedArray1.push(firstProduct.imgPath, secondProduct.imgPath, thirdProduct.imgPath);



    while (firstProduct.imgPath === thirdProduct.imgPath || firstProduct.imgPath === secondProduct.imgPath || thirdProduct.imgPath === secondProduct.imgPath) {

        var unBiasedArray1 = [];


        firstProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
        secondProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
        thirdProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];

        unBiasedArray1.push(firstProduct.imgPath, secondProduct.imgPath, thirdProduct.imgPath);

    }

    if (totalClicks > 0 && (unBiasedArray1.includes(firstProduct.imgPath) || unBiasedArray1.includes(secondProduct.imgPath) || unBiasedArray1.includes(thirdProduct.imgPath))) {

        // var unBiasedArray1 = [];

        firstProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
        secondProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
        thirdProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];

        unBiasedArray1.push(firstProduct.imgPath, secondProduct.imgPath, thirdProduct.imgPath);

    }



    firstImage.setAttribute('src', unBiasedArray1[0]);
    firstImage.setAttribute('alt', unBiasedArray1[0]);
    firstImage.setAttribute('title', unBiasedArray1[0]);

    secondImage.setAttribute('src', unBiasedArray1[1]);
    secondImage.setAttribute('alt', unBiasedArray1[1]);
    secondImage.setAttribute('title', unBiasedArray1[1]);

    thirdImage.setAttribute('src', unBiasedArray1[[2]]);
    thirdImage.setAttribute('alt', unBiasedArray1[2]);
    thirdImage.setAttribute('title', unBiasedArray1[2]);

}


render();

images.addEventListener('click', productClick);
var totalClicks = 0;


function productClick(event) {

    if (totalClicks < 25) {
        if (event.target.id !== 'images') {
            if (event.target.id === 'firstImg') {
                firstProduct.clicks++;
                // unBiasedArray1.push(firstProduct, secondProduct, thirdProduct);


            } else if (event.target.id === 'secondImg') {
                secondProduct.clicks++;
                // unBiasedArray1.push(firstProduct, secondProduct, thirdProduct);



            } else if (event.target.id === 'thirdImg') {
                thirdProduct.clicks++;
                // unBiasedArray1.push(firstProduct, secondProduct, thirdProduct);


            }

            totalClicks++;
            firstProduct.views++;
            secondProduct.views++;
            thirdProduct.views++;
            sendProducts()


        }


        render();






    } else {
        images.removeEventListener('click', productClick);
        renderResults();
        renderChart1();
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
        td1Result.textContent = (Product.all[i].name.split('.')[0]);
        tr2Result.appendChild(td1Result);

        var td2Result = document.createElement('td');
        td2Result.textContent = Product.all[i].views;
        tr2Result.appendChild(td2Result);

        var td3Result = document.createElement('td');
        td3Result.textContent = Product.all[i].clicks;
        tr2Result.appendChild(td3Result);

        clicksArray.push(Product.all[i].clicks);
        viewsArray.push(Product.all[i].views);



        // console.log(Product.all[i].name);

        // tdResult.textContent = `${Product.all[i].name}: ${Product.all[i].clicks} clicks and ${Product.all[i].views} views.`;
    }


}


function globalRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function renderChart1() {

    var ctx = document.getElementById('productChart1').getContext('2d');
    var productChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productsNames,
            datasets: [{
                label: "clicks",
                backgroundColor: "blue",
                data: clicksArray
            }, {
                label: "views",
                backgroundColor: "gray",
                data: viewsArray,


            }],


        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}