import axios from 'axios';
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import isLoggedIn from '/assets/js/isLoggedIn.js'; // import 判斷登入狀態樣板


//全頁共用變數
const _url = "https://teatimeapi-test.onrender.com"
const _token = localStorage.getItem("token");
//目前登入者資訊
const _user = "U004"
const currentUserId = _user.match(/U(\d+)/)[1]
let currentUserName = ""


const btnNotifications = document.querySelectorAll(".btnNotification iconify-icon")

document.addEventListener('DOMContentLoaded', function () {
    const btnNotificationAlerts = document.querySelectorAll(".btnNotificationAlert")

    //未登入狀態的新通知提示
    if (!isLoggedIn(_token)) {
        btnNotificationAlerts.forEach(alert => {
            alert.classList.add("d-none");
        })
    } else {
        //已登入狀態的新通知提示
        btnNotificationAlerts.forEach(alert => {
            alert.classList.remove("d-none");
        })
    }
})


/*  點擊通知按鈕偵測 =========================*/
//獲取點擊通知按鈕的 id
let btnId = ""

btnNotifications.forEach(btn => {
    btn.addEventListener("click", function (e) {
        //獲取點擊通知按鈕的 id
        btnId = e.target.id

        //若未登入，直接前往渲染函式
        if (!isLoggedIn(_token)) {
            showMessage()
        } else {
            //若已登入，獲取登入者名稱
            getCurrentUserName()
        }
    })
})

//通知按鈕-訊息 Bootstrap Toasts 初始化
const toastTrigger = document.getElementById("btnToastNotification");
const toastLiveContent = document.getElementById("notificationToast");
if (toastTrigger) {
    toastTrigger.addEventListener("click", function () {
        let toast = new bootstrap.Toast(toastLiveContent);
        toast.show();
    });
}



/* 獲取與處理通知所需資料 =============================*/
//目前登入者名稱
function getCurrentUserName() {
    axios.get(`${_url}/users?UID=${_user}`)
        .then(function (res) {
            //獲取目前登入者姓名
            currentUserName = res.data[0].userName
            //獲取通知事件資料
            getNotificationDatas()
        }).catch(function (error) {
            console.error(error.message);
        });
}

//使用 moment 格式化日期
const today = moment().format('YYYY/MM/DD HH:mm');
//整理過的事件
let eventMap = {};

//獲取通知事件資料
function getNotificationDatas() {
    //定義資料時間範圍，目前暫定一個月內的過期事件
    const agoMonth = moment().subtract(1, 'month').format('YYYY/MM')
    //API 時間範圍
    const timeRange = `deadlineDateTime_gte=${agoMonth}&deadlineDateTime_lte=${today}`

    const groupings = axios.get(`${_url}/groupings?_expand=restaurant&_expand=order&${timeRange}`);
    const votings = axios.get(`${_url}/votings?_expand=restaurant&${timeRange}`);

    Promise.all([groupings, votings])
        .then(function (res) {
            //合併兩種 datas
            const groupingDatas = res[0].data
            const votingDatas = res[1].data

            handleEventMap(groupingDatas, votingDatas)
        }).catch(function (error) {
            console.error(error);
        });
}

//處理通知事件資料
function handleEventMap(groupings, votings) {
    //登入者有參與的開團
    const participatingGroupings = groupings.filter(data => data.initiatorId == currentUserId || data.order.orderDetail.filter(item => item.name = currentUserName).length)
    //登入者有參與的投票
    const participatingVotings = votings.filter(data => data.initiatorId == currentUserId || data.currentVoters.includes(_user))

    //合併以上資料
    const datas = participatingGroupings.concat(participatingVotings)
    //以截止時間降冪排序
    const sortedDatas = datas.sort((a, b) => {
        const dateA = new Date(a.deadlineDateTime);
        const dateB = new Date(b.deadlineDateTime);
        return dateB - dateA;
    })

    //使用排序後資料重新整理，將相同 UID 歸類
    sortedDatas.forEach(data => {
        //創建資料
        if (!eventMap[data.UID]) {
            //開團中資料
            if (data.UID.startsWith("G")) {
                eventMap[data.UID] = {
                    UID: data.UID,
                    deadlineDateTime: data.deadlineDateTime, //截止時間
                    eventDateTime: data.eventDateTime, //享用時間
                    orderDetail: data.order.orderDetail.filter(item => item.name = currentUserName), //當前登入者訂單付款狀況
                    currentGroupCondition: data.order.orderDetail.length, //目前開團點餐數量
                    minGroupSize: data.restaurant.minGroupSize, //最小成團數量               
                    restaurantList: [data.restaurant.storeName], //餐廳名稱
                    initiatorId: data.initiatorId, //團主 Id
                    initiator: data.initiator, //團主姓名
                    invitees: data.invitees //請客人
                }
            }

            //投票中資料
            if (data.UID.startsWith("V")) {
                eventMap[data.UID] = {
                    UID: data.UID,
                    deadlineDateTime: data.deadlineDateTime, //截止時間
                    eventDateTime: data.eventDateTime, //享用時間
                    restaurantList: [], //餐廳名稱
                    initiatorId: data.initiatorId, //團主 Id
                    initiator: data.initiator, //團主姓名
                    invitees: data.invitees //請客人
                }
            }
        }

        //補充 voting 店名
        if (data.UID.startsWith("V")) {
            eventMap[data.UID].restaurantList.push(data.restaurantName);
        }

    })
    
    //渲染通知
    showMessage()
}


