import axios from 'axios';
// import 時間選擇器
import flatpickr from "flatpickr";
// import 解密 token 元件
import cryptoToken from '/assets/js/components/cryptoToken.js';


//全頁共用變數
const _url = "https://teatimeapi-test.onrender.com"
const _token = localStorage.getItem("token");
const _user = cryptoToken(_token)


/* 選擇建立揪團資料 ================================*/
//綁定建立揪團按鈕
const btnCreateGroup = document.querySelector(".btnCreateGrouping")
//綁定建立揪團 modal
const modalCreateGroup = document.getElementById('modal-CreateGroup')

//當 modal 出現，獲取當前登入人的的姓名作為發起人
modalCreateGroup.addEventListener("show.bs.modal", function (event) {
    //綁定發起人
    const groupingInitiator = document.querySelector(".groupingInitiator")

    //獲取發起人名稱
    axios.get(`${_url}/users?UID=${_user}`)
        .then(function (res) {
            groupingInitiator.textContent = res.data[0].userName
        }).catch(function (err) {
            console.error(err.message);
        })
})

//點擊 modla 則操作儲存格
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
        const orderTermAlert = document.querySelector(".orderTermAlert")

        if (diffInHours < 24) {
            orderTermAlert.classList.remove("d-none")
        } else {
            orderTermAlert.classList.add("d-none")
        }
    }
})



/* 時間選擇器初始化 ================*/
const config = {
    enableTime: true,
    dateFormat: "Y/m/d H:i",
    time_24hr: true,
    minuteIncrement: 15,
    allowInput: true,
    minDate: moment().format('YYYY/MM/DD'),
}

flatpickr(".dateSelector", config); 