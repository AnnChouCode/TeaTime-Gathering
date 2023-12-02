import{b as Y}from"./main-18dd99f5.js";import{i as V}from"./notification-78aba570.js";import{s as D}from"./showStars-385adb56.js";import{a as m}from"./axios-3a76d256.js";import{i as P}from"./isPastEvent-33573b9d.js";import{s as f}from"./showDateTime-51bda516.js";console.clear();let T=[];const S=new Date;let M=`${S.getFullYear()}/${S.getMonth()+1}/${S.getDate()}`;R();function R(e){let n=`https://teatimeapi-test.onrender.com/groupings?deadlineDateTime_like=${M}&isGroup=true`;e==1&&(n="https://teatimeapi-test.onrender.com/groupings?&isGroup=true&_limit=4"),m.get(n).then(function(t){const r=t.data;if(r=="")R(1);else if(r.forEach((s,i)=>{const[o,c]=s.deadlineDateTime.split(" ");s.datePart=o,s.timePart=c,o==M?s.todayGroupings=!0:s.todayGroupings=!1,T.push(s)}),T!=""){let s="";const i=document.querySelector(".bannerName");q(T).then(o=>{s+=`
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
            `,s+=`
            <div class="swiper mySwiper">
            <div class="swiper-wrapper">
            `,o.forEach(a=>{s+=`
              <div class="swiper-slide">
                <div class="swiper-bg-Style swiper01 text-white p-12 px-md-40 py-md-24 border-radius-80804040 
                  d-flex justify-content-end flex-column flex-md-row justify-content-md-between align-items-md-end" style="
                  background: url(${a.storeBannerPhoto}) center center/cover, linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);">
                  <div class="swiper-bg-textcontent">
                    <h2 class="fs-28 fs-md-40 fw-bold custom-shadow mb-16">${a.restaurantName}</h2>
                    <p class="swiper-bg-p custom-shadow mb-12 mb-md-0 fs-md-24">${a.summary}</p>
                  </div>
                  <button data-uid="${a.storeUID}" 
                    class="order-btn fs-20 fw-medium text-white border-radius-40 px-24 py-12 bg-brand-03 border-0">點餐去</button>
                </div>
                <div class="d-none d-xl-flex justify-content-between p-24">
                  <div class="swiper-comment bg-white p-24 border-radius-16161640">
                    <div class="mb-12 d-flex align-items-center justify-content-between ">
                      <div class="swiper-comment-personal d-flex align-items-center justify-content-center ">
                        <img class="border-radius-20 me-16" src="${a.reviewedRestaurant[0].reviewerPhoto}" alt="user-img">
                        <p class="fs-20 fs-md-16 fs-xxl-20 text-gray-02">${a.reviewedRestaurant[0].reviewer}</p>
                      </div>
                      <div class="swiper-comment-date">
                        <time datetime="2023-08-03" class="text-gray-02">${a.reviewedRestaurant[0].reviewDateTime}</time>
                      </div>
                    </div>
                    <div class="mb-12">${D(a.reviewedRestaurant[0].starRating)}</div>
                    <p class="swiper-comment-p fs-20">${a.reviewedRestaurant[0].feedbackText}</p>
                  </div>
                  <div class="swiper-comment bg-white p-24 border-radius-16">
                    <div class="mb-12 d-flex align-items-center justify-content-between ">
                      <div class="swiper-comment-personal d-flex align-items-center justify-content-center ">
                        <img class="border-radius-20 me-16" src="${a.reviewedRestaurant[1].reviewerPhoto}"
                          alt="user-img">
                        <p class="fs-20 fs-md-16 fs-xxl-20 text-gray-02">${a.reviewedRestaurant[1].reviewer}</p>
                      </div>
                      <div class="swiper-comment-date">
                        <time datetime="2023-08-03" class="text-gray-02">${a.reviewedRestaurant[1].reviewDateTime}</time>
                      </div>
                    </div>
                    <div class="mb-12">${D(a.reviewedRestaurant[1].starRating)}</div>
                    <p class="swiper-comment-p fs-20">${a.reviewedRestaurant[1].feedbackText}</p>
                  </div>
                  <div class="swiper-comment bg-white p-24 border-radius-16164016">
                    <div class="mb-12 d-flex align-items-center justify-content-between ">
                      <div class="swiper-comment-personal d-flex align-items-center justify-content-center ">
                        <img class="border-radius-20 me-16" src="${a.reviewedRestaurant[2].reviewerPhoto}"
                          alt="user-img">
                        <p class="fs-20 fs-md-16 fs-xxl-20 text-gray-02">${a.reviewedRestaurant[1].reviewer}</p>
                      </div>
                      <div class="swiper-comment-date">
                      <time datetime="2023-08-03" class="text-gray-02">${a.reviewedRestaurant[2].reviewDateTime}</time>
                      </div>
                    </div>
                    <div class="mb-12">${D(a.reviewedRestaurant[2].starRating)}</div>
                    <p class="swiper-comment-p fs-20">${a.reviewedRestaurant[2].feedbackText}</p>
                  </div>
                </div>
              </div>
              `}),s+=`
            </div>
            </div>
            <div class="swiper-button-next pictures-replace-text d-none d-xl-block"></div>
            <div class="swiper-button-prev pictures-replace-text d-none d-xl-block"></div>
            <div class="swiper-pagination position-absolute top-100 start-50 translate-middle"></div>
            `,i.innerHTML=s,new Swiper(".mySwiper",{loop:!0,clickable:!0,pagination:{el:".swiper-pagination",clickable:!0,renderBullet:function(a,d){return'<span class="'+d+'"></span>'}},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),document.querySelectorAll(".order-btn").forEach(function(a){let d=a.dataset.uid;a.addEventListener("click",function(){window.location.href=`store-order.html?UID=${d}`})});const h=new Date("2023-12-31 23:59").getTime();function b(){const a=new Date().getTime(),d=h-a,w=Math.floor(d%(1e3*60*60*24)/(1e3*60*60)),y=Math.floor(d%(1e3*60*60)/(1e3*60)),x=Math.floor(d%(1e3*60)/1e3);w<10?document.getElementById("hour").innerHTML="0"+w:document.getElementById("hour").innerHTML=w,y<10?document.getElementById("min").innerHTML="0"+y:document.getElementById("min").innerHTML=y,x<10?document.getElementById("sec").innerHTML="0"+x:document.getElementById("sec").innerHTML=x}setInterval(b,1e3),b()})}else console.log("bannerData 為空值")}).catch(function(t){console.log(t)})}function q(e){return new Promise((n,t)=>{const r=e.map(s=>{let i=s.restaurantName,o=s;return m.get(`https://teatimeapi-test.onrender.com/restaurants?storeName=${i}`).then(c=>{const{summary:h,storeBannerPhoto:b,UID:a}=c.data[0];return o.summary=h,o.storeBannerPhoto=b,o.storeUID=a,m.get(`https://teatimeapi-test.onrender.com/ratings?_sort=reviewDateTime&_order=desc&reviewedRestaurant=${i}&_limit=3`)}).then(c=>(o.reviewedRestaurant=c.data,o)).catch(c=>{throw c})});Promise.all(r).then(s=>{n(s)}).catch(s=>{t(s)})})}const v="https://teatimeapi-test.onrender.com",j=localStorage.getItem("token"),I="U004";let u=[];function H(){const e=moment().add(2,"month").format("YYYY/MM"),t=`deadlineDateTime_gte=${moment().subtract(1,"month").format("YYYY/MM")}&deadlineDateTime_lte=${e}`,r=m.get(`${v}/groupings?_expand=restaurant&${t}`),s=m.get(`${v}/votings?_expand=restaurant&${t}`);Promise.all([r,s]).then(function(i){u=u.concat(i[0].data),u=u.concat(i[1].data),N()}).catch(function(i){console.error(i.message)})}H();const g={};function N(){u.sort((e,n)=>{const t=new Date(e.deadlineDateTime),r=new Date(n.deadlineDateTime);return t-r}),u.forEach(e=>{g[e.UID]||(g[e.UID]={UID:e.UID,restaurantId:e.restaurantId,deadlineDateTime:e.deadlineDateTime,eventDateTime:e.eventDateTime,initiator:e.initiator,invitees:e.invitees,restaurantList:e.UID.startsWith("V")?[]:[e.restaurant.storeName],restaurantPhoto:e.restaurant.storeCover}),e.UID.startsWith("V")&&g[e.UID].restaurantList.push(e.restaurantName)}),U()}const A=document.querySelectorAll(".btnfilterEvent"),G=document.querySelector(".calendarBlock");A.forEach(e=>{e.addEventListener("click",function(){const n=this.getAttribute("data-event");U(n)})});function U(e="groupings"){const n=Object.values(g).filter(s=>s.UID.startsWith(e[0].toUpperCase())),t=n.filter(s=>{const i=moment(s.deadlineDateTime,"YYYY/MM/DD HH:mm");return moment().isBefore(i)});let r;t.length>=4?r=t.slice(0,4):r=n.slice(n.length-4,n.length),W(r)}function W(e){let n="";e.forEach(t=>{n+=`<div class="col-md-6 col-xl-4 col-xxxl-3">
                <a ${z(t.UID)}
                    class="event-rounded h-100 w-100 d-flex flex-lg-column p-12 p-lg-16 align-items-center justify-content-center bg-white border-hover-line"
                    data-aos="flip-left" data-aos="flip-left" data-aos-delay="400">
                    <img class="event-pic me-12 me-lg-0 mb-lg-20"
                        src="${t.restaurantPhoto}"
                        alt="calendar-img">
                    <div class="d-flex flex-column justify-content-between w-60 w-lg-100 flex-grow-1">
                        <p class="mb-8 mb-lg-16 fs-20 fs-lg-24 fw-bold lh-sm text-brand-03 single-ellipsis">${t.restaurantList.join("、")}</p>
                        <div class="d-flex justify-content-between align-items-center mb-8 mb-lg-16">
                            <p class="fs-16 fs-lg-20 text-gray-05">${t.UID.startsWith("V")?"投票中":"開團中"}</p>
                            ${F(t.deadlineDateTime)}
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="fs-16 fs-lg-20 text-gray-05">請客人</p>
                            <span class="fs-16 fs-lg-20 lh-sm fw-medium">${t.invitees?t.invitees:"無"}</span>
                        </div>
                    </div>
                </a>
            </div>`}),G.innerHTML=n}function F(e){let n;return P(e)?n="<div class='fw-medium lh-sm fs-16 fs-lg-20'>已結束</div>":n=`<div class="d-flex align-items-center ms-8 gap-md-8 gap-4">
                                    <iconify-icon icon="solar:calendar-linear" style="color: #1e1e1e;" width="26"
                                        height="26"></iconify-icon>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${f(e)[0]}</time>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${f(e)[1]}</time>
                                </div>`,n}function z(e){return e.startsWith("V")?`href="#modal-VotingModal" data-bs-toggle="modal" data-bs-votingUID="${e}"`:`href="store-order.html?UID=${e}"`}const l=document.getElementById("modal-VotingModal");function _(e){let n=[];m.get(`${v}/votings?UID=${e}&_expand=restaurant`).then(function(t){n=t.data,J(n)}).catch(function(t){console.error(t)})}l.addEventListener("show.bs.modal",function(e){const t=e.relatedTarget.getAttribute("data-bs-votingUID");O(t),_(t)});function O(e){const n=l.querySelector(".modal-title");n.textContent=g[e].restaurantList.join("、");const t=l.querySelector(".deadlineDateTime"),r=l.querySelector(".eventDateTime"),s=l.querySelector(".initiator"),i=l.querySelector(".invitees"),o=g[e];t.innerHTML=`<span class="me-16">截止日期</span>
    <span class="me-8 ">${f(o.deadlineDateTime)[0]}</span>
    <span>${f(o.deadlineDateTime)[1]}</span>`,r.innerHTML=`<span class="me-16">享用時間</span>
    <span class="me-8">${f(o.eventDateTime)[0]}</span>
    <span>${f(o.eventDateTime)[1]}</span>`,s.textContent=o.initiator,i.textContent=o.invitees===""?"無":o.invitees}function J(e){const n=l.querySelector(".votingCard"),t=P(e[0].deadlineDateTime);let r="";e.forEach(s=>{const i=s.currentVoters.includes(I),o=s.currentVoters.length,c=s.restaurant.minGroupSize;r+=`
    <li class="d-flex gap-12 p-12 mb-12 border border-brand-03 border-radius-40401616">
        <img class="border-radius-32321616 votingcard-photo" src="${s.restaurant.storeCover}">
            <div class="flex-grow-1 d-flex flex-column">
                <h4 class="mb-8 fs-16 fs-md-20 lh-sm text-brand-03">${s.restaurantName}</h4>
                <p class="flex-grow-1 mb-8 mb-md-16 text-gray-02 trippleline-ellipsis">${s.restaurant.summary}</p>
                <div class="d-flex justify-content-between flex-column flex-lg-row">
                    <div class="d-flex align-items-center mb-8 mb-lg-0 ">
                        <span class="me-4 me-lg-16 text-gray-02 text-nowrap">成團目標</span>
                        <div class="ts-progress is-tiny bg-gray-04 voting-progress" data-num="${s.id}">
                            <div class="bar bg-brand-02" style="--value: ${E(o,c)}">
                                <div class="text-white">${E(o,c)>100?100:E(o,c)}%</div>
                            </div>
                        </div>
                    </div>
                    ${K(s.id,t,i)}
                </div>
            </li>`}),n.innerHTML=r,Q()}function E(e,n){return Math.floor(e/n*100)}function K(e,n,t){return n?'<button class="py-4 px-16 btn-disable border-0 rounded-pill btnVoteThis" disabled type="button">已結束</button>':V(j)?`<button
                class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis ${t?" btn-active-brand-02":""}"
            type="button" data-num=${e}>${t?"已投票":"投票"}</button>`:`<button
                      class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02"
                      type="button" data-num=${e} data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="請先登入帳號">投票</button>`}function Q(){V(j)||[...document.querySelectorAll('[data-bs-toggle="popover"]')].map(t=>{new Y.Popover(t)}),l.querySelectorAll(".btnVoteThis").forEach(n=>{n.addEventListener("click",function(){n.classList.contains("btn-active-brand-02")?k(n.dataset.num,"deleteVote"):k(n.dataset.num,"addVote")})})}async function k(e,n){try{const t=document.querySelector(`.ts-progress[data-num="${e}"]`);t.classList.add("is-processing");const r=u.filter(s=>s.UID.startsWith("V")&&s.id==e)[0].currentVoters;if(n==="addVote")r.push(`${I}`);else{const s=r.indexOf(`${I}`);r.splice(s,1)}m.patch(`${v}/votings/${e}`,{currentVoters:r}).then(function(s){_(s.data.UID),t.classList.remove("is-processing")}).catch(function(s){console.error(s.message)})}catch(t){throw console.log("錯誤:",t),t}}$(".btnfilterEvent").click(function(e){$(".btnfilterEvent").toggleClass("btn-active-brand-02")});const X="https://teatimeapi-test.onrender.com";moment().format("YYYY/MM/DD");let p={category:"全部",sort:"",search:""};const Z={newestStore:"&_sort=id&_order=desc",bestStore:"&_sort=stars&_order=desc",worstStore:"&_sort=stars&_order=asc"};function B(e,n,t){let r="",s="",i="";e!=="全部"&&e&&(r=`category=${e}`),n&&(s=n),t&&(i=`&storeName_like=${t}`);let o=`${X}/restaurants?${r}${s}${i}`;console.log(o+"測試"),te(o)}B();const ee=document.querySelectorAll(".btnSortStore");ee.forEach(e=>{e.addEventListener("click",function(){const n=this.getAttribute("data-sort-value");C("sort",n)})});const L=document.querySelectorAll(".btnCategoryStore");L.forEach(e=>{e.addEventListener("click",function(){const n=this.getAttribute("data-category-value");L.forEach(t=>{t.classList.remove("actived")}),C("category",n),e.classList.add("actived")})});function C(e,n){switch(e){case"category":p[e]=n;break;case"search":p[e]=n.trim();break;default:p[e]=Z[n];break}B(p.category,p.sort,p.search)}function te(e){$(function(){(function(n){let t=$("#pagination"+n);$.ajax({url:e,success:function(r){ne(r,t)},error:function(r){console.error(r)}})})("Pages")})}function ne(e,n){n.pagination({dataSource:e,totalNumber:e.length,pageSize:8,showPageNumbers:!0,showPrevious:!0,showNext:!0,callback:function(t){se(t)}})}function se(e){const n={飲料:"icon-park-outline:drink",速食:"mdi:food-outline",素食:"tabler:leaf",小吃:"ph:bowl-food",甜點:"material-symbols:icecream-outline-rounded",咖啡:"icon-park-outline:tea-drink"};let t='<ul class="row row-cols-2 gap-12 gap-xxl-24 findStore-ul">';e.forEach((r,s)=>{t+=`
                            <li class="findStore-img position-relative" style="background-image: url(${r.storeCover});">
                                <a href="store-order.html?UID=${r.UID}" class="d-flex justify-content-center w-100 h-100 ">
                                    <!-- restaurant info -->
                                    <div class="position-absolute d-flex justify-content-between findStore-card">
                                        <div class="d-flex flex-column justify-content-center overflow-hidden">
                                            <p class="mb-8 fs-md-20 fs-16 lh-sm text-white" style="white-space:nowrap">${r.storeName}</p>
                                            <!-- 星評 -->
                                            <div class="d-flex ">
                                                ${re(r.stars)}
                                            </div>
                                        </div>
                                        <!-- restaurant sort -->
                                        <iconify-icon icon="${n[r.category]}"
                                            style="color: #8b8b8a;" width="24" height="24"
                                            class="ms-4 findStore-card-img"></iconify-icon>
                                    </div>
                                </a>
                            </li>
                            `}),t+="</ul>",document.querySelector("#paginationContainer").innerHTML=t}function re(e){const t={isGoodStar:`<iconify-icon icon="ic:round-star" style="color: #ffd43a;"
                            width="16"></iconify-icon>`,notGoodStar:`<iconify-icon icon="ic:round-star" style="color: #c2c1bd;"
                            width="16"></iconify-icon>`};return t.isGoodStar.repeat(e)+t.notGoodStar.repeat(5-e)}
