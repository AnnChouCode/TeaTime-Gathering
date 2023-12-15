import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";
// import axios
import axios from 'axios';
// import 時間判斷是否為過去事件元件
import isPastEvent from '/assets/js/components/isPastEvent.js';
// import 判斷登入狀態元件
import isLoggedIn from '/assets/js/components/isLoggedIn.js';
// import 活動時間字串處理
import showDateTime from '/assets/js/components/showDateTime.js';
// import 解密 token 元件
import cryptoToken from '/assets/js/components/cryptoToken.js'; 
// import 開團投票進度計算 元件
import calcGroupProgress from '/assets/js/components/calcGroupProgress.js'; 


//全頁共用變數
const _url = "https://teatimeapi-test.onrender.com"
const _token = localStorage.getItem("token")
const _user = cryptoToken(_token)

//儲存 API 回傳資料
let datas = []



/* 開團投票事件資訊整理 ========================================== */
function initEvents() {
    //定義資料時間範圍，目前暫定當下前後一個月                    
    const latterMonth = moment().add(2, 'month').format('YYYY/MM')
    const agoMonth = moment().subtract(1, 'month').format('YYYY/MM')
    //API 時間範圍
    const timeRange = `deadlineDateTime_gte=${agoMonth}&deadlineDateTime_lte=${latterMonth}`

    //API
    const groupings = axios.get(`${_url}/groupings?_expand=restaurant&${timeRange}`)
    const votings = axios.get(`${_url}/votings?_expand=restaurant&${timeRange}`)

    Promise.all([groupings, votings])
        .then(function (res) {
            datas = datas.concat(res[0].data)
            datas = datas.concat(res[1].data)
            //整理用於渲染的資料
            createEventData()
        }).catch(function (err) {
            console.error(err.message);
        });
}

initEvents()


//存放整理過的渲染資料
const calendarEventMap = {}

//整理用於渲染的資料
function createEventData() {
    //使用截止時間排序原始資料
    datas.sort((a, b) => {
        const dateA = new Date(a.deadlineDateTime)
        const dateB = new Date(b.deadlineDateTime)
        return dateA - dateB
    })


    //整理原始資料
    datas.forEach(data => {
        if (!calendarEventMap[data.UID]) {
            calendarEventMap[data.UID] = {
                UID: data.UID,
                restaurantId: data.restaurantId,
                deadlineDateTime: data.deadlineDateTime, //截止時間
                eventDateTime: data.eventDateTime, //享用時間
                initiator: data.initiator, //舉辦人
                invitees: data.invitees, //請客人
                restaurantList: data.UID.startsWith('V') ? [] : [data.restaurant.storeName],
                restaurantPhoto: data.restaurant.storeCover,
            };
        }

        if (data.UID.startsWith('V')) {
            calendarEventMap[data.UID].restaurantList.push(data.restaurantName)
        }
    })

    handleDataToBeRendered()
}



/* 分類渲染 ========================================== */
//綁定 DOM
const btnfilterEvent = document.querySelectorAll(".btnfilterEvent")
const calendarBlock = document.querySelector('.calendarBlock')

//分類按鈕監聽
btnfilterEvent.forEach(btn => {
    btn.addEventListener("click", function () {
        const category = this.getAttribute("data-event")
        //渲染事件
        handleDataToBeRendered(category)
    })
})

//處理要被渲染的分類資料
function handleDataToBeRendered(category = "groupings") {
    //已被分類的資料
    const filteredData = Object.values(calendarEventMap).filter(data => data.UID.startsWith(category[0].toUpperCase()))

    //判斷未來活動的數量，避免要渲染的事件量不足
    const futureData = filteredData.filter(data => {
        //判斷事件是否晚於今天
        const eventDateTime = moment(data.deadlineDateTime, 'YYYY/MM/DD HH:mm')
        return moment().isBefore(eventDateTime)
    })

    //用於儲存要被渲染的資料
    let dataToBeRendered

    //如果未來活動數量 >= 4，則取前四則活動，否則取後四則活動
    if (futureData.length >= 4) {
        dataToBeRendered = futureData.slice(0, 4)
    } else {
        dataToBeRendered = filteredData.slice(filteredData.length - 4, filteredData.length)
    }

    renderEvent(dataToBeRendered)
}

