// import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js';

// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// const modalShppingCartOrder = new bootstrap.Modal(document.getElementById('modal-shppingCart-order'))
// modalShppingCartOrder.show();

// const ggg = document.getElementById('staticBackdropLabel');
// ggg.addEventListener('click',function(){
//   console.log('aaa');
// })

// import 判斷登入狀態樣板
import isLoggedIn from '/assets/js/components/isLoggedIn.js';
// 登入狀態 token
let _token = localStorage.getItem("token");
console.log(_token);

let UID = location.href.split("=")[1];;
const shoppingCart = document.querySelector('.shopping-cart')
console.log(shoppingCart);
shoppingCart.addEventListener('click', function() {

});
// console.log(UID);
const isGroupings = UID.startsWith("G") ? true : false;
if(isGroupings){
  console.log('a');
}else{
  console.log('b');
}