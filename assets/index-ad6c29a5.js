import{b as H}from"./main-f70f762a.js";import{i as B}from"./notification-2a8e3c71.js";import{s as y}from"./showStars-385adb56.js";import{a as u}from"./axios-3a76d256.js";import{i as C}from"./isPastEvent-33573b9d.js";import{s as f}from"./showDateTime-51bda516.js";console.clear();let S=[];const E=new Date;let L=`${E.getFullYear()}/${E.getMonth()+1}/${E.getDate()}`;U();function U(e){let t=`https://teatimeapi-test.onrender.com/groupings?deadlineDateTime_like=${L}&isGroup=true`;e==1&&(t="https://teatimeapi-test.onrender.com/groupings?&isGroup=true&_limit=4"),u.get(t).then(function(n){const r=n.data;if(r=="")U(1);else if(r.forEach((s,a)=>{const[o,l]=s.deadlineDateTime.split(" ");s.datePart=o,s.timePart=l,o==L?s.todayGroupings=!0:s.todayGroupings=!1,S.push(s)}),S!=""){let s="";const a=document.querySelector(".bannerName");G(S).then(o=>{s+=`
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
            `,o.forEach(i=>{s+=`
              <div class="swiper-slide">
                <div class="swiper-bg-Style swiper01 text-white p-12 px-md-40 py-md-24 border-radius-80804040 
                  d-flex justify-content-end flex-column flex-md-row justify-content-md-between align-items-md-end" style="
                  background: url(${i.storeBannerPhoto}) center center/cover, linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);">
                  <div class="swiper-bg-textcontent">
                    <h2 class="fs-28 fs-md-40 fw-bold custom-shadow mb-16">${i.restaurantName}</h2>
                    <p class="swiper-bg-p custom-shadow mb-12 mb-md-0 fs-md-24">${i.summary}</p>
                  </div>
                  <button data-uid="${i.storeUID}" 
                    class="order-btn fs-20 fw-medium text-white border-radius-40 px-24 py-12 bg-brand-03 border-0">點餐去
                  </button>
                </div>
                ${W(i.reviewedRestaurant)}
              </div>
              `}),s+=`
            </div>
            </div>
            <div class="swiper-button-next pictures-replace-text d-none d-xl-block"></div>
            <div class="swiper-button-prev pictures-replace-text d-none d-xl-block"></div>
            <div class="swiper-pagination position-absolute top-100 start-50 translate-middle"></div>
            `,a.innerHTML=s,new Swiper(".mySwiper",{loop:!0,clickable:!0,pagination:{el:".swiper-pagination",clickable:!0,renderBullet:function(i,c){return'<span class="'+c+'"></span>'}},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),document.querySelectorAll(".order-btn").forEach(function(i){let c=i.dataset.uid;i.addEventListener("click",function(){window.location.href=`store-order.html?UID=${c}`})});const w=new Date("2023-12-31 23:59").getTime();function h(){const i=new Date().getTime(),c=w-i,b=Math.floor(c%(1e3*60*60*24)/(1e3*60*60)),D=Math.floor(c%(1e3*60*60)/(1e3*60)),T=Math.floor(c%(1e3*60)/1e3);b<10?document.getElementById("hour").innerHTML="0"+b:document.getElementById("hour").innerHTML=b,D<10?document.getElementById("min").innerHTML="0"+D:document.getElementById("min").innerHTML=D,T<10?document.getElementById("sec").innerHTML="0"+T:document.getElementById("sec").innerHTML=T}setInterval(h,1e3),h()})}else console.log("bannerData 為空值")}).catch(function(n){console.log(n)})}function G(e){return new Promise((t,n)=>{const r=e.map(s=>{let a=s.restaurantId,o=s;return u.get(`https://teatimeapi-test.onrender.com/restaurants?id=${a}`).then(l=>{const{summary:w,storeBannerPhoto:h,UID:i,storeName:c,category:b}=l.data[0];return o.restaurantName=c,o.category=b,o.summary=w,o.storeBannerPhoto=h,o.storeUID=i,u.get(`https://teatimeapi-test.onrender.com/ratings?_sort=reviewDateTime&_order=desc&restaurantUID=${i}&_limit=3`)}).then(l=>(o.reviewedRestaurant=l.data,o.category!="飲料",o)).catch(l=>{throw l})});Promise.all(r).then(s=>{console.log(s),t(s)}).catch(s=>{n(s)})})}function W(e){let t="";return e.length==2||e.length==0?t+='<div class="d-none d-xl-flex p-24">':t+='<div class="d-none d-xl-flex justify-content-between p-24">',e.length==0?t+=`
          <div class="bg-white border-radius-16404016 w-100 h-100 text-center">
            <p class="fs-20 " style="padding-top:98px;padding-bottom:98px">此店家尚無評價</p>
          </div>
          `:(t+=`
        <div class="swiper-comment bg-white p-24 border-radius-16161640">
          <div class="mb-12 d-flex align-items-center justify-content-between ">
            <div class="swiper-comment-personal d-flex align-items-center justify-content-center ">
              <img class="border-radius-20 me-16" src="${e[0].reviewerPhoto}" alt="user-img">
              <p class="fs-20 fs-md-16 fs-xxl-20 text-gray-02">${e[0].reviewer}</p>
            </div>
            <div class="swiper-comment-date">
              <time datetime="2023-08-03" class="text-gray-02">${e[0].reviewDateTime}</time>
            </div>
          </div>
          <div class="mb-12">${y(e[0].starRating)}</div>
          <p class="swiper-comment-p fs-20">${e[0].feedbackText}</p>
        </div>
      `,e.length==2?t+=`
            <div class="swiper-comment bg-white p-24 border-radius-16 ms-24">
            <div class="mb-12 d-flex align-items-center justify-content-between ">
              <div class="swiper-comment-personal d-flex align-items-center justify-content-center ">
                <img class="border-radius-20 me-16" src="${e[1].reviewerPhoto}"
                  alt="user-img">
                <p class="fs-20 fs-md-16 fs-xxl-20 text-gray-02">${e[1].reviewer}</p>
              </div>
              <div class="swiper-comment-date">
                <time datetime="2023-08-03" class="text-gray-02">${e[1].reviewDateTime}</time>
              </div>
            </div>
            <div class="mb-12">${y(e[1].starRating)}</div>
            <p class="swiper-comment-p fs-20">${e[1].feedbackText}</p>
          </div>
          `:e.length==3&&(t+=`
            <div class="swiper-comment bg-white p-24 border-radius-16">
            <div class="mb-12 d-flex align-items-center justify-content-between ">
              <div class="swiper-comment-personal d-flex align-items-center justify-content-center ">
                <img class="border-radius-20 me-16" src="${e[1].reviewerPhoto}"
                  alt="user-img">
                <p class="fs-20 fs-md-16 fs-xxl-20 text-gray-02">${e[1].reviewer}</p>
              </div>
              <div class="swiper-comment-date">
                <time datetime="2023-08-03" class="text-gray-02">${e[1].reviewDateTime}</time>
              </div>
            </div>
            <div class="mb-12">${y(e[1].starRating)}</div>
            <p class="swiper-comment-p fs-20">${e[1].feedbackText}</p>
          </div>
          `,t+=`
          <div class="swiper-comment bg-white p-24 border-radius-16164016">
          <div class="mb-12 d-flex align-items-center justify-content-between ">
            <div class="swiper-comment-personal d-flex align-items-center justify-content-center ">
              <img class="border-radius-20 me-16" src="${e[2].reviewerPhoto}"
                alt="user-img">
              <p class="fs-20 fs-md-16 fs-xxl-20 text-gray-02">${e[2].reviewer}</p>
            </div>
            <div class="swiper-comment-date">
            <time datetime="2023-08-03" class="text-gray-02">${e[2].reviewDateTime}</time>
            </div>
          </div>
          <div class="mb-12">${y(e[2].starRating)}</div>
          <p class="swiper-comment-p fs-20">${e[2].feedbackText}</p>
        </div>
          `)),t+="</div>",t}const x="https://teatimeapi-test.onrender.com",_=localStorage.getItem("token"),k="U004";let m=[];function F(){const e=moment().add(2,"month").format("YYYY/MM"),n=`deadlineDateTime_gte=${moment().subtract(1,"month").format("YYYY/MM")}&deadlineDateTime_lte=${e}`,r=u.get(`${x}/groupings?_expand=restaurant&${n}`),s=u.get(`${x}/votings?_expand=restaurant&${n}`);Promise.all([r,s]).then(function(a){m=m.concat(a[0].data),m=m.concat(a[1].data),z()}).catch(function(a){console.error(a.message)})}F();const g={};function z(){m.sort((e,t)=>{const n=new Date(e.deadlineDateTime),r=new Date(t.deadlineDateTime);return n-r}),m.forEach(e=>{g[e.UID]||(g[e.UID]={UID:e.UID,restaurantId:e.restaurantId,deadlineDateTime:e.deadlineDateTime,eventDateTime:e.eventDateTime,initiator:e.initiator,invitees:e.invitees,restaurantList:e.UID.startsWith("V")?[]:[e.restaurant.storeName],restaurantPhoto:e.restaurant.storeCover}),e.UID.startsWith("V")&&g[e.UID].restaurantList.push(e.restaurantName)}),q()}const O=document.querySelectorAll(".btnfilterEvent"),J=document.querySelector(".calendarBlock");O.forEach(e=>{e.addEventListener("click",function(){const t=this.getAttribute("data-event");q(t)})});function q(e="groupings"){const t=Object.values(g).filter(s=>s.UID.startsWith(e[0].toUpperCase())),n=t.filter(s=>{const a=moment(s.deadlineDateTime,"YYYY/MM/DD HH:mm");return moment().isBefore(a)});let r;n.length>=4?r=n.slice(0,4):r=t.slice(t.length-4,t.length),K(r)}function K(e){let t="";e.forEach(n=>{t+=`<div class="col-md-6 col-xl-4 col-xxxl-3">
                <a ${X(n.UID)}
                    class="event-rounded h-100 w-100 d-flex flex-lg-column p-12 p-lg-16 align-items-center justify-content-center bg-white border-hover-line"
                    data-aos="flip-left" data-aos="flip-left" data-aos-delay="400">
                    <img class="event-pic me-12 me-lg-0 mb-lg-20"
                        src="${n.restaurantPhoto}"
                        alt="calendar-img">
                    <div class="d-flex flex-column justify-content-between w-60 w-lg-100 flex-grow-1">
                        <p class="mb-8 mb-lg-16 fs-20 fs-lg-24 fw-bold lh-sm text-brand-03 single-ellipsis">${n.restaurantList.join("、")}</p>
                        <div class="d-flex justify-content-between align-items-center mb-8 mb-lg-16">
                            <p class="fs-16 fs-lg-20 text-gray-05">${n.UID.startsWith("V")?"投票中":"開團中"}</p>
                            ${Q(n.deadlineDateTime)}
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="fs-16 fs-lg-20 text-gray-05">請客人</p>
                            <span class="fs-16 fs-lg-20 lh-sm fw-medium">${n.invitees?n.invitees:"無"}</span>
                        </div>
                    </div>
                </a>
            </div>`}),J.innerHTML=t}function Q(e){let t;return C(e)?t="<div class='fw-medium lh-sm fs-16 fs-lg-20'>已結束</div>":t=`<div class="d-flex align-items-center ms-8 gap-md-8 gap-4">
                                    <iconify-icon icon="solar:calendar-linear" style="color: #1e1e1e;" width="26"
                                        height="26"></iconify-icon>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${f(e)[0]}</time>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${f(e)[1]}</time>
                                </div>`,t}function X(e){return e.startsWith("V")?`href="#modal-VotingModal" data-bs-toggle="modal" data-bs-votingUID="${e}"`:`href="store-order.html?UID=${e}"`}const d=document.getElementById("modal-VotingModal");function N(e){let t=[];u.get(`${x}/votings?UID=${e}&_expand=restaurant`).then(function(n){t=n.data,R(t)}).catch(function(n){console.error(n.message)})}d.addEventListener("show.bs.modal",function(e){const n=e.relatedTarget.getAttribute("data-bs-votingUID");Z(n),N(n)});function Z(e){const t=d.querySelector(".modal-title");t.textContent=g[e].restaurantList.join("、");const n=d.querySelector(".deadlineDateTime"),r=d.querySelector(".eventDateTime"),s=d.querySelector(".initiator"),a=d.querySelector(".invitees"),o=g[e];n.innerHTML=`<span class="me-16">截止日期</span>
    <span class="me-8 ">${f(o.deadlineDateTime)[0]}</span>
    <span>${f(o.deadlineDateTime)[1]}</span>`,r.innerHTML=`<span class="me-16">享用時間</span>
    <span class="me-8">${f(o.eventDateTime)[0]}</span>
    <span>${f(o.eventDateTime)[1]}</span>`,s.textContent=o.initiator,a.textContent=o.invitees===""?"無":o.invitees}function R(e){const t=d.querySelector(".votingCard"),n=C(e[0].deadlineDateTime);let r="";e.forEach(s=>{const a=s.currentVoters.includes(k),o=s.currentVoters.length,l=s.restaurant.minGroupSize;r+=`
    <li class="d-flex gap-12 p-12 mb-12 border border-brand-03 border-radius-40401616">
        <img class="border-radius-32321616 votingcard-photo" src="${s.restaurant.storeCover}">
            <div class="flex-grow-1 d-flex flex-column">
                <h4 class="mb-8 fs-16 fs-md-20 lh-sm text-brand-03">${s.restaurantName}</h4>
                <p class="flex-grow-1 mb-8 mb-md-16 text-gray-02 trippleline-ellipsis">${s.restaurant.summary}</p>
                <div class="d-flex justify-content-between flex-column flex-lg-row">
                    <div class="d-flex align-items-center mb-8 mb-lg-0 ">
                        <span class="me-4 me-lg-16 text-gray-02 text-nowrap">成團目標</span>
                        <div class="ts-progress is-tiny bg-gray-04 voting-progress" data-num="${s.id}">
                            <div class="bar bg-brand-02" style="--value: ${I(o,l)}">
                                <div class="text-white">${I(o,l)>100?100:I(o,l)}%</div>
                            </div>
                        </div>
                    </div>
                    ${ee(s.id,n,a)}
                </div>
            </li>`}),t.innerHTML=r,te()}function I(e,t){return Math.floor(e/t*100)}function ee(e,t,n){return t?'<button class="py-4 px-16 btn-disable border-0 rounded-pill btnVoteThis" disabled type="button">已結束</button>':B(_)?`<button
                class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis ${n?" btn-active-brand-02":""}"
            type="button" data-num=${e}>${n?"已投票":"投票"}</button>`:`<button
                      class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02"
                      type="button" data-num=${e} data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="請先登入帳號">投票</button>`}function te(){B(_)||[...document.querySelectorAll('[data-bs-toggle="popover"]')].map(n=>{new H.Popover(n)}),d.querySelectorAll(".btnVoteThis").forEach(t=>{t.addEventListener("click",function(){t.classList.contains("btn-active-brand-02")?M(t.dataset.num,"deleteVote"):M(t.dataset.num,"addVote")})})}async function M(e,t){try{const n=document.querySelector(`.ts-progress[data-num="${e}"]`);n.classList.add("is-processing");const r=m.filter(s=>s.UID.startsWith("V")&&s.id==e)[0].currentVoters;if(t==="addVote")r.push(`${k}`);else{const s=r.indexOf(`${k}`);r.splice(s,1)}u.patch(`${x}/votings/${e}`,{currentVoters:r}).then(function(s){N(s.data.UID),n.classList.remove("is-processing")}).catch(function(s){console.error(s.message)})}catch(n){throw console.log("錯誤:",n),n}}$(".btnfilterEvent").click(function(e){$(".btnfilterEvent").toggleClass("btn-active-brand-02")});let V=document.querySelectorAll(".select-bar-link");V.forEach(e=>{e.addEventListener("click",()=>{V.forEach(t=>{t.classList.remove("btn-active-brand-02")}),e.classList.add("btn-active-brand-02")})});const Y="https://teatimeapi-test.onrender.com";moment().format("YYYY/MM/DD");let p={category:"全部",sort:"",search:""};const ne={newestStore:"&_sort=id&_order=desc",bestStore:"&_sort=stars&_order=desc",worstStore:"&_sort=stars&_order=asc"};function A(e,t,n){let r="",s="",a="";e!=="全部"&&e&&(r=`category=${e}`),t&&(s=t),n&&(a=`&storeName_like=${n}`);let o=`${Y}/restaurants?${r}${s}${a}`;console.log(o),re(o)}A();const se=document.querySelectorAll(".btnSortStore");se.forEach(e=>{e.addEventListener("click",function(){const t=this.getAttribute("data-sort-value");v("sort",t)})});const P=document.querySelectorAll(".btnCategoryStore");P.forEach(e=>{e.addEventListener("click",function(){const t=this.getAttribute("data-category-value");P.forEach(n=>{n.classList.remove("actived")}),v("category",t),e.classList.add("actived")})});function v(e,t){switch(e){case"category":p[e]=t;break;case"search":p[e]=t.trim();break;default:p[e]=ne[t];break}A(p.category,p.sort,p.search)}function re(e){$(function(){(function(t){let n=$("#pagination"+t);$.ajax({url:e,success:function(r){oe(r,n)},error:function(r){console.error(r)}})})("Pages")})}function oe(e,t){t.pagination({dataSource:e,totalNumber:e.length,pageSize:8,showPageNumbers:!0,showPrevious:!0,showNext:!0,callback:function(n){ae(n)}})}function ae(e){const t={飲料:"icon-park-outline:drink",速食:"mdi:food-outline",素食:"tabler:leaf",小吃:"ph:bowl-food",甜點:"material-symbols:icecream-outline-rounded",咖啡:"icon-park-outline:tea-drink"};let n='<ul class="row row-cols-2 gap-12 gap-xxl-24 findStore-ul">';e.forEach((r,s)=>{n+=`
                        <li class="findStore-img position-relative px-0" style="background-image: url(${r.storeCover});">
                            <a href="store-order.html?UID=${r.UID}" class="d-flex justify-content-center w-100 h-100 ">
                                <!-- restaurant info -->
                                <div class="position-absolute d-flex justify-content-between findStore-card w-100">
                                    <div class="d-flex flex-column justify-content-center overflow-hidden">
                                        <p class="mb-8 fs-md-20 fs-16 lh-sm text-white" style="white-space:nowrap">${r.storeName}</p>
                                        <!-- 星評 -->
                                        <div class="d-flex ">
                                            ${ie(r.stars)}
                                        </div>
                                    </div>
                                    <!-- restaurant sort -->
                                    <iconify-icon icon="${t[r.category]}"
                                        style="color: #8b8b8a;" width="24" height="24"
                                        class="ms-4 findStore-card-img"></iconify-icon>
                                </div>
                            </a>
                        </li>
                        `}),n+="</ul>",document.querySelector("#paginationContainer").innerHTML=n}function ie(e){const n={isGoodStar:`<iconify-icon icon="ic:round-star" style="color: #ffd43a;"
                        width="16"></iconify-icon>`,notGoodStar:`<iconify-icon icon="ic:round-star" style="color: #c2c1bd;"
                        width="16"></iconify-icon>`};return n.isGoodStar.repeat(e)+n.notGoodStar.repeat(5-e)}const j=new autoComplete({data:{src:async e=>{try{return await(await fetch(`${Y}/restaurants`)).json()}catch(t){return t}},keys:["storeName"]},searchEngine:"loose",resultItem:{highlight:!0},resultsList:{element:(e,t)=>{if(!t.results.length){const n=document.createElement("div");n.setAttribute("class","no_result px-8"),n.innerHTML=`<span>Found No Results for "${t.query}"</span>`,e.prepend(n)}},noResults:!0},events:{input:{selection:e=>{const t=e.detail.selection.value;j.input.value=t.storeName,v("search",t.storeName)},keydown:e=>{if(e.keyCode===13){const t=j.input.value;console.log(`這是 ${t}`),v("search",t)}}}}}),le=document.getElementById("autoComplete");le.addEventListener("input",function(e){v("search","")});
