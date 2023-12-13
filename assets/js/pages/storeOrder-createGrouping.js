import axios from 'axios';
// import 時間選擇器
import flatpickr from "flatpickr";
// import 解密 token 元件
import cryptoToken from '/assets/js/components/cryptoToken.js';
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";

//全頁共用變數
const _url = "https://teatimeapi-test.onrender.com"
const _token = localStorage.getItem("token");
const _user = cryptoToken(_token)
let enjoyTime = '' // 享用日期
let orderTime = '' // 訂購期限
let timeInsufficient = false; // 享用日期 是否大於 訂購期限 24hr
let usersName = ''; // 使用者姓名
let usersId = ''; // 使用者id

/* 選擇建立揪團資料 ================================*/
//綁定建立揪團按鈕
const btnCreateGroup = document.querySelector(".btnCreateGrouping")
//綁定建立揪團 modal
const modalCreateGroup = document.getElementById('modal-CreateGroup')
const addGrouping = document.getElementById('addGrouping')
const groupingInvitees = document.getElementById('groupingInvitees')
let UID = location.href.split("=")[1];
const isGroupings = UID.startsWith("G") ? true : false; // 判斷 UID 是否 G 開頭，G 開頭表示當前有開團
let newRestaurantId = '';
if(isGroupings){
    axios.get(`https://teatimeapi-test.onrender.com/groupings?UID=${UID}`)
    .then(res=>{
        newRestaurantId = res.data[0].restaurantId;
    })
    .catch(err=>{console.log(err);})
}else{
    axios.get(`https://teatimeapi-test.onrender.com/restaurants?UID=${UID}`)
    .then(res=>{
        // console.log(res);
        newRestaurantId = res.data[0].id;
    })
    .catch(err=>{console.log(err);})
}

// 監聽 addGrouping 按鈕
addGrouping.addEventListener('click',function (params) {

    // console.log(newRestaurantId);
    // enjoyTime = '2023/12/19 12:00'
    // orderTime = '2023/12/12 12:00'
    // console.log(enjoyTime);
    // console.log(orderTime);
    let payer = '';
    if(enjoyTime == ''){
        // console.log('未選擇 享用日期');
        $('.EnjoyFillAlert').addClass('shake-element')
        setTimeout(function() {
            $('.EnjoyFillAlert').removeClass('shake-element');
        }, 2000); // 停止搖動後的 2 秒鐘內移除
        return
    }else{
        let dateTimeEnjoy = new Date(enjoyTime);
        const datePartEnjoy = `${dateTimeEnjoy.getMonth() + 1}/${dateTimeEnjoy.getDate()}`;
        const timePartEnjoy = `${dateTimeEnjoy.getHours()}:${String(dateTimeEnjoy.getMinutes()).padStart(2, '0')}`;
        // console.log(datePartEnjoy,timePartEnjoy);
        $('#groupEnjoyDate').html(`<p class="me-8 fs-16 fs-md-20 fw-medium line-height-sm" id="groupEnjoyDate">${datePartEnjoy}</p>`)
        $('#groupEnjoyTime').html(`<p class="fs-16 fs-md-20 fw-medium line-height-sm" id="groupEnjoyTime">${timePartEnjoy}</p>`)
    }
    if(orderTime == ''){
        // console.log('未選擇 訂購時間');
        $('.orderFillAlert').addClass('shake-element')
        setTimeout(function() {
            $('.orderFillAlert').removeClass('shake-element');
        }, 2000); // 停止搖動後的 2 秒鐘內移除
        return
    }else{
        let dateTimeDeadline = new Date(orderTime);
        const datePartDeadline = `${dateTimeDeadline.getMonth() + 1}/${dateTimeDeadline.getDate()}`;
        const timePartDeadline = `${dateTimeDeadline.getHours()}:${String(dateTimeDeadline.getMinutes()).padStart(2, '0')}`;
        // console.log(datePartDeadline,timePartDeadline);
        $('#groupDeadlineDate').html(`<p class="me-8 fs-16 fs-md-20 fw-medium line-height-sm" id="groupEnjoyDate">${datePartDeadline}</p>`)
        $('#groupDeadlineTime').html(`<p class="fs-16 fs-md-20 fw-medium line-height-sm" id="groupEnjoyTime">${timePartDeadline}</p>`)
    }
    if(timeInsufficient){
        // console.log('時間不足 24');
        return
    }
    if(groupingInvitees.value == ''){
        // console.log('請選擇付款人');
        $('.inviteesFillAlert').addClass('shake-element')
        setTimeout(function() {
            $('.inviteesFillAlert').removeClass('shake-element');
        }, 2000); // 停止搖動後的 2 秒鐘內移除
        return
    }else{
        // console.log(groupingInvitees.value);
        payer = groupingInvitees.value.toString() == 'no-invitees' ? `` : `${usersName}`
    }
    // console.log(payer);
    // $('#modal-CreateGroup').modal('hide'); // 測試用未來可刪
    // $('#modal-successfullyGroup').modal('show'); // 測試用未來可刪
    sendAddGroup(payer);
})

