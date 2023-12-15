// import 星級樣板
import showStars from "/assets/js/components/showStars.js";
// import 判斷登入狀態樣板
import isLoggedIn from '/assets/js/components/isLoggedIn.js';
// 處理購物車時間(享用時間、訂購期限)
import timeForCarts from '/assets/js/components/timeForCarts.js';
// 計算成團、投票進度條
import calcGroupProgress from '/assets/js/components/calcGroupProgress.js';
// import 解密 token 樣板
import cryptoToken from '/assets/js/components/cryptoToken.js';
// import 時間判斷 樣板
import isPastEvent from '/assets/js/components/isPastEvent.js';
// import 活動時間 字串處理
import showDateTime from '/assets/js/components/showDateTime.js';
// import 判斷開團時間 
import isGroupTime from '/assets/js/components/isGroupTime.js';
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";

// 登入狀態 token
let _token = localStorage.getItem("token");
const _user = cryptoToken(_token)
// 清空 localStorage Carts
localStorage.setItem('Carts', '');
localStorage.setItem('category', '');
const shoppingCart = document.querySelector('.shopping-cart');
const shoppingCartMobile = document.querySelector('.shopping-cart-mobile ');
const modalCartsSendOrder = document.getElementById('modalCartsSendOrder');


$(function () {
  (function () {
    const modalShppingCartOrder = new bootstrap.Modal(document.getElementById('modal-shppingCart-order'));
    const staticBackdrop = document.getElementById('staticBackdrop');
    let UID = location.href.split("=")[1];;
    let id = '';
    // console.log(UID);
    const isGroupings = UID.startsWith("G") ? true : false; // 判斷 UID 是否 G 開頭，G 開頭表示當前有開團
    if(isGroupings){
      // console.log('已開團');

      axios.get(`https://teatimeapi-test.onrender.com/groupings?UID=${UID}&_expand=restaurant&_expand=order`)
      .then(res=>{
        // console.log(res.data[0]);
        if(!res.data[0]){
          $('#modal-storeOrder-eventExpired').modal('show')
          $('#storeOrderClose').on('click',function(){
            window.location.href = 'https://annchoucode.github.io/TeaTime-Gathering';
          })
          return
        }
        const {restaurantId,deadlineDateTime} = res.data[0];
        const isGroupTimeTrue = isGroupTime(deadlineDateTime);
        // console.log(isGroupTimeTrue);
        if(isGroupTimeTrue){
          const popover = new bootstrap.Popover(shoppingCart, {
            content: '揪團活動已截止',
          });
        }
        id = restaurantId;
        storeInformationData(isGroupings,UID,id,res.data[0])
        shoppingCarts(res.data[0])
      })
      .catch(err=>{console.log(err);})
    }else{
      // console.log('未開團');
      // 初始化 Popover
      const popover = new bootstrap.Popover(shoppingCart, {
        content: '目前您未選擇揪團活動，請先選擇揪團中或建立揪團',
      });
      storeInformationData(isGroupings,UID,id,'')
    }
  })();
});