//渲染事件
function renderEvent(dataToBeRendered) {
    //如果沒有事件
    if (!dataToBeRendered.length){
        calendarBlock.innerHTML = "<div class='fs-16 fs-md-20 text-center'><p>目前沒有活動</p><p>歡迎建立開團與投票</p></div>"
        return
    }
    
    //活動卡片渲染來源
    let strTemplate = ""

    dataToBeRendered.forEach(data => {
        strTemplate += `<div class="col-md-6 col-xl-4 col-xxxl-3">
                <a ${linkToEvent(data.UID)}
                    class="event-rounded h-100 w-100 d-flex flex-lg-column p-12 p-lg-16 align-items-center justify-content-center bg-white border-hover-line"
                    data-aos="flip-left" data-aos="flip-left" data-aos-delay="400">
                    <img class="event-pic me-12 me-lg-0 mb-lg-20"
                        src="${data.restaurantPhoto}"
                        alt="calendar-img">
                    <div class="d-flex flex-column justify-content-between w-60 w-lg-100 flex-grow-1">
                        <p class="mb-8 mb-lg-16 fs-20 fs-lg-24 fw-bold lh-sm text-brand-03 single-ellipsis">${data.restaurantList.join("、")}</p>
                        <div class="d-flex justify-content-between align-items-center mb-8 mb-lg-16">
                            <p class="fs-16 fs-lg-20 text-gray-05">${data.UID.startsWith("V") ? "投票中" : "開團中"}</p>
                            ${showDeadline(data.deadlineDateTime)}
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="fs-16 fs-lg-20 text-gray-05">請客人</p>
                            <span class="fs-16 fs-lg-20 lh-sm fw-medium">${!data.invitees ? "無" : data.invitees}</span>
                        </div>
                    </div>
                </a>
            </div>`
    })

    calendarBlock.innerHTML = strTemplate
}


//未來、過去事件 時間狀態顯示模板
function showDeadline(deadlineDateTime) {
    //儲存要回傳的內容
    let showDeadline

    //判斷事件是否早於今天，若為是（意即過去式事件），則顯示已結束
    if (isPastEvent(deadlineDateTime)) {
        showDeadline = "<div class='fw-medium lh-sm fs-16 fs-lg-20'>已結束</div>"
    } else {
        showDeadline = `<div class="d-flex align-items-center ms-8 gap-md-8 gap-4">
                                    <iconify-icon icon="solar:calendar-linear" style="color: #1e1e1e;" width="26"
                                        height="26"></iconify-icon>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${showDateTime(deadlineDateTime)[0]}</time>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${showDateTime(deadlineDateTime)[1]}</time>
                                </div>`
    }

    return showDeadline
}

//開團、投票事件 呼喚動作模板
function linkToEvent(UID) {
    //投票事件帶入 modal 和 UID
    if (UID.startsWith("V")) {
        return `href="#modal-VotingModal" data-bs-toggle="modal" data-bs-votingUID="${UID}"`
    } else {
        //開團事件設連結
        return `href="store-order.html?UID=${UID}"`
    }
}



/* 投票檢索 modal & 投票動作 ========================================== */
const VotingModal = document.getElementById('modal-VotingModal')
//calendarEventMap
//初始化投票 modal 選項店家資料
function initModalVotingCard(votingUID) {
    let votingCardData = [] //投票 modal 右側店家卡片資料

    axios.get(`${_url}/votings?UID=${votingUID}&_expand=restaurant`)
        .then(function (res) {
            votingCardData = res.data
            renderVotingCard(votingCardData)
        }).catch(function (err) {
            console.error(err.message);
        });
}

//投票 modal 資料顯示
VotingModal.addEventListener('show.bs.modal', function (event) {
    //從投票事件卡片獲取 data-bs-votingUID 編號
    const modalData = event.relatedTarget
    const votingUID = modalData.getAttribute('data-bs-votingUID')

    //render 投票活動資訊
    renderVotingModalInfo(votingUID)

    //可投票店家卡片資料初始化            
    initModalVotingCard(votingUID)

    //判斷登入狀態
    isLoggedIn(_token)
})

//render 投票 modal 活動資訊
function renderVotingModalInfo(votingUID) {
    //投票 modal 標題綁定 & 渲染
    const modalTitle = VotingModal.querySelector('.modal-title')
    modalTitle.textContent = calendarEventMap[votingUID].restaurantList.join("、")

    //投票 modal 活動資訊資訊，欄位綁定 & 渲染
    const deadlineDateTime = VotingModal.querySelector(".deadlineDateTime")
    const eventDateTime = VotingModal.querySelector(".eventDateTime")
    const initiator = VotingModal.querySelector(".initiator")
    const invitees = VotingModal.querySelector(".invitees")

    const event = calendarEventMap[votingUID]

    deadlineDateTime.innerHTML = `<span class="me-16">截止日期</span>
    <span class="me-8 ">${showDateTime(event.deadlineDateTime)[0]}</span>
    <span>${showDateTime(event.deadlineDateTime)[1]}</span>`

    eventDateTime.innerHTML = `<span class="me-16">享用時間</span>
    <span class="me-8">${showDateTime(event.eventDateTime)[0]}</span>
    <span>${showDateTime(event.eventDateTime)[1]}</span>`

    initiator.textContent = event.initiator
    invitees.textContent = event.invitees === "" ? "無" : event.invitees
}

