"use strict";
// declare an array for the products names
var productsNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

// declare an empty array to push the number of clicks and views
var clicksArray = [];
var viewsArray = [];

// get the IDs for each image and store it in a viriable
var images = document.querySelector('#images');
var firstImage = document.querySelector('#firstImg');
var secondImage = document.querySelector('#secondImg');
var thirdImage = document.querySelector('#thirdImg');


// craete a constructor for the products and store them in an array
function Product(name) {
    this.name = name;
    this.imgPath = `IMG/${this.name}`;
    this.clicks = 0;
    this.views = 0;
    Product.all.push(this);
}

Product.all = [];


// send the products for the local storage then retrieve them 
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


// create new object for each product
for (var i = 0; i < productsNames.length; i++) {
    new Product(productsNames[i]);
}


retrieveProducts();


// declare variables for the products for each image to be stored in 
var firstProduct, secondProduct, thirdProduct;


function render() {


    // declare an array that stores the values of the for each product to prevent them from repeating     
    var unBiasedArray1 = [firstProduct, secondProduct, thirdProduct];


    // give a random product for first image and then keep trying if its repeated
    do {
        firstProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
        console.log('first', firstProduct);

    } while (unBiasedArray1.includes(firstProduct)) unBiasedArray1.push(firstProduct);


    // give a random product for second image and then keep trying if its repeated
    do {
        secondProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
        console.log('second', secondProduct);
    } while (unBiasedArray1.includes(secondProduct)) unBiasedArray1.push(secondProduct);


    // give a random product for third image and then keep trying if its repeated
    do {
        thirdProduct = Product.all[globalRandomNumber(0, Product.all.length - 1)];
        console.log('third', thirdProduct);

    } while (unBiasedArray1.includes(thirdProduct)) unBiasedArray1.push(thirdProduct);

    console.log(unBiasedArray1);

    
    // check if the images are repeted in the same round(just to make sure)
    if (firstProduct === thirdProduct || firstProduct === secondProduct || thirdProduct === secondProduct) {

        console.log('its not working', firstProduct, secondProduct, thirdProduct);
    }

    // remove the first 3 indexes from the the array if they are more than that
    while (unBiasedArray1.length > 3) {
        unBiasedArray1.shift();

    }
    console.log(unBiasedArray1);


    // set attributes for each image
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

// add event listner when clicking on an image
images.addEventListener('click', productClick);

// declare a variable to count total clicks
var totalClicks = 0;

// event listener fuction
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

// table render function
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

// global function to give a random number
function globalRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// chart render fuction
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