import { menuArray } from "./data.js"

/****** VARIABLES ******/

//! Create variable for menu items section in DOM 
const menuContainer = document.getElementById("menu-container");

//! Buttons we need
//! BTN var complete order
//! BTN var remove menu item
//! BTN var pay from modal
//! BTN var close modal

//! var cartArray 
//! var runningTotal 
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

function renderOrder() {
    //TODO TASK #1
    /*
    render HTML for "Your Order"
    */
}

/****** EVENT LISTENERS ******/

//?Event delegation?

//TODO TASK #1
//! Listen for click on all menu items "add" button
//? Should we add quantity to data.js?
menuContainer.addEventListener("click", function() {
    /*
    If "Your Order" is hidden then unhide it 
    Push menu item clicked to a cartArray 
    Add item name to "Your Order"
    Increase item quantity if greater than 1
    Display item price, add price if greater than 1
    Add menu item price to a running total 
    Call function to build "Your Order" --> renderOrder
    */

})

//TODO TASK #2
//! BTN var remove menu item
.addEventListener("click", function() {
    /*
    Decrease item quantity
    Subtract item price
    Remove item from cartArray if less than 1
    Calculate / subtract running total
    */
})


//TODO TASK #3
//! BTN var complete order
.addEventListener("click", function() {
    /*
    show payment modal
    */
})

//TODO TASK #4
//! BTN var close modal
.addEventListener("click", function() {
    /*
    close payment modal
    */
})

//TODO TASK #5
//! BTN var pay from modal
.addEventListener("click", function() {
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