//render 投票 modal 選項店家資料
function renderVotingCard(votingCardData) {
    //店家卡片渲染區域 
    const votingCard = VotingModal.querySelector(".votingCard")
    //當前事件是否為過去事件
    const isPast = isPastEvent(votingCardData[0].deadlineDateTime)

    //暫時儲存要渲染的店家卡片資料
    let cardDataTemp = ""

    //生成要渲染的資料
    votingCardData.forEach(data => {
        //當前用戶是否已投票
        const alreadyVoted = data.currentVoters.includes(_user)
        //當前店家已投票人數
        const numVoters = data.currentVoters.length
        //當前店家最小成團人數
        const numMinGroupSize = data.restaurant.minGroupSize
        //取得投票進度
        let calcGroupProgressNum = 0; 
        calcGroupProgressNum = calcGroupProgress(numVoters,numMinGroupSize)
        
        cardDataTemp += `
    <li class="d-flex gap-12 p-12 mb-12 border border-brand-03 border-radius-40401616">
        <img class="border-radius-32321616 votingcard-photo" src="${data.restaurant.storeCover}">
            <div class="flex-grow-1 d-flex flex-column">
                <h4 class="mb-8 fs-16 fs-md-20 lh-sm text-brand-03">${data.restaurantName}</h4>
                <p class="flex-grow-1 mb-8 mb-md-16 text-gray-02 trippleline-ellipsis">${data.restaurant.summary}</p>
                <div class="d-flex justify-content-between flex-column flex-lg-row">
                    <div class="d-flex align-items-center mb-8 mb-lg-0 ">
                        <span class="me-4 me-lg-16 text-gray-02 text-nowrap">成團目標</span>
                        <div class="ts-progress is-tiny bg-gray-04 voting-progress" data-num="${data.id}">
                            <div class="bar bg-brand-02" style="--value: ${calcGroupProgressNum}">
                                <div class="text-white">${calcGroupProgressNum > 100 ? 100 : calcGroupProgressNum}%</div>
                            </div>
                        </div>
                    </div>
                    ${btnVoteStates(data.id, isPast, alreadyVoted)}
                </div>
            </li>`
    })

    //渲染
    votingCard.innerHTML = cardDataTemp

    //btnVoteThis 投票動作判斷
    voteStore()
}


//判斷 btnVoteThis 狀態
function btnVoteStates(id, isPast, alreadyVoted) {
    //過去事件，按鈕呈現禁用
    if (isPast) {
        return `<button class="py-4 px-16 btn-disable border-0 rounded-pill btnVoteThis" disabled type="button">已結束</button>`
    }

    //登入狀態判斷，若未登入，加入提示語法
    if (!isLoggedIn(_token)) {
        return `<button
                      class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02"
                      type="button" data-num=${id} data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="請先登入帳號">投票</button>`
    }

    //是否已投票過此店家
    return `<button
                class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis ${alreadyVoted ? " btn-active-brand-02" : ""}"
            type="button" data-num=${id}>${alreadyVoted ? "已投票" : "投票"}</button>`
}



//btnVoteThis 投票動作判斷  
function voteStore() {
    if (!isLoggedIn(_token)) {
        //若為未登入狀態，提示登入，並中斷執行後續動作
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => {
            new bootstrap.Popover(popoverTriggerEl)
        })
    }

    const btnVoteThis = VotingModal.querySelectorAll('.btnVoteThis')

    btnVoteThis.forEach(btn => {
        btn.addEventListener('click', function () {
            //3 秒內按鈕禁用
            this.disabled = true
            setTimeout(() => {
                this.disabled = false
            }, 3000)

            //含有指定 class 樣式的按鈕代表已投票過此店家
            const isVoted = btn.classList.contains("btn-active-brand-02")

            //投票過的店家 click，取消投票
            if (isVoted) {
                //將 votings 資料庫 id 與動作輸入變更資料庫
                updateVotingAPI(btn.dataset.num, "deleteVote")
            } else {
                //未投票的店家 click，投票成功
                //將 votings 資料庫 id 與動作輸入變更資料庫
                updateVotingAPI(btn.dataset.num, "addVote")
            }
        })
    })

}

//變更投票資料庫 API
async function updateVotingAPI(id, status) {
    try {
        //進度條加入等待動畫
        const progressElements = document.querySelector(`.ts-progress[data-num="${id}"]`)
        progressElements.classList.add("is-processing")

        //宣告變數存取目前參與投票者清單            
        const updatedVoters = datas.filter(item => item.UID.startsWith("V") && item.id == id)[0].currentVoters

        //依據動作處理投票者清單
        if (status === "addVote") {
            updatedVoters.push(`${_user}`)
        } else {
            const userIndex = updatedVoters.indexOf(`${_user}`)
            updatedVoters.splice(userIndex, 1)
        }

        //修改資料庫中的數據
        axios.patch(`${_url}/votings/${id}`, {
            "currentVoters": updatedVoters
        })
            .then(function (patchRes) {
                initModalVotingCard(patchRes.data.UID)
                //進度條加入移除動畫
                progressElements.classList.remove("is-processing")
            })
            .catch(function (err) {
                console.error(err.message);
            });
    } catch (err) {
        console.log('錯誤:', err);
        throw err;
    }
}



/* 分類按鈕 active 狀態切換顯示 ====================*/
$('.btnfilterEvent').click(function (e) {
    $('.btnfilterEvent').toggleClass('btn-active-brand-02')
})
