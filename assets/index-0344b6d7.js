import{b as z}from"./main-2d6d9da0.js";import{i as q}from"./notification-aec14390.js";import{s as h}from"./showStars-385adb56.js";import{a as d}from"./axios-3a76d256.js";import{i as N}from"./isPastEvent-33573b9d.js";import{s as f}from"./showDateTime-51bda516.js";console.clear();let E=[];const k=new Date;let V=`${k.getFullYear()}/${k.getMonth()+1}/${k.getDate()}`;H();function H(e){let t=`https://teatimeapi-test.onrender.com/groupings?deadlineDateTime_like=${V}&isGroup=true`;e==1&&(t="https://teatimeapi-test.onrender.com/groupings?&isGroup=true&_limit=4"),d.get(t).then(function(s){const r=s.data;if(r=="")H(1);else if(r.forEach((n,o)=>{const[i,a]=n.deadlineDateTime.split(" ");n.datePart=i,n.timePart=a,i==V?n.todayGroupings=!0:n.todayGroupings=!1,E.push(n)}),E!=""){let n="";const o=document.querySelector(".bannerName");K(E).then(i=>{n+=`
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
            `,n+=`
            <div class="swiper mySwiper">
            <div class="swiper-wrapper">
            `,i.forEach(l=>{n+=`
              <div class="swiper-slide">
                <div class="swiper-bg-Style swiper01 text-white p-12 px-md-40 py-md-24 border-radius-80804040 
                  d-flex justify-content-end flex-column flex-md-row justify-content-md-between align-items-md-end" style="
                  background: url(${l.storeBannerPhoto}) center center/cover, linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);">
                  <div class="swiper-bg-textcontent">
                    <h2 class="fs-28 fs-md-40 fw-bold custom-shadow mb-16">${l.restaurantName}</h2>
                    <p class="swiper-bg-p custom-shadow mb-12 mb-md-0 fs-md-24">${l.summary}</p>
                  </div>
                  <button data-uid="${l.storeUID}" 
                    class="order-btn fs-20 fw-medium text-white border-radius-40 px-24 py-12 bg-brand-03 border-0">點餐去
                  </button>
                </div>
                ${Q(l.reviewedRestaurant)}
              </div>
              `}),n+=`
            </div>
            </div>
            <div class="swiper-button-next pictures-replace-text d-none d-xl-block"></div>
            <div class="swiper-button-prev pictures-replace-text d-none d-xl-block"></div>
            <div class="swiper-pagination position-absolute top-100 start-50 translate-middle"></div>
            `,o.innerHTML=n,new Swiper(".mySwiper",{loop:!0,clickable:!0,pagination:{el:".swiper-pagination",clickable:!0,renderBullet:function(l,c){return'<span class="'+c+'"></span>'}},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),document.querySelectorAll(".order-btn").forEach(function(l){let c=l.dataset.uid;l.addEventListener("click",function(){window.location.href=`store-order.html?UID=${c}`})});const b=new Date("2023-12-31 23:59").getTime();function x(){const l=new Date().getTime(),c=b-l,v=Math.floor(c%(1e3*60*60*24)/(1e3*60*60)),T=Math.floor(c%(1e3*60*60)/(1e3*60)),S=Math.floor(c%(1e3*60)/1e3);v<10?document.getElementById("hour").innerHTML="0"+v:document.getElementById("hour").innerHTML=v,T<10?document.getElementById("min").innerHTML="0"+T:document.getElementById("min").innerHTML=T,S<10?document.getElementById("sec").innerHTML="0"+S:document.getElementById("sec").innerHTML=S}setInterval(x,1e3),x()})}else console.log("bannerData 為空值")}).catch(function(s){console.log(s)})}function K(e){return new Promise((t,s)=>{const r=e.map(n=>{let o=n.restaurantId,i=n;return d.get(`https://teatimeapi-test.onrender.com/restaurants?id=${o}`).then(a=>{const{summary:b,storeBannerPhoto:x,UID:l,storeName:c,category:v}=a.data[0];return i.restaurantName=c,i.category=v,i.summary=b,i.storeBannerPhoto=x,i.storeUID=l,d.get(`https://teatimeapi-test.onrender.com/ratings?_sort=reviewDateTime&_order=desc&restaurantUID=${l}&_limit=3`)}).then(a=>(i.reviewedRestaurant=a.data,i.category!="飲料",i)).catch(a=>{throw a})});Promise.all(r).then(n=>{console.log(n),t(n)}).catch(n=>{s(n)})})}function Q(e){let t="";return e.length==2||e.length==0?t+='<div class="d-none d-xl-flex p-24">':t+='<div class="d-none d-xl-flex justify-content-between p-24">',e.length==0?t+=`
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
          <div class="mb-12">${h(e[0].starRating)}</div>
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
            <div class="mb-12">${h(e[1].starRating)}</div>
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
            <div class="mb-12">${h(e[1].starRating)}</div>
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
          <div class="mb-12">${h(e[2].starRating)}</div>
          <p class="swiper-comment-p fs-20">${e[2].feedbackText}</p>
        </div>
          `)),t+="</div>",t}const y="https://teatimeapi-test.onrender.com",Y=localStorage.getItem("token"),L="U004";let u=[];function X(){const e=moment().add(2,"month").format("YYYY/MM"),s=`deadlineDateTime_gte=${moment().subtract(1,"month").format("YYYY/MM")}&deadlineDateTime_lte=${e}`,r=d.get(`${y}/groupings?_expand=restaurant&${s}`),n=d.get(`${y}/votings?_expand=restaurant&${s}`);Promise.all([r,n]).then(function(o){u=u.concat(o[0].data),u=u.concat(o[1].data),Z()}).catch(function(o){console.error(o.message)})}X();const g={};function Z(){u.sort((e,t)=>{const s=new Date(e.deadlineDateTime),r=new Date(t.deadlineDateTime);return s-r}),u.forEach(e=>{g[e.UID]||(g[e.UID]={UID:e.UID,restaurantId:e.restaurantId,deadlineDateTime:e.deadlineDateTime,eventDateTime:e.eventDateTime,initiator:e.initiator,invitees:e.invitees,restaurantList:e.UID.startsWith("V")?[]:[e.restaurant.storeName],restaurantPhoto:e.restaurant.storeCover}),e.UID.startsWith("V")&&g[e.UID].restaurantList.push(e.restaurantName)}),A()}const R=document.querySelectorAll(".btnfilterEvent"),ee=document.querySelector(".calendarBlock");R.forEach(e=>{e.addEventListener("click",function(){const t=this.getAttribute("data-event");A(t)})});function A(e="groupings"){const t=Object.values(g).filter(n=>n.UID.startsWith(e[0].toUpperCase())),s=t.filter(n=>{const o=moment(n.deadlineDateTime,"YYYY/MM/DD HH:mm");return moment().isBefore(o)});let r;s.length>=4?r=s.slice(0,4):r=t.slice(t.length-4,t.length),te(r)}function te(e){let t="";e.forEach(s=>{t+=`<div class="col-md-6 col-xl-4 col-xxxl-3">
                <a ${ne(s.UID)}
                    class="event-rounded h-100 w-100 d-flex flex-lg-column p-12 p-lg-16 align-items-center justify-content-center bg-white border-hover-line"
                    data-aos="flip-left" data-aos="flip-left" data-aos-delay="400">
                    <img class="event-pic me-12 me-lg-0 mb-lg-20"
                        src="${s.restaurantPhoto}"
                        alt="calendar-img">
                    <div class="d-flex flex-column justify-content-between w-60 w-lg-100 flex-grow-1">
                        <p class="mb-8 mb-lg-16 fs-20 fs-lg-24 fw-bold lh-sm text-brand-03 single-ellipsis">${s.restaurantList.join("、")}</p>
                        <div class="d-flex justify-content-between align-items-center mb-8 mb-lg-16">
                            <p class="fs-16 fs-lg-20 text-gray-05">${s.UID.startsWith("V")?"投票中":"開團中"}</p>
                            ${se(s.deadlineDateTime)}
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="fs-16 fs-lg-20 text-gray-05">請客人</p>
                            <span class="fs-16 fs-lg-20 lh-sm fw-medium">${s.invitees?s.invitees:"無"}</span>
                        </div>
                    </div>
                </a>
            </div>`}),ee.innerHTML=t}function se(e){let t;return N(e)?t="<div class='fw-medium lh-sm fs-16 fs-lg-20'>已結束</div>":t=`<div class="d-flex align-items-center ms-8 gap-md-8 gap-4">
                                    <iconify-icon icon="solar:calendar-linear" style="color: #1e1e1e;" width="26"
                                        height="26"></iconify-icon>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${f(e)[0]}</time>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${f(e)[1]}</time>
                                </div>`,t}function ne(e){return e.startsWith("V")?`href="#modal-VotingModal" data-bs-toggle="modal" data-bs-votingUID="${e}"`:`href="store-order.html?UID=${e}"`}const m=document.getElementById("modal-VotingModal");function G(e){let t=[];d.get(`${y}/votings?UID=${e}&_expand=restaurant`).then(function(s){t=s.data,ie(t)}).catch(function(s){console.error(s.message)})}m.addEventListener("show.bs.modal",function(e){const s=e.relatedTarget.getAttribute("data-bs-votingUID");re(s),G(s)});function re(e){const t=m.querySelector(".modal-title");t.textContent=g[e].restaurantList.join("、");const s=m.querySelector(".deadlineDateTime"),r=m.querySelector(".eventDateTime"),n=m.querySelector(".initiator"),o=m.querySelector(".invitees"),i=g[e];s.innerHTML=`<span class="me-16">截止日期</span>
    <span class="me-8 ">${f(i.deadlineDateTime)[0]}</span>
    <span>${f(i.deadlineDateTime)[1]}</span>`,r.innerHTML=`<span class="me-16">享用時間</span>
    <span class="me-8">${f(i.eventDateTime)[0]}</span>
    <span>${f(i.eventDateTime)[1]}</span>`,n.textContent=i.initiator,o.textContent=i.invitees===""?"無":i.invitees}function ie(e){const t=m.querySelector(".votingCard"),s=N(e[0].deadlineDateTime);let r="";e.forEach(n=>{const o=n.currentVoters.includes(L),i=n.currentVoters.length,a=n.restaurant.minGroupSize;r+=`
    <li class="d-flex gap-12 p-12 mb-12 border border-brand-03 border-radius-40401616">
        <img class="border-radius-32321616 votingcard-photo" src="${n.restaurant.storeCover}">
            <div class="flex-grow-1 d-flex flex-column">
                <h4 class="mb-8 fs-16 fs-md-20 lh-sm text-brand-03">${n.restaurantName}</h4>
                <p class="flex-grow-1 mb-8 mb-md-16 text-gray-02 trippleline-ellipsis">${n.restaurant.summary}</p>
                <div class="d-flex justify-content-between flex-column flex-lg-row">
                    <div class="d-flex align-items-center mb-8 mb-lg-0 ">
                        <span class="me-4 me-lg-16 text-gray-02 text-nowrap">成團目標</span>
                        <div class="ts-progress is-tiny bg-gray-04 voting-progress" data-num="${n.id}">
                            <div class="bar bg-brand-02" style="--value: ${I(i,a)}">
                                <div class="text-white">${I(i,a)>100?100:I(i,a)}%</div>
                            </div>
                        </div>
                    </div>
                    ${oe(n.id,s,o)}
                </div>
            </li>`}),t.innerHTML=r,ae()}function I(e,t){return Math.floor(e/t*100)}function oe(e,t,s){return t?'<button class="py-4 px-16 btn-disable border-0 rounded-pill btnVoteThis" disabled type="button">已結束</button>':q(Y)?`<button
                class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis ${s?" btn-active-brand-02":""}"
            type="button" data-num=${e}>${s?"已投票":"投票"}</button>`:`<button
                      class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02"
                      type="button" data-num=${e} data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="請先登入帳號">投票</button>`}function ae(){q(Y)||[...document.querySelectorAll('[data-bs-toggle="popover"]')].map(s=>{new z.Popover(s)}),m.querySelectorAll(".btnVoteThis").forEach(t=>{t.addEventListener("click",function(){t.classList.contains("btn-active-brand-02")?P(t.dataset.num,"deleteVote"):P(t.dataset.num,"addVote")})})}async function P(e,t){try{const s=document.querySelector(`.ts-progress[data-num="${e}"]`);s.classList.add("is-processing");const r=u.filter(n=>n.UID.startsWith("V")&&n.id==e)[0].currentVoters;if(t==="addVote")r.push(`${L}`);else{const n=r.indexOf(`${L}`);r.splice(n,1)}d.patch(`${y}/votings/${e}`,{currentVoters:r}).then(function(n){G(n.data.UID),s.classList.remove("is-processing")}).catch(function(n){console.error(n.message)})}catch(s){throw console.log("錯誤:",s),s}}$(".btnfilterEvent").click(function(e){$(".btnfilterEvent").toggleClass("btn-active-brand-02")});let j=document.querySelectorAll(".select-bar-link");j.forEach(e=>{e.addEventListener("click",()=>{j.forEach(t=>{t.classList.remove("btn-active-brand-02")}),e.classList.add("btn-active-brand-02")})});const W="https://teatimeapi-test.onrender.com";moment().format("YYYY/MM/DD");let p={category:"全部",sort:"",search:""};const le={newestStore:"&_sort=id&_order=desc",bestStore:"&_sort=stars&_order=desc",worstStore:"&_sort=stars&_order=asc"};function F(e,t,s){let r="",n="",o="";e!=="全部"&&e&&(r=`category=${e}`),t&&(n=t),s&&(o=`&storeName_like=${s}`);let i=`${W}/restaurants?${r}${n}${o}`;console.log(i),de(i)}F();const ce=document.querySelectorAll(".btnSortStore");ce.forEach(e=>{e.addEventListener("click",function(){const t=this.getAttribute("data-sort-value");w("sort",t)})});const C=document.querySelectorAll(".btnCategoryStore");C.forEach(e=>{e.addEventListener("click",function(){const t=this.getAttribute("data-category-value");C.forEach(s=>{s.classList.remove("actived")}),w("category",t),e.classList.add("actived")})});function w(e,t){switch(e){case"category":p[e]=t;break;case"search":p[e]=t.trim();break;default:p[e]=le[t];break}F(p.category,p.sort,p.search)}function de(e){$(function(){(function(t){let s=$("#pagination"+t);$.ajax({url:e,success:function(r){me(r,s)},error:function(r){console.error(r)}})})("Pages")})}function me(e,t){t.pagination({dataSource:e,totalNumber:e.length,pageSize:8,showPageNumbers:!0,showPrevious:!0,showNext:!0,callback:function(s){ue(s)}})}function ue(e){const t={飲料:"icon-park-outline:drink",速食:"mdi:food-outline",素食:"tabler:leaf",小吃:"ph:bowl-food",甜點:"material-symbols:icecream-outline-rounded",咖啡:"icon-park-outline:tea-drink"};let s='<ul class="row row-cols-2 gap-12 gap-xxl-24 findStore-ul">';e.forEach((r,n)=>{s+=`
                        <li class="findStore-img position-relative px-0" style="background-image: url(${r.storeCover});">
                            <a href="store-order.html?UID=${r.UID}" class="d-flex justify-content-center w-100 h-100 ">
                                <!-- restaurant info -->
                                <div class="position-absolute d-flex justify-content-between findStore-card">
                                    <div class="d-flex flex-column justify-content-center overflow-hidden">
                                        <p class="mb-8 fs-md-20 fs-16 lh-sm text-white" style="white-space:nowrap">${r.storeName}</p>
                                        <!-- 星評 -->
                                        <div class="d-flex ">
                                            ${pe(r.stars)}
                                        </div>
                                    </div>
                                    <!-- restaurant sort -->
                                    <iconify-icon icon="${t[r.category]}"
                                        style="color: #8b8b8a;" width="24" height="24"
                                        class="ms-4 findStore-card-img"></iconify-icon>
                                </div>
                            </a>
                        </li>
                        `}),s+="</ul>",document.querySelector("#paginationContainer").innerHTML=s}function pe(e){const s={isGoodStar:`<iconify-icon icon="ic:round-star" style="color: #ffd43a;"
                        width="16"></iconify-icon>`,notGoodStar:`<iconify-icon icon="ic:round-star" style="color: #c2c1bd;"
                        width="16"></iconify-icon>`};return s.isGoodStar.repeat(e)+s.notGoodStar.repeat(5-e)}const _=new autoComplete({data:{src:async e=>{try{return await(await fetch(`${W}/restaurants`)).json()}catch(t){return t}},keys:["storeName"]},searchEngine:"loose",resultItem:{highlight:!0},resultsList:{element:(e,t)=>{if(!t.results.length){const s=document.createElement("div");s.setAttribute("class","no_result px-8"),s.innerHTML=`<span>Found No Results for "${t.query}"</span>`,e.prepend(s)}},noResults:!0},events:{input:{selection:e=>{const t=e.detail.selection.value;_.input.value=t.storeName,w("search",t.storeName)},keydown:e=>{if(e.keyCode===13){const t=_.input.value;console.log(`這是 ${t}`),w("search",t)}}}}}),fe=document.getElementById("autoComplete");fe.addEventListener("input",function(e){w("search","")});const B="https://teatimeapi-test.onrender.com";let D="",O=[],J=[];function ge(){const e=d.get(`${B}/messages?_sort=reviewDateTime&_order=desc`),t=d.get(`${B}/ratings?_sort=reviewDateTime&_order=desc`);Promise.all([e,t]).then(function(s){J=s[1].data,O=s[0].data,M()}).catch(function(s){console.error(s.message)})}ge();function M(){window.addEventListener("resize",be);let e=JSON.parse(JSON.stringify(J)),t=JSON.parse(JSON.stringify(O));D||(e=e.slice(0,4),t=t.slice(0,4));let s="",r="";e.forEach(i=>{const a=h(i.starRating),b=a.replace(/width="16"/g,'width="24"');s+=`
        <div
                            class="evaluate-card bg-white position-relative mt-32 mt-md-64 me-12 me-lg-0 pb-12 pb-md-24 ">
                            <div class="d-flex mb-12 mb-md-16 w-100">
                                <img class="evaluate-store w-100 d-block border border-2 border-line position-absolute"
                                    src="${i.reviewerPhoto}" alt="store-logo">
                                <div class="d-flex w-100 justify-content-between ">
                                    <p class="star-group mb-4 mb-md-8">
                                        ${D?a:b}
                                    </p>
                                    <div
                                        class="evaluate-user d-flex justify-content-between align-items-center pt-12 pt-md-24">
                                        <span class="user-name fs-16 fs-md-20">${i.reviewer}</span>
                                        <time datetime="2023-08-04" class="user-date fs-16">${i.reviewDateTime}</time>
                                    </div>
                                </div>
                            </div>
                            <p class="px-12 px-md-24 lh-lg doubleline-ellipsis">${i.feedbackText}
                            </p>
                        </div>
                        `}),t.forEach(i=>{r+=`<li
        class="evaluate-card message-card bg-white mt-32 mt-md-64 mb-24 mb-md-32 position-relative me-12 me-lg-0 pb-12 pb-md-24">
        <div class="d-flex mb-12 mb-md-16">
            <img class="evaluate-store w-100 d-block border border-2 border-line position-absolute"
                src="${i.reviewerPhoto}" alt="user-photo">
            <div
                class="evaluate-user d-flex justify-content-between  align-items-center pt-8 pt-md-10 w-100">
                <span class="user-name fs-16 fs-md-20">${i.reviewer}</span>
                <time datetime="2023-08-06"
                    class="user-date fs-16 d-block ms-auto ">${i.reviewDateTime}</time>
            </div>
        </div>
        <p class="px-12 px-md-24 lh-lg doubleline-ellipsis">${i.feedbackText}</p>

    </li>`});const n=document.querySelector(".ratingsContainer");n.innerHTML=s;const o=document.querySelector(".messagesContainer");o.innerHTML=r}let U;function be(){clearTimeout(U),U=setTimeout(ve,500)}function ve(){window.innerWidth<992?(D=!0,M()):(D=!1,M())}
