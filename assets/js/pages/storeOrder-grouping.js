import axios from 'axios';
//活動時間字串處理
import showDateTime from '/assets/js/components/showDateTime.js';

//全頁共用變數
const now = moment().format('YYYY/MM/DD')
const _url = "https://teatimeapi-test.onrender.com"

/* 當前店家開團資料 =============== */
//辨識當前網頁 UID
const currentUID = location.href.split("=")[1]

const btnTogetherEvent = document.querySelector(".btnTogetherEvent")
btnTogetherEvent.addEventListener("click", getGroupingDatas)

//所有開團中事件資料
let groupingDatas

function getGroupingDatas() {
    //撈取尚未截止的開團事件，並使用截止時間排序
    const dataGetRule = `_sort=deadlineDateTime&deadlineDateTime_gte=${now}`

    axios.get(`${_url}/groupings?_expand=restaurant&${dataGetRule}`)
        .then(function (res) {
            //所有開團中事件資料
            groupingDatas = res.data
            //符合頁面 UID 的開團資料
            let filteredData
            //當前頁面的餐廳 Id
            let currentRestaurantId

            //如果頁面 UID 傳入 "G" 開頭 UID，則表開團 UID，若否則表餐廳 UID
            if (currentUID.startsWith("G")) {
                //篩選符合開團 UID 的 data，若無則返回 []
                filteredData = groupingDatas.filter(data => data.UID === currentUID)
                //取當前頁面的餐廳 id
                currentRestaurantId = filteredData.length ? filteredData[0].restaurantId : ""
            } else {
                //若該餐廳無開團，則取回 []
                filteredData = groupingDatas.filter(data => data.restaurant.UID === currentUID)
                //取當前頁面的餐廳 id，若該餐廳無開團，則取回 ""
                currentRestaurantId = filteredData.length ? filteredData[0].restaurantId : ""
            }

            //尋找所有開團資料中符合餐廳 Id 的事件
            const grouingDatasToBeRendered = groupingDatas.filter(data => data.restaurantId === currentRestaurantId)

            showGroupingEvent(grouingDatasToBeRendered)

        }).catch(function (err) {
            console.error(err.message);
        });
}

function showGroupingEvent(grouingDatasToBeRendered) {
    const calendarBlock = document.querySelector(".calendarBlock")

    let renderTemplate = ""

    if (!grouingDatasToBeRendered.length) {
        renderTemplate = "<p class='fs-16 fs-md-20 text-center'>目前沒有開團</p>"
    } else {
        grouingDatasToBeRendered.forEach(data => {
            renderTemplate += `<div class="col-md-6 col-xl-4 col-xxxl-3 px-0 px-md-12">
                        <a href="store-order.html?UID=${data.UID}"
                            class="d-flex flex-lg-column p-12 p-lg-16 align-items-center justify-content-center bg-white border-hover-line border-radius-40401616 border-radius-lg-80801616 h-100 w-100">
                            <img class="event-img-RWD me-12 me-lg-0 mb-lg-20"
                                src="${data.restaurant.storeCover}"
                                alt="calendar-img">
                                <div class="d-flex flex-column justify-content-between w-60 w-lg-100 flex-grow-1">
                        <p class="mb-8 mb-lg-16 fs-20 fs-lg-24 fw-bold lh-sm text-brand-03 single-ellipsis">${data.restaurant.storeName}</p>
                        <div class="d-flex justify-content-between align-items-center mb-8 mb-lg-16">
                            <p class="fs-16 fs-lg-20 text-gray-05">開團中</p>
                            <div class="d-flex align-items-center ms-8 gap-md-8 gap-4">
                                    <iconify-icon icon="solar:calendar-linear" style="color: #1e1e1e;" width="26" height="26"></iconify-icon>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${showDateTime(data.deadlineDateTime)[0]}</time>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${showDateTime(data.deadlineDateTime)[1]}</time>
                                </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="fs-16 fs-lg-20 text-gray-05">請客人</p>
                            <span class="fs-16 fs-lg-20 lh-sm fw-medium">${!data.invitees ? "無" : data.invitees}</span>
                        </div>
                    </div>
                        </a>
                    </div>`
        })

    }

    calendarBlock.innerHTML = renderTemplate
}