/* 渲染通知按鈕-訊息內容 ============================*/
function showMessage() {
    //判斷點擊按鈕，回傳渲染目的地
    const showArea = showNotificationArea()

    // 綁定訊息渲染區域
    const notificationMessages = document.querySelector(showArea)    
    //已登入狀態，渲染程式碼存放
    let template = ""

    //未登入
    if (!isLoggedIn(_token)) {
        notificationMessages.innerHTML = `<li class="text-center fs-20">請先登入帳號</li>`
    } else {
        //已登入
        Object.values(eventMap).forEach(data => {
            //事件類型
            const eventType = data.UID[0]
            //是否為開團主
            const isInitiator = data.initiatorId == currentUserId
            //是否開團成功
            const isGroupSuccess = data.currentGroupCondition > data.minGroupSize
            //是否有請客人
            const hasInvitees = data.invitees.length ? true : false

            //參與的投票結果已開票
            if (eventType === "V" && !isInitiator) {
                template += `<li>
                <p class="mb-12 text-brand-02 fw-medium fs-md-20 fs-16 lh-sm">您的投票結果已開票！請留意以下店家及訂購時間的開團</p>
                <div class="d-flex justify-content-between mb-8">
                    <span class="text-gray-02">店家</span>
                    <span>${data.restaurantList.join("、")}</span>
                </div>
                <div class="d-flex justify-content-between ">
                    <span class="text-gray-02">預定訂購時間</span>
                    <time>${data.eventDateTime.split(" ")[0]}</time>
                </div>
                </li>`
            }

            //主辦的投票結果已開票
            if (eventType === "V" && isInitiator) {
                template += `<li>
                <p class="mb-12 text-brand-02 fw-medium fs-md-20 fs-16 lh-sm">您主辦的投票結果已開票！請至使用者後台確認</p>
                <div class="d-flex justify-content-between mb-8">
                    <span class="text-gray-02">店家</span>
                    <span>${data.restaurantList.join("、")}</span>
                </div>
                <div class="d-flex justify-content-between ">
                    <span class="text-gray-02">預定訂購時間</span>
                    <time>${data.eventDateTime.split(" ")[0]}</time>
                </div>
                </li>`
            }

            //參與的開團失敗
            if (eventType === "G" && !isGroupSuccess && !isInitiator) {
                template += `<li>
                    <p class="mb-12 text-brand-02 fw-medium fs-md-20 fs-16 lh-sm">您參與的開團失敗！謝謝您的加入</p>
                    <div class="d-flex justify-content-between mb-8">
                        <span class="text-gray-02">店家</span>
                        <span>${data.restaurantList[0]}</span>
                    </div>
                    <div class="d-flex justify-content-between ">
                        <span class="text-gray-02">預定訂購時間</span>
                        <span>無</span>
                    </div>
                    </li>`
            }

            //參與的開團已確認成團
            if (eventType === "G" && isGroupSuccess && !isInitiator) {
                //只要有任何一個品項未付款，即返回 false
                const isPay = data.orderDetail.filter(item => item.isPay === false).length ? true : false

                //成團，並且有人請客
                if (hasInvitees) {
                    template += `<li>
                        <p class="mb-12 text-brand-02 fw-medium fs-md-20 fs-16 lh-sm">您的跟團已確認成團！謝謝 ${data.invitees} 請客</p>
                        <div class="d-flex justify-content-between mb-8">
                            <span class="text-gray-02">店家</span>
                            <span>${data.restaurantList[0]}</span>
                        </div>
                        <div class="d-flex justify-content-between ">
                            <span class="text-gray-02">預定訂購時間</span>
                            <time>${data.eventDateTime.split(" ")[0]}</time>
                        </div>
                        </li>`

                } else if (!isPay) {
                    //成團，無人請客，提醒付款
                    template += `<li>
                        <p class="mb-12 text-brand-02 fw-medium fs-md-20 fs-16 lh-sm">您的跟團已確認成團！請盡速向團主 ${data.initiator} 付款</p>
                        <div class="d-flex justify-content-between mb-8">
                            <span class="text-gray-02">店家</span>
                            <span>${data.restaurantList[0]}</span>
                        </div>
                        <div class="d-flex justify-content-between ">
                            <span class="text-gray-02">預定訂購時間</span>
                            <time>${data.eventDateTime.split(" ")[0]}</time>
                        </div>
                        </li>`

                } else {
                    //成團，已完成所有品項付款
                    template += `
                    <li>
                        <p class="mb-12 text-brand-02 fw-medium fs-md-20 fs-16 lh-sm">您的跟團訂單，已完成付款</p>
                        <div class="d-flex justify-content-between mb-8">
                            <span class="text-gray-02">店家</span>
                            <span>${data.restaurantList[0]}</span>
                        </div>
                        <div class="d-flex justify-content-between ">
                            <span class="text-gray-02">預定訂購時間</span>
                            <time>${data.eventDateTime.split(" ")[0]}</time>
                        </div>
                    </li>
                    `
                }
            }

            //主辦的開團失敗
            if (eventType === "G" && !isGroupSuccess && isInitiator) {
                template += `<li>
                    <p class="mb-12 text-brand-02 fw-medium fs-md-20 fs-16 lh-sm">您主辦的開團失敗！謝謝您的發起</p>
                    <div class="d-flex justify-content-between mb-8">
                        <span class="text-gray-02">店家</span>
                        <span>${data.restaurantList[0]}</span>
                    </div>
                    <div class="d-flex justify-content-between ">
                        <span class="text-gray-02">預定訂購時間</span>
                        <span>無</span>
                    </div>
                    </li>`
            }

        })

        notificationMessages.innerHTML = template
    }

    //清除 EventMap，避免投票店家名稱累積
    clearEventMap()
}

//判斷點擊按鈕，回傳渲染目的地
function showNotificationArea() {
    if (btnId === "toastNews") {
        return ".toastMessages"
    } else {
        return ".modalMessages"
    }
}

//清除 EventMap，避免投票店家名稱累積
function clearEventMap(){
    eventMap = {}
}