// 發送訂單
function sendAddGroup(payer){
    // console.log('訂購時間',orderTime.toString());
    // console.log('享用日期',enjoyTime.toString());
    // console.log('付款人 userUID',_user);
    // console.log(usersId);
    let orderData = {
        restaurantId: newRestaurantId,
        orderDetail: [ ]
        }
    let groupData = {
        restaurantId: newRestaurantId,
        deadlineDateTime: orderTime.toString(),
        eventDateTime: enjoyTime.toString(),
        initiatorId: usersId,
        initiator: usersName.toString(),
        inviteesId: payer? usersId:'',
        invitees: payer?`${payer}`:''
        }
        // console.log(groupData);
   // 定義兩個請求
   const ordersRequestGet = axios.get(`https://teatimeapi-test.onrender.com/orders`);
   const groupingsRequestGet = axios.get(`https://teatimeapi-test.onrender.com/groupings`);

   // 使用 axios.all 同時發送兩個請求
   axios.all([ordersRequestGet, groupingsRequestGet])
       .then(axios.spread((ordersRes, groupingsRes) => {
            let ordersLength = ordersRes.data.length + 1; // orders 數量
            let groupingsLength = groupingsRes.data.length + 1; // groupings 數量
            // orderData.id = ordersLength; // id 由系統生成
            orderData.groupingId = groupingsLength;
            // groupData.id = groupingsLength; // id 由系統生成
            groupData.orderId = ordersLength; 
            let result = handleDate(ordersLength, groupingsLength);
            // console.log(result);
            orderData.UID = result.ordersUID;
            groupData.UID = result.groupingsUID;
            // console.log(orderData);
            // console.log(groupData);
            // $('#modal-CreateGroup').modal('hide');
            // $('#modal-successfullyGroup').modal('show');

            // 將資料新增至 API : orders、groupings
            axios.post(`https://teatimeapi-test.onrender.com/orders`,orderData)
            .then(ordersPostRes=>{
                return axios.post(`https://teatimeapi-test.onrender.com/groupings`,groupData)
                .then(groupingsPostRes=>{
                    $('#modal-CreateGroup').modal('hide');
                    $('#modal-successfullyGroup').modal('show');
                    // console.log('新增成功');
                    window.location.href = `store-order.html?UID=${groupData.UID}`;
                })
                .catch(err=>{console.log(err);})
            })
            .catch(err=>{ console.log(err); })
       }))
       .catch(err => {
           console.log(err);
       });
}

// 處理日期
function handleDate(ordersLength, groupingsLength){
    // console.log(ordersLength,groupingsLength);
    let data = {};
    let newOrdersUID = Math.floor(Math.log10(ordersLength))+1;
    let newGroupingsUID = Math.floor(Math.log10(groupingsLength))+1;
    // console.log(newOrdersUID,newGroupingsUID);

    // 處理 newOrders UID
    if(newOrdersUID == 1){
        data.ordersUID = `O0${ordersLength.toString().padStart(newOrdersUID+1, '0')}`
    }
    else if(newOrdersUID == 2){
        data.ordersUID = `O${ordersLength.toString().padStart(newOrdersUID+1, '0')}`
    }else{
        data.ordersUID = `O${ordersLength.toString().padStart(newOrdersUID, '0')}`
    }

    // 處理 Groupings UID
    if(newGroupingsUID == 1){
        data.groupingsUID = `G0${groupingsLength.toString().padStart(newGroupingsUID+1, '0')}`
    }
    else if(newGroupingsUID == 2){
        data.groupingsUID = `G${groupingsLength.toString().padStart(newGroupingsUID+1, '0')}`
    }else{
        data.groupingsUID = `G${groupingsLength.toString().padStart(newGroupingsUID, '0')}`
    }

    return data;
}



