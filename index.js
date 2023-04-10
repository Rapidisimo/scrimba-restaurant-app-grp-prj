import { menuArray } from "./data.js"

/****** VARIABLES ******/

//! Create variable for menu items section in DOM 
const menuContainer = document.getElementById("menu-container");

//! Buttons we need
//! BTN var complete order
//! BTN var remove menu item
//! BTN var pay from modal
//! BTN var close modal
const tmp = document.querySelector('body') //temporary to remove console errors

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

function renderOrder(menuItems) {
    //TODO TASK #1 - Josue
    /*
    render HTML for "Your Order"
    */
    const orderItems = document.getElementById('order-summary');
    const cart = document.querySelector('.order-container')
    if(cart.classList.contains('hidden')) {
        cart.classList.toggle('hidden')
    }
    let orderHtml = '';
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
    orderItems.innerHTML = orderHtml;

        let itemsTotal = 0;
        for(let i = 0; i < cartArray.length; i++) {
            itemsTotal += (cartArray[i].price * cartArray[i].quantity)
        }

    runningTotal = itemsTotal
    document.getElementById('total').innerText = `$${runningTotal}`
}

/****** EVENT LISTENERS ******/

//?Event delegation?

//TODO TASK #1 - Josue
//! Listen for click on all menu items "add" button
menuContainer.addEventListener("click", (e) => {
    if(e.target.className === 'add-btn') {
        let item = e.target.dataset.item;
        const updateIndex = cartArray.findIndex((food => food.id == item))

        if(updateIndex > -1) {
            cartArray[updateIndex].quantity += 1;
        }else {
            cartArray.push({...menuArray[item], quantity: 1}); 
        }
        renderOrder(cartArray);
    }
    /*
    If "Your Order" is hidden then unhide it 
    Push menu item clicked to a cartArray 
    Add item name to "Your Order"
    Add menu item price to a running total 
    Call function to build "Your Order" --> renderOrder
    */

})

//TODO TASK #2 - Christina
//! BTN var remove menu item
tmp.addEventListener("click", function() {
    /*
    Remove item from "Your Order"
    Calculate / subtract running total
    If there are no items, then hide "Your Order"
    */
})


//TODO TASK #3 - Cassie
//! BTN var complete order
tmp.addEventListener("click", function() {
    /*
    show payment modal
    */
})

//TODO TASK #4 - Cassie
//! BTN var close modal
tmp.addEventListener("click", function() {
    /*
    close payment modal
    */
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