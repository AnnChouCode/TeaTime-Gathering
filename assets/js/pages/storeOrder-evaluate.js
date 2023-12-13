const _url = "https://teatimeapi-test.onrender.com";
const _rating = "/ratings";
const _sorting = "_sort=id&_order=desc";
let ratingInnerHTML = document.querySelector(".rating-cards");
let ratingRWDInnerHTML = document.querySelector(".rating-cards-RWD");
let ratingToggleBtn = document.querySelector(".ratingToggleBtn");
let ratingRWDToggleBtn = document.querySelector(".ratingRWDToggleBtn");

let ratingData = [];
let ratingArys = [];

// 找到網址路徑的搜尋範圍 如:?UID=B001  ，在抓出最後的4碼店家代號
let currentUrlSearch = (window.location.search).slice(-4,);

(function init() {
    axios.get(`${_url}${_rating}?${_sorting}`)
        .then(function (res) {
            ratingData = res.data;
            ratingArys = ratingData.filter(item => item.restaurantUID === currentUrlSearch);
            showRating();
        })
})()

function showRating(quantity = 4) {
    let ratingItems = "";
    ratingArys.forEach((item, index) => {
        // for(let item=0;item<ratingData.length;item++){
        // restaurantUID
        if (item.restaurantUID === currentUrlSearch && index < quantity) {
            ratingItems += `
        <div class="feedback-style col-12 col-md-6 pt-32 pt-sm-48 mb-md-32">
            <div class="bg-brand-05 border-radius-16 px-12 px-sm-24 pb-12 pb-sm-24 custom-shadow-025">
                <div class=" transform-32-sm-48 d-flex ">
                <img class="people-img border-radius-24 border border-2 border-line me-16" src=${item.reviewerPhoto} alt="user-img">
                    <div class="feedback-content w-100 d-flex flex-column justify-content-end ">
                    <div class="d-flex">
                        <div class="d-flex flex-column justify-content-end ">
                        <div class="star-list mb-md-8">
                            <iconify-icon icon="ic:round-star" class="me-4" style="color: #ffd43a;" width="16"></iconify-icon>
                            <iconify-icon icon="ic:round-star" class="me-4" style="color: #ffd43a;" width="16"></iconify-icon>
                            <iconify-icon icon="ic:round-star" class="me-4" style="color: #ffd43a;" width="16"></iconify-icon>
                            <iconify-icon icon="ic:round-star" class="me-4" style="color: #ffd43a;" width="16"></iconify-icon>
                            <iconify-icon icon="ic:round-star" class=" " style="color: #C2C1BD;" width="16"></iconify-icon>
                        </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="fs-16 fs-md-20 text-gray-02">${item.reviewer}</p>
                        <time datetime="2023-09-01" class="">${item.reviewDateTime}</time>
                    </div>
                    </div>
                </div>
                <p class="line-clamp-2">${item.feedbackText}</p>
            </div>
        </div>
      `;
        }
    })

    if (ratingItems !== "") {

        ratingInnerHTML.innerHTML = ratingItems;
        ratingRWDInnerHTML.innerHTML = ratingItems;
    } else {
        // 桌面版
        ratingInnerHTML.innerHTML = `<div class="d-flex justify-content-center fs-24 fw-bolder text-brand-03"> 此店家目前無評價</div>`;
        ratingToggleBtn.classList.add("d-none");
        // 手機板
        ratingRWDInnerHTML.innerHTML = `<div class="d-flex justify-content-center fs-16 fw-bolder text-brand-03"> 此店家目前無評價</div>`;
        ratingRWDToggleBtn.classList.add("d-none");

    }
}


// RWD留言右方按鈕，觸發toggle，呈現全部或者4則留言
let RWDshowAll = true;
ratingRWDToggleBtn.addEventListener("click", function () {
    RWDshowAll = !RWDshowAll;
    ratingRWDInnerHTML.innerHTML = "";
    // 傳入全部或者4則留言
    showRating(RWDshowAll == true ? 4 : ratingData.length);
    ratingRWDToggleBtn.classList.toggle("transform180")
})


// 留言下方按鈕，觸發toggle，呈現全部或者4則留言
let showAll = true;
ratingToggleBtn.addEventListener("click", function () {
    showAll = !showAll;
    ratingInnerHTML.innerHTML = "";
    // 傳入全部或者4則留言
    showRating(showAll == true ? 4 : ratingData.length);
    ratingToggleBtn.classList.toggle("transform180")
})

// 評價上傳
const updateRatingBtn = document.getElementById('updateRatingBtn');
updateRatingBtn.addEventListener('click', updateRating);

function updateRating(e) {
    let updataObj = {};
    const modalTitle = document.querySelector(".modal-title")
    modalTitle.textContent = document.querySelector("#storeNameID").textContent;

    let storeNameinModal = updateRatingBtn.closest('.modal-content').querySelector('h5').innerText;
    let starinModal = document.querySelector("[data-rating-star]").dataset.ratingStar;
    let memberEvaluate = document.querySelector(".memberEvaluate");


    let storeUrl = "https://teatimeapi-test.onrender.com/groupings?UID=G001&_expand=restaurant";

    // restaurantData.forEach(item => {
    //     if (item.storeName === storeNameinModal && memberEvaluate.value !== "") {
    //         updataObj = {
    //             UID: "R004",
    //             reviewer: "黃莉琳",
    //             reviewerPhoto: "https://raw.githubusercontent.com/AnnChouCode/TeaTime-Gathering/main/assets/images/user/female/user-female-03.jpg",
    //             starRating: Number(starinModal),
    //             feedbackText: memberEvaluate.value,
    //             reviewedRestaurant: item.storeName,
    //             restaurantUID: item.UID,
    //             reviewDateTime: moment().format('YYYY/MM/DD')
    //         }
    //         axios.post('https://teatimeapi-test.onrender.com/ratings', updataObj).
    //             then(function (res) {
    //                 memberEvaluate.value = "";
    //                 // 成功後觸發 "X"的按鈕
    //                 const closeButton = document.querySelector('.btn-close');
    //                 closeButton.click();
    //                 setTimeout(() => {
    //                     alert("留言評價成功");
    //                 }, 100)
    //             })
    //     }
    // })
}
