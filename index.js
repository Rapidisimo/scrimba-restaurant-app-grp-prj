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
const discountModal = document.getElementById("discount-modal")

//needed global scope on this variable
const cart = document.querySelector('.order-container')

const customerName = document.getElementById("customer-name");
const cardNumber = document.getElementById("card-number");
const cvv = document.getElementById("cvv");

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
          <button class="remove-btn hidden" data-item="${item.id}">-</button>
        </div>`
    })
    menuContainer.innerHTML = menuFeed; 
}

renderMenu()

function removeItem(id) { //individually enable (-) button based on id of item added to order/cart
    const removeBtn = document.querySelectorAll('.remove-btn');
    removeBtn.forEach( function(minusBtn) {
        if(minusBtn.classList.contains('hidden') && id === minusBtn.dataset.item) {
            minusBtn.classList.toggle('hidden')
        }
    })
}

function removeMinusBtn(id) { //if you remove all of the same type of item this remove the minus btn
    const removeBtn = document.querySelectorAll('.remove-btn');
    removeBtn.forEach( function(minusBtn) {
        if(id === minusBtn.dataset.item) {
            minusBtn.classList.toggle('hidden')
        }
    })
}

function renderOrder(menuItems) {//Your Order section 
    const orderItems = document.getElementById('order-summary');
    if(cart.classList.contains('hidden') || cartArray.length === 0) { //toggle Your Order section visible
        cart.classList.toggle('hidden');
    }
    let orderHtml = ''; //go through each item in the array and build out the Your Order section
    menuItems.forEach( menuItem => {
        orderHtml += `
            <div class="item-category">
                <div class="item-info">
                    <p class="item-name" id="${menuItem.name}">${menuItem.name} ( ${menuItem.quantity} )</p>
                    <button class="remove-all-btn" data-item="${menuItem.id}">remove all</button>
                </div>
                <p>$${menuItem.price * menuItem.quantity}</p>
            </div>
            `
            removeItem(menuItem.id) //call function to enable (-) button as items are added to Your Order/cart
    })
    orderItems.innerHTML = orderHtml; //update DOM

    let itemsTotal = 0; //for loop to get a Total Price
    for(let i = 0; i < cartArray.length; i++) {
        itemsTotal += (cartArray[i].price * cartArray[i].quantity)
    }
    runningTotal = itemsTotal //update global variable
    document.getElementById('total').innerText = `$${runningTotal}` //update DOM

    const removeBtns = document.querySelectorAll('.remove-all-btn')
    removeBtns.forEach( btn => {
        btn.addEventListener('click', (e) => { //listener to remove all items of the same type and update order
            if(e.target.classList.contains('remove-all-btn')) {
                let item = e.target.dataset.item;
                cartArray = cartArray.filter((food => food.id !== item))
                removeMinusBtn(item)
                renderOrder(cartArray)
                renderMealDiscount(cartArray)
            }
        })
    })
}

function renderMealDiscount(arr) {

//! CASSIE'S ORIGINAL SPAGHETTI    
//     if (arr.length <= 1) {
//         discountModal.classList.add('hidden')
//         document.getElementById('total').innerText = `$${runningTotal}`

//     } else if (arr.length >= 2)  {
//         discountModal.classList.remove('hidden')
//         let discount = (runningTotal * 0.15).toFixed(2)
//         let discountAmt = (runningTotal - discount).toFixed(2)
    
//         document.getElementById('discount').innerText = `-$${discount}`
//         document.getElementById('total').innerText = `$${discountAmt}`
    
//     } 

//         cartArray.filter(function(item) {
//         if (item.quantity > 1) {
//         discountModal.classList.remove('hidden')
//         let discount = (runningTotal * 0.15).toFixed(2)
//         let discountAmt = (runningTotal - discount).toFixed(2)

//         document.getElementById('discount').innerText = `-$${discount}`
//         document.getElementById('total').innerText = `$${discountAmt}`
//             }
//     })

// }

//! CHAT GPT SUGGESTIONS TO CLEAN UP SPAGHETTI

    // variable stores an or conditional as well as using the .some method to see if at least one item in the array is greater than 1
    let showDiscount = arr.length >= 2 || cartArray.some(item => item.quantity > 1)
    
    //if conditionals are true show modal, create and display discount
    if (showDiscount) {
        let discount = (runningTotal * 0.15).toFixed(2)
        let discountAmt = (runningTotal - discount).toFixed(2)
        discountModal.classList.remove('hidden')
        document.getElementById('discount').innerText = `-$${discount}`
        document.getElementById('total').innerText = `$${discountAmt}`

    // otherwise hide the discount modal and use unmodified running total    
    } else {
        discountModal.classList.add('hidden')
        document.getElementById('total').innerText = `$${runningTotal}`
    }
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
    renderMenu();

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
        if(updateIndex > -1) { //if the item is already in the array increase its quantity
            cartArray[updateIndex].quantity += 1;
        }else {
            cartArray.push({...menuArray[item], quantity: 1}); //if the item is not in the array add it and the quantity property
        }
        renderOrder(cartArray);
        renderMealDiscount(cartArray)
    
      
    } else if(e.target.className === 'remove-btn') {
        let item = e.target.dataset.item; //get an id for what was clicked
        const updateIndex = cartArray.findIndex((food => food.id == item)) //array method to find an item
        cartArray[updateIndex].quantity -= 1; //reduce item count
        renderOrder(cartArray);
        renderMealDiscount(cartArray);

        if(cartArray[updateIndex].quantity === 0) { //if item is at 0 remove it from array
            cartArray = cartArray.filter((food => food.id !== item))
            e.target.classList.toggle('hidden')//hide (-) button because quantity is 0
            renderOrder(cartArray);
            renderMealDiscount(cartArray);
            
        }
    }
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