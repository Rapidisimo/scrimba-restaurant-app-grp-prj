import { menuArray } from "./data.js"

/****** VARIABLES ******/

const menuContainer = document.getElementById("menu-container");
const completeBtn = document.getElementById("complete-btn");
const paymentModal = document.getElementById("payment-modal");
const modalCloseBtn = document.getElementById("close-btn");
const modalPayBtn = document.getElementById("pay-btn");
const thankYouModal = document.getElementById("thank-you-modal");
const ratingModal = document.getElementById("rating-modal");
const newOrderBtn = document.getElementById("new-order-btn");


//needed global scope on this variable
const cart = document.querySelector('.order-container')

const customerName = document.getElementById("customer-name");
const cardNumber = document.getElementById("card-number");
const cvv = document.getElementById("cvv");

const tmp = document.querySelector('body') //temporary to remove console errors

let cartArray = [];
let runningTotal = 0;
let message = "";
const ratingStars = [...document.getElementsByClassName("rating-star")]


/****** FUNCTIONS ******/

function renderMenu() {
    let menuFeed = ""
    menuArray.forEach(function(item) {
        menuFeed += ` <div class="menu-item">
          <div class="menu-item-details">
            <span class="menu-item-emoji">${item.emoji}</span>
            <div>
              <h2 class="menu-item-name">${item.name}</h2>
              <p class="menu-item-ingredients">
                ${item.ingredients}
              </p>
              <p class="menu-item-price">$${item.price}</p>
            </div>
          </div>
          <button class="add-btn" data-item="${item.id}">+</button>
        </div>`
    })
    menuContainer.innerHTML = menuFeed; 
}

renderMenu()

function renderOrder(menuItems) {
    const orderItems = document.getElementById('order-summary');
   
    if(cart.classList.contains('hidden')) { //toggle Your Order section visible
        cart.classList.toggle('hidden')
    }
    let orderHtml = ''; //go through each item in the array and build out the Your Order section
    menuItems.forEach( menuItem => {
        orderHtml += `
            <div class="item-category">
                <div class="item-info">
                    <p class="item-name" id="${menuItem.name}">${menuItem.name} ( ${menuItem.quantity} )</p>
                    <button id="remove-btn">remove</button>
                </div>
                <p>$${menuItem.price * menuItem.quantity}</p>
            </div>
            `
    })
    orderItems.innerHTML = orderHtml; //update DOM

    let itemsTotal = 0; //for loop to get a Total Price
    for(let i = 0; i < cartArray.length; i++) {
        itemsTotal += (cartArray[i].price * cartArray[i].quantity)
    }
    runningTotal = itemsTotal //update global variable
    document.getElementById('total').innerText = `$${runningTotal}` //update DOM
}


function renderThankYouMsg() {
    let name = customerName.value;
 
   //render thank you message
   message = `
    <div class="thank-you-msg">
      <p class="message">Thanks ${name}!</p>
      <p class="message">Your order is on its way!</p>
    </div>`
}

function completeOrder() {
    
    renderThankYouMsg()

    //validate user input   
    if (customerName.value && cardNumber.value && cvv.value) {    
   
    paymentModal.classList.toggle('hidden'); //toggle Payment Modal invisible
    cart.classList.toggle('hidden'); //toggle Your Order invisible
    
    if(thankYouModal.classList.contains('hidden')) { //toggle thank you modal visible
        thankYouModal.classList.toggle('hidden');
   
        thankYouModal.innerHTML = message; //render thank you msg     
    }}

    if (ratingModal.classList.contains('hidden')) { //toggle rating modal visible
        ratingModal.classList.toggle('hidden');
    }

    resetOrder()
}


function resetOrder() {
    
    //reset Your Order
    cartArray = [];
    runningTotal = 0;

    //! Do input fields clear automatically because of type "submit"?
    // clear input fields
    customerName.value = "";
    cardNumber.value = "";
    cvv.value = "";

    //thank you and rating modals invisible if user clicks one of the add buttons to start a new order
    menuContainer.addEventListener("click", (e) => {
        if(e.target.className === 'add-btn') {
            thankYouModal.classList.add('hidden'); 
            ratingModal.classList.add('hidden');
        }})

}


function renderRating(stars) {
    const starClassActive = "rating-star fa-solid fa-star fa-lg" //solid star
    const starClassInactive = "rating-star fa-regular fa-star fa-lg" //regular star
    const starsLength = stars.length //length of array

    stars.map(star => {
        star.addEventListener("click", function() { //check for clicks on each star
            let index = stars.indexOf(star); //index receives the index of each star clicked
        
            if (star.className === starClassInactive) { //if the star that is clicked is "not filled"
            for (index; index >= 0; index--) {
                stars[index].className = starClassActive //fills all stars before clicked star
            }
            } else { //star clicked is "filled"
            for (index; index < starsLength; index++) {
                stars[index].className = starClassInactive //all stars above clicked star will be "not filled"
            }
            }

        })
    })
}

renderRating(ratingStars)


/****** EVENT LISTENERS ******/

menuContainer.addEventListener("click", (e) => {
    if(e.target.className === 'add-btn') {
        let item = e.target.dataset.item; //get an id for what was clicked
        const updateIndex = cartArray.findIndex((food => food.id == item)) //array method to find an item

        if(updateIndex > -1) { //if the item is already in the array increase it's quantity
            cartArray[updateIndex].quantity += 1;
        }else {
            cartArray.push({...menuArray[item], quantity: 1}); //if the item is not in the array add it and the quantity property
        }
        renderOrder(cartArray);
    }
})


//TODO TASK #2 - Christina
//! BTN var remove menu item

tmp.addEventListener("click", function() {

    /*
    Remove item from "Your Order"
    Calculate / subtract running total
    If there are no items, then hide "Your Order"
    */
// })
})

completeBtn.addEventListener("click", function() {
    if(paymentModal.classList.contains('hidden')) { //toggle Payment Modal visible
        paymentModal.classList.toggle('hidden');
    }

})

modalCloseBtn.addEventListener("click", function() {
    paymentModal.classList.toggle('hidden'); //toggle Payment Modal invisible
})


modalPayBtn.addEventListener("click", function() {
   completeOrder();  
})

newOrderBtn.addEventListener("click", function() {
    thankYouModal.classList.toggle('hidden');
    ratingModal.classList.toggle('hidden');
})





//TODO Remaining tasks
/*
Decrement button in menu
Remove all button in "your order"

Accessibility - hover states

Stretch goal - meal discount
Buy two items get 15% off 

Stretch goal - star rating
Cassie will implement from other files
New order button  

Code cleanup

Live site

Accessibility check

README update?

*/ 