// 購物車
function shoppingCarts(data){
  $('.shopping-cart').on('click',function(){
    if(_user){
      $('#modal-shppingCart-order').modal('show')      
    }else{
      // 無登入使用者
      return
    }
    const category = localStorage.getItem('category');
    let templateShoppingCarts = '';
    data.storeName = $('#storeNameID').text();
    const timeData = timeForCarts(data.eventDateTime,data.deadlineDateTime)
    data.yymmdd = timeData.eventDateTime.yymmdd;
    data.date = timeData.eventDateTime.date;
    data.time = timeData.eventDateTime.time;
    // console.log(data);

    $('#modalShppingCartOrderTitle').html(`<p class="fs-20 fs-md-24 line-height-sm fw-bold text-gray-01" id="modalShppingCartOrderTitle">${data.storeName}</p>`)
    $('#dateCarts').html(`<p class="me-8 fs-16 fs-md-20 fw-medium line-height-sm" id="dateCarts">${timeData.eventDateTime.date}</p>`)
    $('#timeCarts').html(`<p class="fs-16 fs-md-20 fw-medium line-height-sm" id="timeCarts">${timeData.eventDateTime.time}</p>`)
    $('#dateCartsOrder').html(`<p class="me-8 fs-16 fs-md-20 fw-medium line-height-sm" id="dateCartsOrder">${timeData.deadlineDateTime.date}</p>`)
    $('#timeCartsOrder').html(`<p class="fs-16 fs-md-20 fw-medium line-height-sm" id="timeCartsOrder">${timeData.deadlineDateTime.time}</p>`)

    const getStorageCarts =  localStorage.getItem('Carts');
    // 判斷 localStorage Carts 有無資料
    if(getStorageCarts.length !== 0){
      $('.modalCartsFooter').show(); // 當有資料時，開啟 modal
      const cartsData = JSON.parse(getStorageCarts); // 將字串轉成陣列
      // console.log(cartsData); // 餐點內容
      let total = 0; // 計算金額
      cartsData.forEach(item=>{
        // console.log(item); // 每一筆點餐內容
        // console.log(item.originalPrice); // 每一筆點餐內容
        total += parseInt(item.totalAmount);
        let resultString = '';
        if(item.customization.length !== 0){
          resultString= item.customization.join(', ');
        }
        // console.log(item);
        templateShoppingCarts += `
        <li class="modalCartsLis mb-12 border-bottom border-1 border-gray-03">
                      <div class="d-flex justify-content-between align-items-center w-100 mb-md-16">
                        <p class="text-gray-01 fs-md-20 modalCartsName" data-originalPrice="${item.originalPrice}">${item.orderItem}</p>
                        <p class="text-gray-01 fs-md-20 modalCartsTotalAmount">$${item.totalAmount}</p>
                      </div>
                      <div class="mb-16">
                        ${item.ice?`<p class="text-gray-02">溫度：<span>${item.ice}</span></p>`:''}
                        ${item.sugar?`<p class="text-gray-02">甜度：<span>${item.sugar}</span></p>`:''}
                        ${item.customization.length==0? '':`<p class="text-gray-02">加料：<span>${resultString}</span></p>`}
                        ${item.comments?`<p class="text-gray-02">備註：<span>${item.comments}</span></p>`:''}
                      </div>
                      <div class="modalCartsBtns btn-group border-radius-40 border border-2
                      py-12 px-16 mb-8 mb-md-12 d-flex justify-content-center align-items-center" role="group"
                        aria-label="Basic" style="max-width: 131px;">
                        <button type="button"
                          class="modalCartsRemoveBtn d-flex justify-content-center align-items-center btn btn-white border-radius-400040"
                          style="width: 24px;height: 24px;">
                          <span class="material-symbols-outlined text-gray-02 ">
                            remove
                          </span>
                        </button>
                        <input style="width: 35px;" type="text"
                          class="modalCartsInput border border-2 text-brand-02 mx-8 text-center border border-0" data-totalamount="${item.totalAmount
                          }" value="${item.quantity}" >
                        <button type="button"
                          class="modalCartsAddBtn d-flex justify-content-center align-items-center btn btn-white border-radius-040400"
                          style="width: 24px;height: 24px;">
                          <span class="material-symbols-outlined text-gray-02 ">
                            add
                          </span>
                        </button>
                      </div>
                    </li>
        `
      })
      // console.log(templateShoppingCarts);
      $('#menuListUl').html(templateShoppingCarts);
      $('#menuTotal').html(`<p class="fw-md-bold fw-medium fs-20 fs-md-24 line-height-sm" id="menuTotal">$${total}</p>`)

      let modalCartsLis = document.querySelectorAll('.modalCartsLis');

      // 處理 購物車 所有按鈕
      modalCartsLis.forEach(item => {
        // console.log(item);
        const modalCartsAddBtn = item.querySelector('.modalCartsAddBtn'); // 加號按鈕
        const modalCartsRemoveBtn = item.querySelector('.modalCartsRemoveBtn'); // 減號按鈕
        const modalCartsInput = item.querySelector('.modalCartsInput'); // input 按鈕
        const modalCartsTotalAmount = item.querySelector('.modalCartsTotalAmount'); // 個別金額
        const productName = item.querySelector('.modalCartsName').textContent; // 商品名稱
        const inputValue = parseInt(modalCartsInput.value); // input 的值

        // 購物車 modal 減號
        modalCartsRemoveBtn.addEventListener('click',function(){
          const totalAmountValue = parseInt(modalCartsInput.getAttribute('data-totalamount'));
          if (parseInt(modalCartsInput.value)-1 >= 1) {
            const inputValue = parseInt(modalCartsInput.value);
            modalCartsInput.value = inputValue - 1;
            const newInputValue = parseInt(modalCartsInput.value);
            const total = totalAmountValue * newInputValue;
            modalCartsTotalAmount.textContent = `$${total}`;
            orderCartsRevision(newInputValue,cartsData,productName);
          }else{
            // console.log('數量為1以下');
            const modalCartsInput = item.querySelector('.modalCartsInput'); // input 按鈕
            modalCartsInput.value = 1;
          }
        })

        // 購物車 modal input
        modalCartsInput.addEventListener('input', function(event) {
          const totalAmountValue = parseInt(modalCartsInput.getAttribute('data-totalamount'));
          modalCartsTotalAmount.textContent = `$${event.target.value*totalAmountValue}`;
          orderCartsRevision(event.target.value,cartsData,productName);
        });
        
        // 購物車 modal 加號
        modalCartsAddBtn.addEventListener('click',function(){
          if (inputValue < 999) {            
            const totalAmountValue = parseInt(modalCartsInput.getAttribute('data-totalamount')); // 取得 data-totalamount 的值
            // console.log(totalAmountValue);
            const inputValue = parseInt(modalCartsInput.value);
            modalCartsInput.value = inputValue + 1;
            const newInputValue = parseInt(modalCartsInput.value);
            const total = totalAmountValue * newInputValue;
            modalCartsTotalAmount.textContent = `$${total}`;
            orderCartsRevision(newInputValue,cartsData,productName);
          }else{
            modalCartsInput.value = 999;
          }
        })
      });
    }else{
      templateShoppingCarts = `
      <li class="mb-12 border-bottom border-top border-1 border-gray-03 py-12 mb-40">
        <p class="text-gray-01 fs-md-20">購物車目前空蕩蕩，選點下午茶吧！</p>
      </li>
      `
      $('#menuListUl').html(templateShoppingCarts);
      $('.modalCartsFooter').hide();
    }
  })
  modalCartsSendOrder.addEventListener('click',function(){
    sendCarts(data);
  });
}

