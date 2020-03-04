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

function check() {

    while (firstProduct === thirdProduct || firstProduct === secondProduct || thirdProduct === secondProduct) {
        var unBiasedArray1 = [];
        firstProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
        secondProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
        thirdProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];

    }



}



retrieveProducts();



var firstProduct, secondProduct, thirdProduct;

function render() {
    var unBiasedArray1 = [];


    firstProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
    secondProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
    thirdProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];

    unBiasedArray1.push(firstProduct, secondProduct, thirdProduct);



    while (firstProduct === thirdProduct || firstProduct === secondProduct || thirdProduct === secondProduct) {

         unBiasedArray1 = [];


        firstProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
        secondProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
        thirdProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
        unBiasedArray1.push(firstProduct, secondProduct, thirdProduct);


        console.log(firstProduct);
        console.log(unBiasedArray1);

    }



    if (totalClicks > 0) {
        console.log('muna1');
        console.log("firstFalse", unBiasedArray1.includes(firstProduct));

        while (unBiasedArray1.includes(firstProduct)) {
            console.log('diana1');


            // var unBiasedArray1 = [];

            firstProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];


            console.log("first", unBiasedArray1);
            unBiasedArray1.shift();

        }unBiasedArray1.push(firstProduct);

        
    }

    if (totalClicks > 0) {
        console.log('muna2');
        console.log("secondFalse", unBiasedArray1.includes(secondProduct));

        while (unBiasedArray1.includes(secondProduct)) {

            console.log('diana2');

            // var unBiasedArray1 = [];

            secondProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];

            console.log("second", unBiasedArray1);

            unBiasedArray1.shift();

        }unBiasedArray1.push(secondProduct);


    }

    if (totalClicks > 0) {

        console.log('muna');
        console.log("thirdFalse", unBiasedArray1.includes(thirdProduct));

        while (unBiasedArray1.includes(thirdProduct)) {
            console.log('diana3');


            // var unBiasedArray1 = [];

            thirdProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];

            console.log("third", unBiasedArray1);
            unBiasedArray1.shift()

        }unBiasedArray1.push(thirdProduct)

    }



    // unBiasedArray1.push(firstProduct, secondProduct, thirdProduct);
    // console.log(unBiasedArray1);
    // while (unBiasedArray1.length > 3) {
    //     unBiasedArray1.shift();
    //     console.log(unBiasedArray1);

    // }





    firstImage.setAttribute('src', firstProduct.imgPath);
    firstImage.setAttribute('alt', firstProduct.imgPath);
    firstImage.setAttribute('title', firstProduct.imgPath);

    secondImage.setAttribute('src', secondProduct.imgPath);
    secondImage.setAttribute('alt', secondProduct.imgPath);
    secondImage.setAttribute('title', secondProduct.imgPath);

    thirdImage.setAttribute('src', thirdProduct.imgPath);
    thirdImage.setAttribute('alt', thirdProduct.imgPath);
    thirdImage.setAttribute('title', thirdProduct.imgPath);

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