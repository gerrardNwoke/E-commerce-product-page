// --------------- Image Functionality -----------------------

// prev and next functionality for the shoe images on phone and lightbox
const prev = document.querySelectorAll(".prev-btn");
const next = document.querySelectorAll(".next-btn");

let currentImg = 0;
let lastImg = 0;

// Prev Btn
function prevAction() {
    lastImg = currentImg;
    lastImgStyling(lastImg);
    resetThumbnailStyling(lastImg);

    currentImg--;

    if (currentImg < 0) {
        currentImg = 3;
    }

    currentImgStyling(currentImg);
    currentThumbnailStyling(currentImg);
}

// Prev btn for mobile size
prev[0].addEventListener("click", () => {
    prevAction();
})

// Prev btn for lightbox
prev[1].addEventListener("click", () => {
    prevAction();
})


// Next Btn
function nextAction() {
    lastImg = currentImg;
    lastImgStyling(lastImg);
    resetThumbnailStyling(lastImg);

    currentImg++;
    currentImg %= 4;

    currentImgStyling(currentImg);
    currentThumbnailStyling(currentImg);
}

// next btn for mobile size
next[0].addEventListener("click", () => {
    nextAction()
})

// next btn for lightbox
next[1].addEventListener("click", () => {
    nextAction()
})

// Animation Pattern for the Sneakers
function lastImgStyling(img) {
    const shoeImages = document.querySelectorAll(`.sneaker${img + 1}`);
    for (let i = 0; i < shoeImages.length; i++) {
        shoeImages[i].style.transition = "opacity 0.2s ease-in-out";
        shoeImages[i].style.opacity = "0";
        setTimeout (() =>{
            shoeImages[i].style.zIndex = "0";
        }, 200)
        
    }
}

function currentImgStyling(img) {
    const shoeImages = document.querySelectorAll(`.sneaker${img + 1}`);
    for (let i = 0; i < shoeImages.length; i++) {
        shoeImages[i].style.transition = "none";
        shoeImages[i].style.opacity = "1";
        setTimeout (() =>{
            shoeImages[i].style.zIndex = "1";
        }, 200)
    }
}

// Thumbnail Selection
document.addEventListener('click', (e) => {
    e = window.event;
    let target = e.target;

    console.log(target.classList.contains('active'));
    try{
        if (target.className.slice(0, 5) === "thumb" && target.className.slice(5) != "nail") {
            lastImg = currentImg;
            lastImgStyling(lastImg);
            resetThumbnailStyling(lastImg);
    
            currentImg = parseInt(`${target.className}`[5]) - 1;
            currentImgStyling(currentImg);
            currentThumbnailStyling(currentImg);
        }
        return;
    }

    catch(err){
        return
    }

    

}, false);

function currentThumbnailStyling(img) {
    const thumbnailCurrent = document.querySelectorAll(`.thumb${img + 1}`);
    console.log(thumbnailCurrent);

    for (let i = 0; i < thumbnailCurrent.length; i++) {
        thumbnailCurrent[i].style.border = "2px solid hsl(26, 100%, 55%)";
        thumbnailCurrent[i].style.opacity = "0.5";
    }
}

function resetThumbnailStyling(img) {
    const thumbnailPrev = document.querySelectorAll(`.thumb${img + 1}`);
    for (let i = 0; i < thumbnailPrev.length; i++) {
        thumbnailPrev[i].style.borderColor = "transparent";
        thumbnailPrev[i].style.opacity = "1";
    }
}

// Initializes the current image selected
currentThumbnailStyling(currentImg);

// ----------- Image Functionality ends ------------------------


// ----------- LightBox Functionality ---------------

const closeLightBox = document.querySelector('#close-lightbox');
const openLightBox = document.querySelector(".carousel");

const lightBoxContainer = document.querySelector('.lightbox-content');
const lightBoxBackdrop = document.querySelector('.lightbox');

// Close lightBox 

function closeFunc(){
    lightBoxContainer.style.transform = 'translateY(-50%)';
    lightBoxBackdrop.style.opacity = '0';

    setTimeout(() =>{
        lightBoxBackdrop.style.zIndex='-99';
    }, 500)
    
}

// with overlay
document.addEventListener('click',(e) =>{
    e = window.event;
    let target = e.target;
    if (target.className == "lightbox"){
        closeFunc()
    }
    return;
})

// with close Btn
closeLightBox.addEventListener('click', () => {
    closeFunc()
})