// 送出購物車
function sendCarts(data){
  if(!_user){
    return;
  }
  $('#modal-shppingCart-order').modal('hide') // 關閉 modal
  $('#modal-successfullyOrdered').modal('show') // 開啟 modal
  const menuTotal = document.getElementById('menuTotal');
  const priceNumber = parseInt(menuTotal.textContent.replace('$', '')); // 總計金額
  const cartsData = JSON.parse(localStorage.getItem('Carts')); // 購物車內容
  const cartsDataHandle = JSON.parse(JSON.stringify(cartsData)); // 購物車內容(深層拷貝)

  // console.log(cartsData);
  data.orderPriceTotal = priceNumber;
  data.orderUserId = _user;
  // console.log('priceNumber',priceNumber);
  // console.log('_user',_user);
  // console.log('data',data);
  axios.get(`https://teatimeapi-test.onrender.com/users?UID=${_user}`)
  .then(res => {
    const {userName} = res.data[0];
    const {orderId,UID} = data;
    const groupingUID = UID;
    data.userName = userName;
    // console.log(data);
    // console.log('orderId',orderId);
    return axios.get(`https://teatimeapi-test.onrender.com/orders?id=${orderId}`)
    .then(res=>{
      const orderData = res.data[0];
      // console.log(orderData);
      const {orderDetail,groupingId,restaurantId,UID} = orderData;
      const orderDataRestaurantId = restaurantId;
      const orderDataUID = UID;
      
      const cartsDataDuplicate = []; // 紀錄 cartsData 陣列以重複位置
      
      let resultString = '';
      // 處理重複的點餐內容
      orderDetail.forEach((item,index)=>{
        cartsData.forEach((itemCartsData,cartsDataIndex) => {
          // console.log(item);
          // 當 customization 有值時，陣列轉字串，並以"、"分割
          if(itemCartsData.customization.length != 0){
            resultString = itemCartsData.customization.join('、');
          }
          if(item.name == userName && item.orderItem == itemCartsData.orderItem){
            cartsDataDuplicate.push(cartsDataIndex); // 紀錄重複的陣列位置
            orderDetail[index] = {
              name: userName,
              orderItem: itemCartsData.orderItem,
              quantity: parseInt(itemCartsData.quantity),
              ice: itemCartsData.ice?`${itemCartsData.ice}`:'',
              sugar: itemCartsData.sugar?`${itemCartsData.sugar}`:'',
              customization: itemCartsData.customization?`${resultString}`:'',
              comments: itemCartsData.comments,
              totalAmount: itemCartsData.totalAmount,
              isPay: item.isPay,
              ratingID: item.ratingID
            }
          }
        })
      })
      // console.log(cartsDataDuplicate);
      // console.log(orderDetail);

      // 刪除每個 cartsDataHandle 重複的筆數
      if(cartsDataDuplicate.length > 0){
        const reCartsDataDuplicate = cartsDataDuplicate.reverse();
        reCartsDataDuplicate.forEach(item=>{
          // console.log(item);
          cartsDataHandle.splice(item, 1);
        })
      }
      // 將剩餘的購物車資料寫進 orderDetail
      cartsDataHandle.forEach(item=>{        
        let resultString = '';
        // 當 customization 有值時，陣列轉字串，並以"、"分割
        if(item.customization.length != 0){
          resultString = item.customization.join('、');
        }
        const object = {  
          name: userName,
          orderItem: item.orderItem,
          quantity: parseInt(item.quantity),
          ice: item.ice?`${item.ice}`:'',
          sugar: item.sugar?`${item.sugar}`:'',
          customization: item.customization?`${resultString}`:'',
          comments: item.comments,
          totalAmount: item.totalAmount,
          isPay: false,
          ratingID: ''
        }
        orderDetail.push(object);
      })
      // console.log(orderDetail);
      
      // 購物車 patch orders API
      return axios.patch(`https://teatimeapi-test.onrender.com/orders/${orderId}`,{orderDetail:orderDetail})
      .then(res => {
        // console.log(res);
        // console.log(groupingUID);
        renderProgressBar(groupingUID)
        return;
      })
      .catch(err => { console.log(err) })
    })
    .catch(err=>{console.log(err);})
  })
  .catch(err => {
    console.log(err);
  })
  orderEstablished(data); // 訂單成立，處理訂單
}

// 重新渲染開團進度
function renderProgressBar(groupingUID){
  // console.log(groupingUID);
  axios.get(`https://teatimeapi-test.onrender.com/groupings?UID=${groupingUID}&_expand=restaurant&_expand=order`)
  .then(res=>{
    const data = res.data[0];
    let calcGroupProgressNum = 0; // 取得開團進度
    calcGroupProgressNum = calcGroupProgress(data.order.orderDetail.length,data.restaurant.minGroupSize)
    
    $('#groupingProgressBar').html(`
      <div class="bar bg-brand-02" style="--value: ${calcGroupProgressNum}">
        <div class="text-white">${calcGroupProgressNum > 100 ? 100 : calcGroupProgressNum}%</div>
      </div>
    `)
  })
  .catch(err=>{console.log(err);})
}

// 購物車調整值
function orderCartsRevision(quantity,cartsData,productName){
  // console.log(quantity,cartsData,productName);
  // 數量、小計、購物車 data、產品名稱
  const menuTotal = document.getElementById('menuTotal');
  if(quantity < 1000 && quantity >= 0){
    cartsData.forEach((item,index)=>{
      if(item.orderItem == productName) {
        cartsData[index].quantity = quantity;
      }
    })
    let totalAll = 0;
    cartsData.forEach(item=>{totalAll += item.totalAmount * item.quantity})
    menuTotal.textContent = `$${totalAll}`;

    // console.log(cartsData);
    localStorage.setItem('Carts', JSON.stringify(cartsData));
  }else{
    alert('點餐數量請介於0-999間')
  }
}

// 訂購成功 modal
function orderEstablished(data){
  // console.log(data);
  $('#orderTotal').html(`<p class="fw-md-bold fw-medium fs-20 fs-md-24 line-height-sm">$${data.orderPriceTotal}</p>`);  
  const timeData = timeForCarts(data.eventDateTime,data.deadlineDateTime);
  $('#eventDate').html(`<p class="me-8 fs-16 fs-md-20 fw-medium line-height-sm" id="eventDate">${timeData.eventDateTime.date}</p>`)
  $('#eventDateTime').html(`<p class="fs-16 fs-md-20 fw-medium line-height-sm" id="eventDateTime">${timeData.eventDateTime.time}</p>`)
  $('#deadlineDate').html(`<p class="me-8 fs-16 fs-md-20 fw-medium line-height-sm" id="deadlineDate">${timeData.deadlineDateTime.date}</p>`)
  $('#deadlineTime').html(`<p class="fs-16 fs-md-20 fw-medium line-height-sm" id="deadlineTime">${timeData.deadlineDateTime.time}</p>`)
  
  localStorage.setItem('Carts', ''); // 清空 localStorage Carts
}