//當 modal 出現，獲取當前登入人的的姓名作為發起人
modalCreateGroup.addEventListener("show.bs.modal", function (event) {
    //綁定發起人
    const groupingInitiator = document.querySelector(".groupingInitiator")
    const storeName = $('#storeNameID').html()

    $('#orderStoreId').html(`<p class="text-gray-01" id="orderStoreId">${storeName}</p>`)
    //獲取發起人名稱
    axios.get(`${_url}/users?UID=${_user}`)
        .then(function (res) {
            groupingInitiator.textContent = res.data[0].userName
            const {userName ,id} = res.data[0]
            usersName = userName;
            usersId = id;
        }).catch(function (err) {
            console.error(err.message);
        })
})

//點擊 modal 則操作儲存格
modalCreateGroup.addEventListener("click", function (event) {
    //綁定各儲存格    
    const enjoymentDateInput = document.getElementById("enjoymentDate") //享用日期
    const orderTermInput = document.getElementById("orderTerm") //訂購期限    
    const groupingInviteesSelect = document.getElementById("groupingInvitees") //付款人

    //獲取各儲存格輸入值
    const enjoymentDate = enjoymentDateInput.value.trim()
    const orderTerm = orderTermInput.value.trim()
    const groupingInvitees = groupingInviteesSelect.value.trim()

    let formattedEnjoymentDate = ""
    let formattedOrderTerm = ""

    //若「享用日期」輸入格有值，則進行時間格式化
    if (enjoymentDate) {
        formattedEnjoymentDate = moment(enjoymentDate, "YYYY/MM/DD HH:mm");
    }

    //若「訂購期限」輸入格有值，則進行時間格式化
    if (orderTerm) {
        formattedOrderTerm = moment(orderTerm, "YYYY/MM/DD HH:mm");
    }

    //若時間輸入格均有值，判定訂購期限需早於享用時間至少 24 時
    if (formattedEnjoymentDate && formattedOrderTerm ) {
        const diffInHours = formattedEnjoymentDate.diff(formattedOrderTerm, 'hours')
        const orderTermAlert = document.querySelector(".orderTermAlert") // 訂購期限


        if (diffInHours < 24) {
            orderTermAlert.classList.remove("d-none")
            timeInsufficient = true;
        } else {
            orderTermAlert.classList.add("d-none")
        }
    }

    if(formattedEnjoymentDate){
        $('.EnjoyFillAlert').addClass('d-none')
    }
    if(formattedOrderTerm){
        $('.orderFillAlert').addClass('d-none')
    }
    $("#groupingInvitees").change(function() {
        var selectedValue = $(this).val();
        if (selectedValue === "") {
          $(".inviteesFillAlert").show();  // 顯示提示
        } else {
          $(".inviteesFillAlert").hide();  // 隱藏提示
        }
      });
})


/* 時間選擇器初始化 ================*/
// const config = {
//     enableTime: true,
//     dateFormat: "Y/m/d H:i",
//     time_24hr: true,
//     minuteIncrement: 15,
//     allowInput: true,
//     minDate: moment().format('YYYY/MM/DD'),
//     onClose: function(selectedDates, dateStr, instance) {
//         // selectedDates 是一個包含選擇的日期的數組
//         // dateStr 是選擇的日期的字串表示形式
//         // console.log("選擇的日期:", dateStr);
//         enjoyTime = dateStr;
//         console.log(enjoyTime);
//     }
// }
// 初始化享用日期的 flatpickr
const enjoymentDateInstance = flatpickr("#enjoymentDate", {
    enableTime: true,
    dateFormat: "Y/m/d H:i",
    time_24hr: true,
    minuteIncrement: 15,
    allowInput: true,
    minDate: moment().format('YYYY/MM/DD'),
    onClose: function(selectedDates, dateStr, instance) {
        enjoyTime = dateStr;
        // console.log(enjoyTime);
    }
});

// 初始化訂購期限的 flatpickr
const orderTermInstance = flatpickr("#orderTerm", {
    enableTime: true,
    dateFormat: "Y/m/d H:i",
    time_24hr: true,
    minuteIncrement: 15,
    allowInput: true,
    minDate: moment().format('YYYY/MM/DD'),
    onClose: function(selectedDates, dateStr, instance) {
        orderTime = dateStr;
        // console.log(orderTime);
    }
});