// Open lightBox 
openLightBox.addEventListener('click', () => {
    console.log(lightBoxContainer.className);
    lightBoxContainer.style.transform = 'translateY(0%)';
    lightBoxBackdrop.style.opacity = '1';
    lightBoxBackdrop.style.zIndex='99';
})

// ----------- LightBox Functionality Ends---------------



// ---------- Cart Functionality ----------------
// Counter
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const counter = document.getElementById("counter-num");
let countValue = 0;

minus.addEventListener("click", () => {
    if (countValue == 0) {
        return;
    }

    countValue--
    counter.innerText = countValue;

})

plus.addEventListener("click", () => {
    if (countValue == 50) {
        return;
    }

    countValue++
    counter.innerText = countValue;

})

// Open Cart
const cartBtn = document.getElementById("cart-btn");
const cartBasket = document.querySelector(".cart-status");
let cartDisplay = 0;
cartBasket.style.display = "none";

cartBtn.addEventListener('click', () => {
    cartDisplay++;
    cartDisplay %= 2;


    if (cartDisplay == 1) {
        cartBasket.style.display = "flex";

        // without this function the fade in animation doesn't work
        // And the 0 at the end of the function is used to give the idea a delay has occurred ..
        // ...thus activating the animation

        setTimeout(() => {
            cartBasket.style.opacity = "1";
            cartBasket.style.transform = "translateY(0)";
        }, 0)


    } else {

        cartBasket.style.opacity = "0";
        cartBasket.style.transform = "translateY(-30%)";

        setTimeout(() => {
            cartBasket.style.display = "none";
        }, 400)
    }
    console.log(cartDisplay);

})

// --------- Add to Cart --------------
const addToCartBtn = document.getElementById("add-to-cart");
const cartIndicator = document.getElementById("cart-indicator");

// Cart items
const emptyCart = document.getElementById("cart-empty"); // Empty Cart
const cartFill = document.querySelector(".item-in-cart"); // Filled Cart

// Check out Btn
const checkOut = document.querySelector(".checkout-btn");

// Check if the cart is empty
function indicatorNumCheck() {
    if (cartIndicator.innerText == "0") {
        cartIndicator.style.transform = "scale(0)";
        cartFill.style.display = "none";
        emptyCart.style.display = "unset";
        checkOut.style.display = "none";


    } else if (cartIndicator != "0") {
        cartIndicator.style.transform = "scale(1)";
        emptyCart.style.display = "none";
        cartFill.style.display = "grid";
        checkOut.style.display = "block";
    }
}

// Initial Check when program is ran
indicatorNumCheck();

// EventListener for Add to cart btn
let currentTotal = parseInt(cartIndicator.innerText);

addToCartBtn.addEventListener("click", () => {
    const productCountTag = document.querySelector("#item-count");

    currentTotal += parseInt(counter.innerText);

    cartIndicator.innerText = `${currentTotal}`;
    productCountTag.innerText = `${currentTotal}`;

    indicatorNumCheck();
    totalPrice(currentTotal);
})


function totalPrice(currentTotal) {
    const productPrice = document.querySelector("#item-price");
    const totalAmountTag = document.querySelector("#total-amount");
    console.log(productPrice.innerText);
    let totalPrice = parseFloat((productPrice.innerText).slice(1)) * currentTotal;
    totalAmountTag.innerText = `$${totalPrice.toFixed(2)}`;
}

// Delete Items
const deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener('click', () => {
    cartIndicator.innerText = "0";
    currentTotal = 0;
    indicatorNumCheck();
})


// ---------- Cart Functionality ---------------- ends


// ------------- Mobile Side bar Functionality ----------

const closeSideBar = document.querySelector(".close-sidebar");
const menuSideBar = document.querySelector('.menu-bar');
const sideBarSection = document.querySelector('.sidebar');
const sideBarContent = document.querySelector('.content');

// Close SideBar
closeSideBar.addEventListener('click', () =>{
    sideBarSection.style.opacity = '0';
    sideBarContent.style.transform = 'translateX(-100%)';
    setTimeout(() =>{
        sideBarSection.style.zIndex = '-1';
    }, 300)
})

// Open SideBar
menuSideBar.addEventListener('click', () =>{
    sideBarSection.style.opacity = '1';
    sideBarContent.style.transform = 'translateX(0)';
    sideBarSection.style.zIndex = '99';
    
})

// ------------- Mobile Side bar Functionality Ends ---------- 