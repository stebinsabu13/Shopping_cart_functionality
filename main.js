let cartIcon=document.querySelector('#cart-icon');
let cart=document.querySelector('.cart');
let closeCart=document.querySelector('#close-cart');
let cartNum=document.querySelectorAll('#add-cart');
let products=[
    {
        name:"Cucumber",
        tag:'cucumber',
        price:'20',
        incart:'0',
        img:"img/img1.png"
    },
    {
        name:"Tomato",
        tag:'tomato',
        price:'50',
        incart:'0',
        img:"img/img2.png"
    },
    {
        name:"Lemon",
        tag:'lemon',
        price:'40',
        incart:'0',
        img:"img/img3.png"
    },
    {
        name:"Onion",
        tag:'onion',
        price:'80',
        incart:'0',
        img:"img/img4.png"
    },
    {
        name:"Ladyfinger",
        tag:'ladyfinger',
        price:'40',
        incart:'0',
        img:"img/img5.png"
    },
    {
        name:"Ginger",
        tag:'ginger',
        price:'50',
        incart:'0',
        img:"img/img6.png"
    },
    {
        name:"Carrot",
        tag:'carrot',
        price:'30',
        incart:'0',
        img:"img/img7.png"
    },
    {
        name:"Garlic",
        tag:'garlic',
        price:'80',
        incart:'0',
        img:"img/img8.png"
    },
    {
        name:"Potato",
        tag:'potato',
        price:'40',
        incart:'0',
        img:"img/img9.png"
    }
];
onLoadCartNUmbers();
function onLoadCartNUmbers(){
    let productNumbers=localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.num').innerText=productNumbers;
    }
}
displayCart();
function displayCart(){
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    let productContainer=document.querySelector('.order-box');
    let bottomContainer=document.querySelector('.bottom');
    if(cartItems&&productContainer){
        productContainer.innerHTML='';
        bottomContainer.innerHTML='';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML+=`
            <div class='order-details mb-2 border-bottom border-danger pb-2'>
                <img src="${item.img}">
                <div class="mx-3">
                    <div class="order-name my-2">${item.name}</div>
                    <div class="price my-2">Rs ${item.price}</div>
                    <div class="oredr-quantity">Nos: ${item.incart}</div>
                </div>
                <button class="impo btn">
                <span class="material-symbols-outlined text-danger">
                    delete
                </span>
                </button>
            </div>
            `
            // let del=document.querySelectorAll('.order-details');
            let imp=document.querySelectorAll('.impo');
            // imp.tag=item.tag;
            // imp.addEventListener('click',function(){
                // console.log('running');
                // // deleteCartNum(del[i]);
                // // deltotalCost(del[i]);
                // })
            for(let i=0;i<imp.length;i++){
                imp[i].addEventListener('click',function(){
                    // imp[i]=Object.entries(cartItems)
                    // // console.log(imp[i]);
                    // imp[i].tag=cartItems[i].tag;
                    // console.log(imp[i].tag);
                    // console.log(cartItems.product[i].tag.name);
                deleteCartNum();
                // deltotalCost(del[i]);
                })
            }
        });
        bottomContainer.innerHTML+=`
        <button class="btn bg-danger text-light mt-5 ms-5"> 
        Buy Now
        </button>
        <span>Total Rs:${localStorage.getItem('totalCost')}</span>
        `
    }
    else{
        bottomContainer.innerHTML+=`
        <button class="btn bg-danger text-light mt-5 ms-5">
        Buy Now
        </button>
        <span>Total Rs:0</span>
        `
    }
}
cartIcon.onclick = function() {
    cart.classList.add("active");
}
closeCart.onclick=function(){
    cart.classList.remove('active');
}
for(let i=0;i<cartNum.length;i++){
    cartNum[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
function cartNumbers(product){
    let productNumbers=localStorage.getItem('cartNumbers');
    productNumbers=parseInt(productNumbers);
    if(productNumbers)
    {
        localStorage.setItem('cartNumbers',productNumbers+1);
        document.querySelector('.num').innerText=productNumbers+1;
    }
    else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.num').innerText=1;
    }
    setItem(product);
}
function setItem(product){
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    if(cartItems!=null){
        if(cartItems[product.tag]==undefined){
            cartItems={
                ...cartItems,
                [product.tag]:product
            };
            product.incart=1;
        }
        else{
            cartItems[product.tag].incart+=1;
        }
    }
    else{
        product.incart=1;
        cartItems={
             [product.tag]:product
        };
    }
    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
}
function totalCost(product){
    let cartCost=localStorage.getItem('totalCost');
    let a=parseInt(product.price);
    if(cartCost!=null){
        cartCost=parseInt(cartCost);
        cartCost+=a;
        localStorage.setItem("totalCost",cartCost);
    }
    else{
        localStorage.setItem("totalCost",a);
    }
    displayCart();
}
function deleteCartNum(){
    let productNumbers=localStorage.getItem('cartNumbers');
    productNumbers=parseInt(productNumbers);
    if(productNumbers)
    {
        localStorage.setItem('cartNumbers',productNumbers-1);
        document.querySelector('.num').innerText=productNumbers-1;
    }
    else{
        localStorage.setItem('cartNumbers',0);
        document.querySelector('.num').innerText=0;
    }
    // delItem(product);
}
// function delItem(product){
//     console.log(product);
//     let a=document.getElementsByClassName('order-details');
//     console.log(a);
//     let cartItems=localStorage.getItem('productsInCart');
//     cartItems=JSON.parse(cartItems);
//     let verify=product.incart;
//     if(cartItems!=null){
        
//         if(verify==1){
//             console.log('running')
//             delete cartItems.product.tag;
//             // cartItems.delete(cartItems[product.tag]);
//             // cartItems={
//             //     ...cartItems,
//             //     [product.tag]:product
//             // };
//             product.incart=0;
//         }
//         else{
//             cartItems[product.tag].incart-=1;
//         }
//     }
//     // else{
//     //     product.incart=1;
//     //     cartItems={
//     //          [product.tag]:product
//     //     };
//     // }
//     localStorage.setItem('productsInCart',JSON.stringify(cartItems));
// }
// function deltotalCost(product){

// }