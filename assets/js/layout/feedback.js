import axios from 'axios'
// import 星級樣板
import showStars from '/assets/js/components/showStars.js'

//全頁共用變數
const _url = 'https://teatimeapi-test.onrender.com'
let isMobile = ''

//儲存回饋
let messagesDatas = []
let ratingsDatas = []

/* 獲取回饋事件 ===================== */
async function initFeedBack() {
  try {
    //獲取事件並以時間降冪排序
    const messagesPromise = axios.get(
      `${_url}/messages?_sort=reviewDateTime&_order=desc`
    )
    const ratingsPromise = axios.get(
      `${_url}/ratings?_sort=reviewDateTime&_order=desc`
    )

    const [messagesResponse, ratingsResponse] = await Promise.all([
      messagesPromise,
      ratingsPromise
    ])

    ratingsDatas = ratingsResponse.data
    messagesDatas = messagesResponse.data

    renderFeedBack()
  } catch (err) {
    console.error(err.message)
  }
}

initFeedBack()

/* 渲染回饋事件 ===================== */
function renderFeedBack() {
  //偵測視窗尺寸
  window.addEventListener('resize', delayedCheck)

  //複製原始資料
  let ratings = JSON.parse(JSON.stringify(ratingsDatas))
  let messages = JSON.parse(JSON.stringify(messagesDatas))
  console.log(ratings)
  //行動版只擷取前四項資料
  if (!isMobile) {
    ratings = ratings.slice(0, 4)
    messages = messages.slice(0, 4)
  }

  let ratingsTemplate = ''
  let messagesTemplate = ''

  //評價處理
  ratings.forEach((data) => {
    //隨視窗大小改變星評尺寸
    const mobileStars = showStars(data.starRating)
    const webStars = mobileStars.replace(/width="16"/g, 'width="24"')

    ratingsTemplate += /*html*/ `
        <div
                            class="evaluate-card bg-white position-relative mt-32 mt-md-64 me-12 me-lg-0 pb-12 pb-md-24 ">
                            <div class="d-flex mb-12 mb-md-16 w-100">
                                <img class="evaluate-store w-100 d-block border border-2 border-line position-absolute"
                                    src="${
                                      data.reviewerPhoto
                                    }" alt="store-logo">
                                <div class="d-flex w-100 justify-content-between ">
                                    <p class="star-group mb-4 mb-md-8">
                                        ${isMobile ? mobileStars : webStars}
                                    </p>
                                    <div
                                        class="evaluate-user d-flex justify-content-between align-items-center pt-12 pt-md-24">
                                        <span class="user-name fs-16 fs-md-20">${
                                          data.reviewedRestaurant
                                        }</span>
                                        <time datetime="2023-08-04" class="user-date fs-16">${
                                          data.reviewDateTime
                                        }</time>
                                    </div>
                                </div>
                            </div>
                            <p class="px-12 px-md-24 lh-lg doubleline-ellipsis">${
                              data.feedbackText
                            }
                            </p>
                        </div>
                        `
  })

  //留言處理
  messages.forEach((data) => {
    messagesTemplate += /*html*/ `<li
        class="evaluate-card message-card bg-white mt-32 mt-md-64 mb-24 mb-md-32 position-relative me-12 me-lg-0 pb-12 pb-md-24">
        <div class="d-flex mb-12 mb-md-16">
            <img class="evaluate-store w-100 d-block border border-2 border-line position-absolute"
                src="${data.reviewerPhoto}" alt="user-photo">
            <div
                class="evaluate-user d-flex justify-content-between  align-items-center pt-8 pt-md-10 w-100">
                <span class="user-name fs-16 fs-md-20">${data.reviewer}</span>
                <time datetime="2023-08-06"
                    class="user-date fs-16 d-block ms-auto ">${data.reviewDateTime}</time>
            </div>
        </div>
        <p class="px-12 px-md-24 lh-lg doubleline-ellipsis">${data.feedbackText}</p>

    </li>`
  })

  const ratingsContainer = document.querySelector('.ratingsContainer')
  ratingsContainer.innerHTML = ratingsTemplate

  const messagesContainer = document.querySelector('.messagesContainer')
  messagesContainer.innerHTML = messagesTemplate
}

//視窗變化延遲偵測
let timeoutId

function delayedCheck() {
  //清除延遲操作
  clearTimeout(timeoutId)
  //延遲 500 豪秒觸發
  timeoutId = setTimeout(checkWindowWidth, 500)
}

//判斷視窗尺寸
function checkWindowWidth() {
  if (window.innerWidth < 992) {
    isMobile = true
    renderFeedBack()
  } else {
    isMobile = false
    renderFeedBack()
  }
}
