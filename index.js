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
    /*
    Function: Build menu items HTML from data.js 
    Create variable to hold output 
    For Each MenuArray item output it's property to the designated html and add it to the output variable 
    return the output variable 

    Variable for menu items innerHTML = function to build menu items 
    */
}

renderMenu()

/****** EVENT LISTENERS ******/

//?Event delegation?

//!Listen for click on all menu items
menuContainer.addEventListener("click", function() {
    /*
    Push menu item clicked to a cartArray 
    Add menu item price to a running total 
    If "Your Order" is hidden then unhide it 
    Call function to build "Your Order" 
    */

})

//! BTN var complete order
.addEventListener("click", function() {
    /*
    show modal
    */
})

//! BTN var remove menu item
.addEventListener("click", function() {
    /*
    remove menu item
    //? remove from cart array
    //? remove from running total
    */
})

//! BTN var pay from modal
.addEventListener("click", function() {
    /*
    close payment modal, display thank you message
    "Thanks Name! Your order is on its way!"
    */
})

//! BTN var close modal
.addEventListener("click", function() {
    /*
    close payment modal
    */
})



//!STRETCH GOALS: 
//!MEAL DISCOUNT, EX: FOOD AND BEVERAGE TOGETHER, 15% DISCOUNT
//!RATING

