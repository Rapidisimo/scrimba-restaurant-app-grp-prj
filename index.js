import { menuArray } from "./data.js"

/****** VARIABLES ******/

//! Create variable for menu items section in DOM 
const menuContainer = document.getElementById("menu-container");
const completeBtn = document.getElementById("complete-btn");
const modalCloseBtn = document.getElementById("close-btn");

const paymentModal = document.getElementById("payment-modal");
//! Buttons we need

//! BTN var remove menu item
//! BTN var pay from modal
//! BTN var close modal
const tmp = document.querySelector('body') //temporary to remove console errors

let cartArray = [];
let runningTotal = 0;

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
    const cart = document.querySelector('.order-container')

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

    //    paymentModal.style.display = "block";
    if(paymentModal.classList.contains('hidden')) { //toggle Payment Modal visible
        paymentModal.classList.toggle('hidden')
    }

})

modalCloseBtn.addEventListener("click", function() {
    paymentModal.classList.toggle('hidden') //toggle Payment Modal invisible
})


//TODO TASK #5 - Cassie
//! BTN var pay from modal
tmp.addEventListener("click", function() {
    /*
    close payment modal, display thank you message
    "Thanks Name! Your order is on its way!"
    */
})


//TODO TASK #6
//! STRETCH GOAL - meal discount
    /* add logic to discount meal under certain conditions*/

//TODO TASK #7
//! STRETCH GOAL - rate experience, 0 - 5 stars
    /* 
    add to thank you message
    idea: radio inputs as stars
    added idea link to HTML 
    */