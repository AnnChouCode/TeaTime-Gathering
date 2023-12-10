// console.clear();
import showStars from '/assets/js/components/showStars.js';
import axios from 'axios';
let bannerData = [];
let templateBanner = "";
const today = new Date();
let todayDateString = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
// console.log(todayDateString);
// todayDateString = "2023/12/05"; // 有一筆開團
// todayDateString = "2023/11/28"; // 無開團，取 4 筆
getTodayGroupings();
function getTodayGroupings(todayIsGroup) {
  // console.log(todayDateString);
  let url = `https://teatimeapi-test.onrender.com/groupings?deadlineDateTime_like=${todayDateString}&isGroup=true`;
  if (todayIsGroup == 1) {
    url = `https://teatimeapi-test.onrender.com/groupings?&isGroup=true&_limit=4`;
  }
  // console.log(url);
  // console.log(todayIsGroup);
  axios
    .get(url)
    .then(function (res) {
      const data = res.data;
      if (data == "") {
        // 今日無開團
        // console.log("今日無開團，重新取得 4筆 近期開團資料");
        getTodayGroupings(1);
      } else {
        // console.log("今日有開團");
        // console.log(data);
        data.forEach((item, index) => {
          // console.log(item)
          const [datePart, timePart] = item.deadlineDateTime.split(" ");
          item.datePart = datePart;
          item.timePart = timePart;
          if (datePart == todayDateString) {
            item.todayGroupings = true;
          } else {
            item.todayGroupings = false;
          }
          bannerData.push(item);
        });
        if (bannerData != "") {
          // console.log("bannerData 有值");
          let templateBanner = '';
          const bannerName = document.querySelector(".bannerName");
          bannerRender(bannerData)
          .then((res)=>{
            // console.log(res);
            templateBanner += `
            <button class="banner-todaymeal-button 
            position-absolute top-0 start-50 translate-middle
            border-radius-36 bg-white px-12 py-8 
            d-flex align-items-center justify-content-center">
              <h6 class=" me-8 me-sm-16 text-brand-02 word-break-keep-all">今日餐點 跟團倒數</h6>
              <span class="text-white border-radius-40 bg-brand-02 px-12 py-8 me-8" id="hour">03</span>
              <span class="text-brand-02">:</span>
              <span class="text-white border-radius-40 bg-brand-02 px-12 py-8 mx-8" id="min">59</span>
              <span class="text-brand-02">:</span>
              <span class="text-white border-radius-40 bg-brand-02 px-12 py-8 mx-8" id="sec">49</span>
            </button>
            `;
            templateBanner += `
            <div class="swiper mySwiper">
            <div class="swiper-wrapper">
            `;
            res.forEach(item=>{
              // console.log(item);
              templateBanner += `
              <div class="swiper-slide">
                <div class="swiper-bg-Style swiper01 text-white p-12 px-md-40 py-md-24 border-radius-80804040 
                  d-flex justify-content-end flex-column flex-md-row justify-content-md-between align-items-md-end" style="
                  background: url(${item.storeBannerPhoto}) center center/cover, linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);">
                  <div class="swiper-bg-textcontent">
                    <h2 class="fs-28 fs-md-40 fw-bold custom-shadow mb-16">${item.restaurantName}</h2>
                    <p class="swiper-bg-p custom-shadow mb-12 mb-md-0 fs-md-24">${item.summary}</p>
                  </div>
                  <button data-uid="${todayIsGroup == 1? `${item.storeUID}`:`${item.UID}`}" 
                    class="order-btn fs-20 fw-medium text-white border-radius-40 px-24 py-12 bg-brand-03 border-0">點餐去
                  </button>
                </div>
                ${bannerEvaluate(item.reviewedRestaurant)}
              </div>
              `;
            })
            templateBanner += `
            </div>
            </div>
            <div class="swiper-button-next pictures-replace-text d-none d-xl-block"></div>
            <div class="swiper-button-prev pictures-replace-text d-none d-xl-block"></div>
            <div class="swiper-pagination position-absolute top-100 start-50 translate-middle"></div>
            `;
            bannerName.innerHTML = templateBanner;

            let menu = ["", "", ""];
            const swiper = new Swiper(".mySwiper", {
              loop: true,
              clickable: true,
              pagination: {
                el: ".swiper-pagination",
                clickable: true,
                renderBullet: function (index, className) {
                  return '<span class="' + className + '">' + "</span>";
                },
              },
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            });

            const orderBtns = document.querySelectorAll('.order-btn');
            orderBtns.forEach(function (orderBtn) {
              let uid = orderBtn.dataset.uid;
              orderBtn.addEventListener("click", function () {
                // console.log(uid);
                // 導向到 store-order.html
                window.location.href = `store-order.html?UID=${uid}`;
              });
            });

            // 倒數計時器
            // 設定目標時間(結束時間)
            const targetDay = new Date("2023-12-31 23:59").getTime();
            function updateCountdown() {
              // 抓取現在時間
              const currentDay = new Date().getTime();
              // 剩下的時間(毫秒為單位)
              const remainTime = targetDay - currentDay;
              // 計算剩餘的天、日、時、秒
              const days = Math.floor(remainTime / (1000 * 60 * 60 * 24));
              const hours = Math.floor((remainTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const mins = Math.floor((remainTime % (1000 * 60 * 60)) / (1000 * 60));
              const secs = Math.floor((remainTime % (1000 * 60)) / (1000));
              // console.log(days, hours, mins, secs);

              // 放進元素內時間
              // var countday = days < 10 ? document.getElementById('day').innerHTML = "0" + days : document.getElementById('day').innerHTML = days;
              var counthour = hours < 10 ? document.getElementById('hour').innerHTML = "0" + hours : document.getElementById('hour').innerHTML = hours;
              var countmin = mins < 10 ? document.getElementById('min').innerHTML = "0" + mins : document.getElementById('min').innerHTML = mins;
              var countsec = secs < 10 ? document.getElementById('sec').innerHTML = "0" + secs : document.getElementById('sec').innerHTML = secs;
            }
            // 每秒更新一次倒數計時器
            const interval = setInterval(updateCountdown, 1000);

            updateCountdown();
          })
        } else {
          console.log("bannerData 為空值");
        }
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

function bannerRender(bannerData) {
  return new Promise((resolve, reject) => {
    const promises = bannerData.map((item) => {
      let restaurantId = item.restaurantId;
      let newBannerData = item;
      // console.log(newBannerData,"newBannerData");
      
      // 取得 店家資訊
      return axios
        .get(
          `https://teatimeapi-test.onrender.com/restaurants?id=${restaurantId}`
        )
        .then((res1) => {
          // console.log(res1);
          const { summary, storeBannerPhoto, UID, storeName, category } = res1.data[0];
          newBannerData.restaurantName = storeName;
          newBannerData.category = category;
          newBannerData.summary = summary;
          newBannerData.storeBannerPhoto = storeBannerPhoto;
          newBannerData.storeUID = UID;
          // console.log(UID);
          // console.log(newBannerData);
          return axios.get(
            `https://teatimeapi-test.onrender.com/ratings?_sort=reviewDateTime&_order=desc&restaurantUID=${UID}&_limit=3`
          );
        })
        .then((res2) => {
          // console.log(res2.data);
          newBannerData.reviewedRestaurant = res2.data;
          // console.log(newBannerData);
          if(newBannerData.category != "飲料"){
            // newBannerData = '';
          }
          return newBannerData;
        })
        .catch((error) => {
          throw error;
        });
    });

    Promise.all(promises)
      .then((completedData) => {
        // console.log(completedData);
        resolve(completedData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function bannerEvaluate(reviewedRestaurant){
  // reviewedRestaurant.length = 3;
  let template = '';

  if(reviewedRestaurant.length == 2){
    template += `<div class="d-none d-xl-flex p-24">`;
  }else if(reviewedRestaurant.length == 0){
    template += `<div class="d-none d-xl-flex p-24">`;
  }else{
    template += `<div class="d-none d-xl-flex justify-content-between p-24">`;
  }

  if(reviewedRestaurant.length == 0){
    template += `
          <div class="bg-white border-radius-16404016 w-100 h-100 text-center">
            <p class="fs-20 " style="padding-top:98px;padding-bottom:98px">此店家尚無評價</p>
          </div>
          `;
  }else{
    template += `
        <div class="swiper-comment bg-white p-24 border-radius-16161640">
          <div class="mb-12 d-flex align-items-center justify-content-between ">
            <div class="swiper-comment-personal d-flex align-items-center justify-content-center ">
              <img class="border-radius-20 me-16" src="${reviewedRestaurant[0].reviewerPhoto}" alt="user-img">
              <p class="fs-20 fs-md-16 fs-xxl-20 text-gray-02">${reviewedRestaurant[0].reviewer}</p>
            </div>
            <div class="swiper-comment-date">
              <time datetime="2023-08-03" class="text-gray-02">${reviewedRestaurant[0].reviewDateTime}</time>
            </div>
          </div>
          <div class="mb-12">${showStars(reviewedRestaurant[0].starRating)}</div>
          <p class="swiper-comment-p fs-20">${reviewedRestaurant[0].feedbackText}</p>
        </div>
      `;
      if(reviewedRestaurant.length == 2){
        template += `
            <div class="swiper-comment bg-white p-24 border-radius-16 ms-24">
            <div class="mb-12 d-flex align-items-center justify-content-between ">
              <div class="swiper-comment-personal d-flex align-items-center justify-content-center ">
                <img class="border-radius-20 me-16" src="${reviewedRestaurant[1].reviewerPhoto}"
                  alt="user-img">
                <p class="fs-20 fs-md-16 fs-xxl-20 text-gray-02">${reviewedRestaurant[1].reviewer}</p>
              </div>
              <div class="swiper-comment-date">
                <time datetime="2023-08-03" class="text-gray-02">${reviewedRestaurant[1].reviewDateTime}</time>
              </div>
            </div>
            <div class="mb-12">${showStars(reviewedRestaurant[1].starRating)}</div>
            <p class="swiper-comment-p fs-20">${reviewedRestaurant[1].feedbackText}</p>
          </div>
          `;
      }else if(reviewedRestaurant.length == 3){
        template += `
            <div class="swiper-comment bg-white p-24 border-radius-16">
            <div class="mb-12 d-flex align-items-center justify-content-between ">
              <div class="swiper-comment-personal d-flex align-items-center justify-content-center ">
                <img class="border-radius-20 me-16" src="${reviewedRestaurant[1].reviewerPhoto}"
                  alt="user-img">
                <p class="fs-20 fs-md-16 fs-xxl-20 text-gray-02">${reviewedRestaurant[1].reviewer}</p>
              </div>
              <div class="swiper-comment-date">
                <time datetime="2023-08-03" class="text-gray-02">${reviewedRestaurant[1].reviewDateTime}</time>
              </div>
            </div>
            <div class="mb-12">${showStars(reviewedRestaurant[1].starRating)}</div>
            <p class="swiper-comment-p fs-20">${reviewedRestaurant[1].feedbackText}</p>
          </div>
          `;
        template += `
          <div class="swiper-comment bg-white p-24 border-radius-16164016">
          <div class="mb-12 d-flex align-items-center justify-content-between ">
            <div class="swiper-comment-personal d-flex align-items-center justify-content-center ">
              <img class="border-radius-20 me-16" src="${reviewedRestaurant[2].reviewerPhoto}"
                alt="user-img">
              <p class="fs-20 fs-md-16 fs-xxl-20 text-gray-02">${reviewedRestaurant[2].reviewer}</p>
            </div>
            <div class="swiper-comment-date">
            <time datetime="2023-08-03" class="text-gray-02">${reviewedRestaurant[2].reviewDateTime}</time>
            </div>
          </div>
          <div class="mb-12">${showStars(reviewedRestaurant[2].starRating)}</div>
          <p class="swiper-comment-p fs-20">${reviewedRestaurant[2].feedbackText}</p>
        </div>
          `;
        }
      }
    template += `</div>`;
    return template
}