// 渲染畫面
function storeInformationData(isGroupings,UID,id,storeData = ''){
  // console.log(isGroupings,UID,id);
  // console.log(storeData);
  let calcGroupProgressNum = 0; // 取得開團進度
  if(storeData){
    // 目前點餐數量，最小開團人數
    calcGroupProgressNum = calcGroupProgress(storeData.order.orderDetail.length,storeData.restaurant.minGroupSize)
  }

  // 是否開團、UID、id
  let searchCriteria = '';
  if(id){
    searchCriteria += `id=${id}`
  }else{
    searchCriteria += `UID=${UID}`
  }
      // 發送 Ajax 請求獲取資料
      $.ajax({
        url: `https://teatimeapi-test.onrender.com/restaurants?${searchCriteria}`,
        success: function (data) {
          // console.log(data);
          let container = $("#paginationPagesMenu");
          let isMobile = window.innerWidth < 768; // 假設小於 768 像素的視窗寬度視為手機
          const {products,stars,category} = data[0];
          localStorage.setItem('category', category); // localStorage 新增 category
          let totalNumber = data.length; // restaurants 資料總筆數
          let pageSize = isMobile ? 5 : 10; // 根據裝置設定不同的 pageSize，5 為手機板(一頁顯示 5 筆資料)、10 為電腦版(一頁顯示 10 筆資料)
          let storeTemplate = "";
          // console.log(storeData);
          const timeData = timeForCarts(storeData.eventDateTime,storeData.deadlineDateTime);

          // 店家獨立頁面 店家資訊
          storeTemplate += `
                      <div class="order-bg" style=" background: url(${data[0].storeBannerPhoto}) center top /cover;"></div>
                      <div class="order-content container ps-12 ps-md-42 d-sm-flex align-items-end">
                        <img src="${data[0].storeLogo}" alt="logo-cha source"
                          class="order-icon border border-2 border-line border-radius-24 me-sm-24 me-lg-37 mb-20 mb-sm-0 ">
                        <div class="order-textContent mb-16 mb-sm-0 me-sm-24 me-lg-37">
                          <h2 class="fs-md-40 fs-24 fw-bold lh-sm" id="storeNameID">${data[0].storeName}</h2>
                          <div class="imgItems">
                            ${showStars(stars)}
                          </div>
                          <p class="order-content-p">${data[0].summary}</p>
                        </div>
                        
                        <div class="ms-auto ${ isGroupings ? 'd-block' : 'd-none' }">
                          <ul>
                            <li class="d-flex align-items-center mb-16">
                              <svg class="me-8" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.3335 12.9998C1.3335 8.60034 1.3335 6.4 2.70083 5.03384C4.067 3.6665 6.26733 3.6665 10.6668 3.6665H15.3335C19.733 3.6665 21.9333 3.6665 23.2995 5.03384C24.6668 6.4 24.6668 8.60034 24.6668 12.9998V15.3332C24.6668 19.7327 24.6668 21.933 23.2995 23.2992C21.9333 24.6665 19.733 24.6665 15.3335 24.6665H10.6668C6.26733 24.6665 4.067 24.6665 2.70083 23.2992C1.3335 21.933 1.3335 19.7327 1.3335 15.3332V12.9998Z" stroke="#1E1E1E" stroke-width="2"/>
                                <path d="M7.16699 3.6665V1.9165M18.8337 3.6665V1.9165M1.91699 9.49984H24.0837" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round"/>
                                <path d="M20 18.8333C20 19.1428 19.8771 19.4395 19.6583 19.6583C19.4395 19.8771 19.1428 20 18.8333 20C18.5239 20 18.2272 19.8771 18.0084 19.6583C17.7896 19.4395 17.6667 19.1428 17.6667 18.8333C17.6667 18.5239 17.7896 18.2272 18.0084 18.0084C18.2272 17.7896 18.5239 17.6667 18.8333 17.6667C19.1428 17.6667 19.4395 17.7896 19.6583 18.0084C19.8771 18.2272 20 18.5239 20 18.8333ZM20 14.1667C20 14.4761 19.8771 14.7728 19.6583 14.9916C19.4395 15.2104 19.1428 15.3333 18.8333 15.3333C18.5239 15.3333 18.2272 15.2104 18.0084 14.9916C17.7896 14.7728 17.6667 14.4761 17.6667 14.1667C17.6667 13.8572 17.7896 13.5605 18.0084 13.3417C18.2272 13.1229 18.5239 13 18.8333 13C19.1428 13 19.4395 13.1229 19.6583 13.3417C19.8771 13.5605 20 13.8572 20 14.1667ZM14.1667 18.8333C14.1667 19.1428 14.0437 19.4395 13.825 19.6583C13.6062 19.8771 13.3094 20 13 20C12.6906 20 12.3938 19.8771 12.175 19.6583C11.9562 19.4395 11.8333 19.1428 11.8333 18.8333C11.8333 18.5239 11.9562 18.2272 12.175 18.0084C12.3938 17.7896 12.6906 17.6667 13 17.6667C13.3094 17.6667 13.6062 17.7896 13.825 18.0084C14.0437 18.2272 14.1667 18.5239 14.1667 18.8333ZM14.1667 14.1667C14.1667 14.4761 14.0437 14.7728 13.825 14.9916C13.6062 15.2104 13.3094 15.3333 13 15.3333C12.6906 15.3333 12.3938 15.2104 12.175 14.9916C11.9562 14.7728 11.8333 14.4761 11.8333 14.1667C11.8333 13.8572 11.9562 13.5605 12.175 13.3417C12.3938 13.1229 12.6906 13 13 13C13.3094 13 13.6062 13.1229 13.825 13.3417C14.0437 13.5605 14.1667 13.8572 14.1667 14.1667ZM8.33333 18.8333C8.33333 19.1428 8.21042 19.4395 7.99162 19.6583C7.77283 19.8771 7.47609 20 7.16667 20C6.85725 20 6.5605 19.8771 6.34171 19.6583C6.12292 19.4395 6 19.1428 6 18.8333C6 18.5239 6.12292 18.2272 6.34171 18.0084C6.5605 17.7896 6.85725 17.6667 7.16667 17.6667C7.47609 17.6667 7.77283 17.7896 7.99162 18.0084C8.21042 18.2272 8.33333 18.5239 8.33333 18.8333ZM8.33333 14.1667C8.33333 14.4761 8.21042 14.7728 7.99162 14.9916C7.77283 15.2104 7.47609 15.3333 7.16667 15.3333C6.85725 15.3333 6.5605 15.2104 6.34171 14.9916C6.12292 14.7728 6 14.4761 6 14.1667C6 13.8572 6.12292 13.5605 6.34171 13.3417C6.5605 13.1229 6.85725 13 7.16667 13C7.47609 13 7.77283 13.1229 7.99162 13.3417C8.21042 13.5605 8.33333 13.8572 8.33333 14.1667Z" fill="#1E1E1E"/>
                              /svg>
                              <p class="me-16 me-sm-8">${timeData.deadlineDateTime.date}</p>
                              <p class="">${timeData.deadlineDateTime.time}</p>
                            </li>
                            <li class="d-flex align-items-center mb-16">
                              <svg class="me-8" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="ic:round-money-off">
                                <path id="Vector" d="M12.5 6.9C13.92 6.9 14.63 7.44 14.89 8.3C15.02 8.73 15.45 9 15.9 9H15.96C16.66 9 17.18 8.29 16.93 7.64C16.49 6.49 15.52 5.56 14 5.19V4.5C14 3.67 13.33 3 12.5 3C11.67 3 11 3.67 11 4.5V5.16C10.61 5.24 10.25 5.37 9.89998 5.52L11.41 7.03C11.73 6.95 12.1 6.9 12.5 6.9ZM4.76998 4.62C4.67728 4.71251 4.60373 4.8224 4.55355 4.94338C4.50337 5.06435 4.47754 5.19403 4.47754 5.325C4.47754 5.45597 4.50337 5.58565 4.55355 5.70662C4.60373 5.8276 4.67728 5.93749 4.76998 6.03L7.49998 8.77C7.49998 10.85 9.05998 11.99 11.41 12.68L14.92 16.19C14.58 16.68 13.87 17.1 12.5 17.1C10.85 17.1 9.99998 16.51 9.66998 15.67C9.51998 15.28 9.17998 15 8.76998 15H8.59998C7.87998 15 7.35998 15.74 7.64998 16.39C8.23998 17.72 9.53998 18.51 11.01 18.83V19.5C11.01 20.33 11.68 21 12.51 21C13.34 21 14.01 20.33 14.01 19.5V18.85C14.97 18.67 15.84 18.3 16.47 17.73L17.98 19.24C18.0726 19.3326 18.1825 19.406 18.3034 19.4561C18.4244 19.5062 18.5541 19.532 18.685 19.532C18.8159 19.532 18.9456 19.5062 19.0665 19.4561C19.1875 19.406 19.2974 19.3326 19.39 19.24C19.4826 19.1474 19.556 19.0375 19.6061 18.9165C19.6562 18.7956 19.682 18.6659 19.682 18.535C19.682 18.4041 19.6562 18.2744 19.6061 18.1535C19.556 18.0325 19.4826 17.9226 19.39 17.83L6.17998 4.62C6.08747 4.5273 5.97758 4.45375 5.85661 4.40357C5.73563 4.35339 5.60595 4.32756 5.47498 4.32756C5.34401 4.32756 5.21433 4.35339 5.09336 4.40357C4.97239 4.45375 4.8625 4.5273 4.76998 4.62Z" fill="#1E1E1E"/>
                                </g>
                                </svg>
                              <p class="me-16 me-sm-8 word-break-keep-all">請客人</p>
                              <p class='word-break-keep-all'>${storeData.invitees ? storeData.invitees : '無'}</p>
                            </li>
                            <li class="d-flex align-items-center">
                            <iconify-icon icon="ic:round-group" style="color: #1e1e1e;" width="24" height="24" class="me-8"></iconify-icon>
                            <p class="me-16 me-sm-8 word-break-keep-all">成團目標</p>
                              <div class="ts-progress is-tiny bg-gray-04" style="width: 120px;" id="groupingProgressBar">
                                <div class="bar bg-brand-02" style="--value: ${calcGroupProgressNum}">
                                    <div class="text-white">${calcGroupProgressNum > 100 ? 100 : calcGroupProgressNum}%</div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      `;
          $("#storeOrder").html(storeTemplate);
          // menu 分頁
          container.pagination({
            dataSource: products, // 實際資料來源
            locator: "items",
            totalNumber: totalNumber, // 實際資料總數
            pageSize: pageSize, // 每頁資料數
            showPageNumbers: true,
            showPrevious: true,
            showNext: true,
            callback: function (data, pagination) {
              const newData = JSON.parse(JSON.stringify(data));
              let firstFiveMenu = "";
              let lastFiveMenu = "";
              let template = "";
              let firstFive = newData.slice(0, 5); // 拆分資料，菜單前五筆(左邊頁面)
              let lastFive = newData.slice(5); // 拆分資料，菜單後五筆(右邊頁面)
              let lastFiveArray = [...lastFive]; // 類陣列 轉 純陣列
               // 拆分前五(左邊頁面)
              firstFiveMenu += `
                            <div class="swiper-slide border border-1 border-brand-03 p-12 p-sm-40">
                            <ul id="">
                          `;
  
              $.each(firstFive, function (index, data) {
                // console.log(data);
                firstFiveMenu += `
                                <li class=" py-16 py-sm-24 border-bottom border-1 ">
                                  <button type="button" class="menu-button border-0 bg-white text-start w-100" data-menuUID="${data.UID}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    <div class="text-top d-flex justify-content-between align-items-center mb-8 mb-sm-16">
                                      <h3 class="store-order-h3">${data.品項}</h3>
                                      ${coldHotTemplate(data.冷,data.熱,data.價格)}
                                    </div>
                                    <p class="text-top-p">${data.商品描述}</p>
                                  </button>
                                </li>`;
              });

              
              firstFiveMenu += `
                              </ul>
                            </div>`;

              // 拆分後五(右邊頁面))
              lastFiveMenu += `
                            <div class="swiper-slide border border-1 border-brand-03 p-12 p-sm-40">
                            <ul id="">
                          `;
              $.each(lastFiveArray, function (index, data) {
                lastFiveMenu += `
                                <li class=" py-16 py-sm-24 border-bottom border-1 ">
                                  <button type="button" class="menu-button border-0 bg-white text-start w-100" data-menuUID="${data.UID}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    <div class="text-top d-flex justify-content-between align-items-center mb-8 mb-sm-16">
                                      <h3 class="productName store-order-h3" data-originalPrice="">${data.品項}</h3>
                                      ${coldHotTemplate(data.冷,data.熱,data.價格)}
                                    </div>
                                    <p class="text-top-p">${data.商品描述}</p>
                                  </button>
                                </li>`;
              });
              lastFiveMenu += `
                              </ul>
                            </div>`;
              template += firstFiveMenu;

              // 頁面為手機板時，清除右邊選單
              if (pageSize == 5) {
                lastFiveMenu = "";
              }
              template += lastFiveMenu;
              // console.log(template);
              $(".customMenu").html(template);

              const menuButtons = document.querySelectorAll('.menu-button');

              menuButtons.forEach(button => {
                let UID = '';
                button.addEventListener('click', function() {
                  let templateProduct = '';
                  // 獲取 data-menuuid 的值
                  const menuUid = this.getAttribute('data-menuuid');
                  UID = menuUid;
                  newData.forEach(item=>{
                    if(item.UID == menuUid){
                    // console.log(menuUid);
                    // console.log(item);
                    // console.log(item.品項);
                    let coldHotFalse = false;
                    if(item.冷 == false && item.熱 == false){
                      coldHotFalse = true; // 無冷無熱
                    }
                    // console.log(coldHotFalse);
                    templateProduct += `
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div class="modal-storeOrder-menu modal-content border-radius-24">
                        <div class=" d-flex flex-column border-0 mb-32 mb-md-40 p-0 ">
                          <div class="modal-header-top d-flex justify-content-between align-items-center w-100 mb-8 mb-md-16">
                            <h5 class="modal-title" id="modalOrderTitle" data-originalPrice="${item.價格}">${item.品項}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          `
                    if(coldHotFalse){
                    templateProduct += `
                      <div class="cold-hot d-flex  align-items-center w-100 mb-8 mb-md-16 ">
                        <div class="hot d-flex justify-content-center align-items-center ">
                          <span class="">$ ${item.價格}</span>
                        </div>
                      </div>
                    `
                   }else{
                      templateProduct += `
                            <div class="cold-hot d-flex  align-items-center w-100 mb-8 mb-md-16">
                              <div class="cold d-flex justify-content-center align-items-center ${item.冷? '':'d-none'}">
                                <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/cold.png?raw=true" alt="cold.png">
                                <span class="me-16">${item.價格}</span>
                              </div>
                              <div class="hot d-flex justify-content-center align-items-center ${item.熱? '':'d-none'}">
                                <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/hot.png?raw=true" alt="hot.png">
                                <span class="">${item.價格}</span>
                              </div>
                            </div>
                            `
                    }
                   templateProduct += `
                          <p>${item.商品描述}</p>
                        </div>
                        <div class="modal-body p-0 mb-40">
                          <h6 class="mb-12 text-gray-01 fs-20 line-height-sm ${coldHotFalse?'d-none':''} ${category==='飲料'?'':'d-none'}">溫度選項</h6>
                          <ul class="mb-32 mb-md-40 ${coldHotFalse?'d-none':''} ${category==='飲料'?'':'d-none'}">
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ${item.冷?'':'d-none'} ">
                              <input class="input-radio-style" type="radio" name="temperature" id="normal_ice" value="正常冰"
                                checked>
                              <label for="normal_ice" class="fs-16 fs-md-20 radio-label">正常冰</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ${item.冷?'':'d-none'}">
                              <input class="input-radio-style" type="radio" name="temperature" id="smal_ice" value="少冰（8 分冰）">
                              <label for="smal_ice" class="fs-16 fs-md-20 radio-label">少冰（8 分冰）</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ${item.冷?'':'d-none'}">
                              <input class="input-radio-style" type="radio" name="temperature" id="tiny_ice" value="微冰（3 分冰）">
                              <label for="tiny_ice" class="fs-16 fs-md-20 radio-label">微冰（3 分冰）</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ${item.冷?'':'d-none'}">
                              <input class="input-radio-style" type="radio" name="temperature" id="no_ice" value="去冰">
                              <label for="no_ice" class="fs-16 fs-md-20 radio-label">去冰</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ${item.熱?'':'d-none'}">
                              <input class="input-radio-style" type="radio" name="temperature" id="warm" value="溫">
                              <label for="warm" class="fs-16 fs-md-20 radio-label">溫</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ${item.熱?'':'d-none'}">
                              <input class="input-radio-style" type="radio" name="temperature" id="hot" value="熱">
                              <label for="hot" class="fs-16 fs-md-20 radio-label">熱</label>
                            </li>
                          </ul>
                          <h6 class="mb-12 text-gray-01 fs-20 line-height-sm ${coldHotFalse?'d-none':''} ${category==='飲料'?'':'d-none'}">甜度選擇</h6>
                          <ul class="mb-32 mb-md-40 ${category==='飲料'?'':'d-none'}">
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ">
                              <input class="input-radio-style" type="radio" name="sweetness" id="standard_sweetness"
                                value="標準（10 分糖）">
                              <label for="standard_sweetness" class="fs-16 fs-md-20 radio-label">標準（10 分糖）</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ">
                              <input class="input-radio-style" type="radio" name="sweetness" id="less_sugar" value="少糖（7 分糖）">
                              <label for="less_sugar" class="fs-16 fs-md-20 radio-label">少糖（7 分糖）</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ">
                              <input class="input-radio-style" type="radio" name="sweetness" id="half_sugar" value="半糖（5 分糖）"
                                checked>
                              <label for="half_sugar" class="fs-16 fs-md-20 radio-label">半糖（5 分糖）</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ">
                              <input class="input-radio-style" type="radio" name="sweetness" id="slight_sugar" value="微糖（3 分糖）">
                              <label for="slight_sugar" class="fs-16 fs-md-20 radio-label">微糖（3 分糖）</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ">
                              <input class="input-radio-style" type="radio" name="sweetness" id="sugar_free" value="無糖">
                              <label for="sugar_free" class="fs-16 fs-md-20 radio-label">無糖</label>
                            </li>
                          </ul>
                          <h6 class="mb-12 text-gray-01 fs-20 line-height-sm ${category==='飲料'?'':'d-none'}">加料</h6>
                          <p class="mb-12 text-gray-02 fs-16 ${category==='飲料'?'':'d-none'}">最多可選 2 個項目</p>
                          <ul class="mb-32 mb-md-40 ${category==='飲料'?'':'d-none'}">
                            <li
                              class="py-12 d-flex justify-content-end order-1 align-items-center border-bottom border-1 border-gray-03 ">
                              <label class="checkboxStyle-content fs-16 fs-md-20 d-flex  align-items-center "
                                for="fresh_milk">升級鮮奶<span class="ms-16">+$10.00</span>
                                <input class="checkboxStyle-checkbox bg-pink" type="checkbox" id="fresh_milk" name="subscribe">
                                <span class="checkboxStyle-checkmark"></span>
                              </label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-end order-1 align-items-center border-bottom border-1 border-gray-03 ">
                              <label class="checkboxStyle-content fs-16 fs-md-20 d-flex  align-items-center " for="pearl">珍珠<span
                                  class="ms-16">+$10.00</span>
                                <input class="checkboxStyle-checkbox bg-pink" type="checkbox" id="pearl" name="subscribe">
                                <span class="checkboxStyle-checkmark"></span>
                              </label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-end order-1 align-items-center border-bottom border-1 border-gray-03 ">
                              <label class="checkboxStyle-content fs-16 fs-md-20 d-flex  align-items-center "
                                for="brown_sugar">黑糖<span class="ms-16">+$10.00</span>
                                <input class="checkboxStyle-checkbox bg-pink" type="checkbox" id="brown_sugar" name="subscribe">
                                <span class="checkboxStyle-checkmark"></span>
                              </label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-end order-1 align-items-center border-bottom border-1 border-gray-03 ">
                              <label class="checkboxStyle-content fs-16 fs-md-20 d-flex  align-items-center " for="agar">寒天晶球<span
                                  class="ms-16">+$10.00</span>
                                <input class="checkboxStyle-checkbox bg-pink" type="checkbox" id="agar" name="subscribe">
                                <span class="checkboxStyle-checkmark"></span>
                              </label>
                            </li>
                          </ul>
                          <div class="">
                            <div class="">
                              <label for="remark" class="mb-24 text-gray-01 fs-20 line-height-sm">備註</label>
                              <textarea rows="3" cols="30"
                                class="no-resize w-100 mb-32 mb-md-32 border-radius-4 border border-1 border-gray-03"
                                name="adding_materials" id="remark"></textarea>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                              <label for="number" class="text-gray-01 fs-20 line-height-sm">數量</label>
                              <div class="btn-group border-radius-40 border border-2 py-12 px-16" role="group"
                                aria-label="Basic ">
                                <button type="button" class="btn btn-white border-radius-400040" id="numberSub">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                      d="M18 12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z"
                                      fill="#8B8B8A" />
                                  </svg>
                                </button>
                                <input style="width: 35px;" type="text" class="text-brand-02 mx-8 text-center border border-0"
                                  value="1" id="numberInput">
                                <button type="button" class="btn btn-white border-radius-040400" id="numberAdd">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                      d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z"
                                      fill="#8B8B8A" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>

                        </div>
                        <div class="modal-footer p-0  border-0 text-white ">
                          <button type="button" class="btn btn-brand-03 border-radius-40 py-12 px-24
                          d-flex justify-content-center align-items-center w-100" id="addProductToCarts">
                            <iconify-icon class="me-4 me-sm-8" icon="mdi:cart" style="color: white;" width="20"
                              height="20"></iconify-icon>
                            <p class="text-white me-4 me-sm-8">新增至購物車‧</p>
                            <p class="text-white" id="mealPrice">${item.價格}</p>
                          </button>
                        </div>
                      </div>
                    </div>
                    `
                    // console.log(isGroupings,UID,id);
                    // console.log(templateProduct);
                    staticBackdrop.innerHTML = templateProduct;
                    let numberSub = $('#numberSub'), numberInput = $('#numberInput'), numberAdd = $('#numberAdd'), addProductToCarts = $('#addProductToCarts');
                    let originalPrice = item.價格;
                    let productPrice = 0;
                    productPrice = parseInt(originalPrice);

                    if(category == '飲料'){
                      $("[name='subscribe']").change(function() {
                        if($(this).is(":checked")){
                          productPrice += 10;
                        }else{
                          productPrice -= 10;
                        }               
                        $("#mealPrice").text(`${productPrice * numberInput.val()}`);       
                      });
                    }

                    // 計算價格
                    function calculatePrice() {
                      let currentValue = parseInt(numberInput.val()) || 0;
                      if (currentValue < 0) {
                        numberInput.val(0);
                        currentValue = parseInt(numberInput.val()) || 0;
                      } else if (currentValue > 999) {
                        numberInput.val(999);
                        currentValue = parseInt(numberInput.val()) || 0;
                      }
                      let price = currentValue * productPrice;
                      // 更新 #mealPrice 的內容
                      $("#mealPrice").text(price);
                    }

                    // 數量減 1
                    numberSub.on('click', function() {
                      let currentValue = parseInt(numberInput.val()) || 0;
                      if (currentValue > 1) {
                          numberInput.val(currentValue - 1);
                          calculatePrice();
                      }else{
                        numberInput.val(1);
                      }
                    });

                    // 數量加 1
                    numberAdd.on('click', function() {
                      let currentValue = parseInt(numberInput.val()) || 0;
                      if (currentValue < 999) {
                          numberInput.val(currentValue + 1);
                          calculatePrice();
                      }else{
                        numberInput.val(999);
                      }
                    });
                    numberInput.on('input', calculatePrice);

                    addProductToCarts.on('click',function(){
                      let storageCarts = [];
                      let productsToCartsData = {};
                      const customization = [];
                      productsToCartsData.orderItem = $('#modalOrderTitle').text();
                      productsToCartsData.quantity = $('#numberInput').val();
                      
                      // console.log(category);
                      // 飲料類別處理
                      productsToCartsData.totalAmount = $('#numberInput').val() * productPrice;
                      if(category == '飲料'){
                        // const temperature = ;
                        productsToCartsData.ice = $('[name="temperature"]:checked').val();
                        productsToCartsData.sugar = $('[name="sweetness"]:checked').val();
                        const fresh_milk = $('#fresh_milk'),pearl = $('#pearl'),brown_sugar = $('#brown_sugar'),agar = $('#agar');
                        // 處理鮮奶
                        if (fresh_milk.is(':checked')) {
                          customization.push('升級鮮奶');
                        }
                        // 珍珠
                        if (pearl.is(':checked')) {
                          customization.push('珍珠')
                        }
                        // 黑糖
                        if (brown_sugar.is(':checked')) {
                          customization.push('黑糖')
                        }
                        // 寒天晶球
                        if (agar.is(':checked')) {
                          customization.push('寒天晶球')
                        }
                      }
                      productsToCartsData.comments = $('#remark').val();
                      productsToCartsData.customization = customization;
                      productsToCartsData.originalPrice = item.價格;
                      // console.log(productsToCartsData);
                      // 判斷 localStorage Carts 有無資料
                      if(localStorage.getItem('Carts')){
                        let isRepeat = 0; // 判斷有無重複
                        const getStorageCarts = JSON.parse(localStorage.getItem('Carts'));
                        // 處理 Carts 相同品項資料
                        getStorageCarts.forEach((item,index)=>{
                          if(item.orderItem === $('#modalOrderTitle').text()){
                            // console.log('有資料重複');
                            isRepeat += 1;
                            getStorageCarts[index] = productsToCartsData;
                          }
                        })
                        if(isRepeat==0){
                          // console.log('無相同品項資料，將資料 productsToCartsData 存進 getStorageCarts');
                          getStorageCarts.push(productsToCartsData);
                        }
                        // console.log('productsToCartsData',productsToCartsData);
                        // console.log('getStorageCarts',getStorageCarts);
                        localStorage.setItem('Carts', JSON.stringify(getStorageCarts)); // 將字串存進 localStorage Carts
                      }
                      else{
                        // Carts 內無資料，直接存進 Carts 中
                        storageCarts.push(productsToCartsData);
                        // console.log(productsToCartsData);
                        // console.log(storageCarts);
                        localStorage.setItem('Carts', JSON.stringify(storageCarts));
                      }
                      $('#staticBackdrop').modal('hide');
                    })
                  }
                })
                });
              });

              // 清空菜單
              firstFive = [];
              lastFive = [];
              // 菜單滑動用 swiper
              var swiper = new Swiper(".mySwiper", {
                // spaceBetween: 30,
                breakpoints: {
                  1: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    centeredSlides: false,
                  },
                  576: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                    centeredSlides: false,
                  },
                },
              });
            },
          });
        },
        error: function (error) {
          console.error("error");
        },
      });
}

// 菜單冷熱處理
function coldHotTemplate(cold,hot,price){
  let template = '';
  if(cold == false && hot == false){
    template +=`
      <div class="cold-hot d-flex justify-content-center align-items-center">
      <div class="cold d-flex justify-content-center align-items-center  ${
        cold ? "" : "hidden-block"
      }">
        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/cold.png?raw=true" alt="cold.png">
        <span class="me-8">${price}</span>
      </div>
      <div class="hot d-flex justify-content-center align-items-center ">
        <span class="">$ ${price}</span>
      </div>
    </div>
    `;

  }else{
    template +=`
      <div class="cold-hot d-flex justify-content-center align-items-center">
      <div class="cold d-flex justify-content-center align-items-center  ${
        cold ? "" : "hidden-block"
      }">
        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/cold.png?raw=true" alt="cold.png">
        <span class="me-8">${price}</span>
      </div>
      <div class="hot d-flex justify-content-center align-items-center ${
        hot ? "" : "hidden-block"
      }">
        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/hot.png?raw=true" alt="hot.png">
        <span class="">${price}</span>
      </div>
    </div>
    `;
  }
  return template
}