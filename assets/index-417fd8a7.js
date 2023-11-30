import{b as P}from"./main-683b5b67.js";import{a as I,i as M}from"./nav-6adc6ebb.js";import{s as x}from"./showStars-385adb56.js";import{i as R}from"./isPastEvent-33573b9d.js";console.clear();let y=[];const D=new Date;let S=`${D.getFullYear()}/${D.getMonth()+1}/${D.getDate()}`;U();function U(e){let s=`https://teatimeapi-test.onrender.com/groupings?deadlineDateTime_like=${S}&isGroup=true`;e==1&&(s="https://teatimeapi-test.onrender.com/groupings?&isGroup=true&_limit=4"),I.get(s).then(function(n){const a=n.data;if(a=="")U(1);else if(a.forEach((t,l)=>{const[i,o]=t.deadlineDateTime.split(" ");t.datePart=i,t.timePart=o,i==S?t.todayGroupings=!0:t.todayGroupings=!1,y.push(t)}),y!=""){let t="";const l=document.querySelector(".bannerName");j(y).then(i=>{t+=`
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
            `,t+=`
            <div class="swiper mySwiper">
            <div class="swiper-wrapper">
            `,i.forEach(r=>{t+=`
              <div class="swiper-slide">
                <div class="swiper-bg-Style swiper01 text-white p-12 px-md-40 py-md-24 border-radius-80804040 
                  d-flex justify-content-end flex-column flex-md-row justify-content-md-between align-items-md-end" style="
                  background: url(${r.storeBannerPhoto}) center center/cover, linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);">
                  <div class="swiper-bg-textcontent">
                    <h2 class="fs-28 fs-md-40 fw-bold custom-shadow mb-16">${r.restaurantName}</h2>
                    <p class="swiper-bg-p custom-shadow mb-12 mb-md-0 fs-md-24">${r.summary}</p>
                  </div>
                  <button data-uid="${r.storeUID}" 
                    class="order-btn fs-20 fw-medium text-white border-radius-40 px-24 py-12 bg-brand-03 border-0">點餐去</button>
                </div>
                <div class="d-none d-xl-flex justify-content-between p-24">
                  <div class="swiper-comment bg-white p-24 border-radius-16161640">
                    <div class="mb-12 d-flex align-items-center justify-content-between ">
                      <div class="swiper-comment-personal d-flex align-items-center justify-content-center ">
                        <img class="border-radius-20 me-16" src="${r.reviewedRestaurant[0].reviewerPhoto}" alt="user-img">
                        <p class="fs-20 fs-md-16 fs-xxl-20 text-gray-02">${r.reviewedRestaurant[0].reviewer}</p>
                      </div>
                      <div class="swiper-comment-date">
                        <time datetime="2023-08-03" class="text-gray-02">${r.reviewedRestaurant[0].reviewDateTime}</time>
                      </div>
                    </div>
                    <div class="mb-12">${x(r.reviewedRestaurant[0].starRating)}</div>
                    <p class="swiper-comment-p fs-20">${r.reviewedRestaurant[0].feedbackText}</p>
                  </div>
                  <div class="swiper-comment bg-white p-24 border-radius-16">
                    <div class="mb-12 d-flex align-items-center justify-content-between ">
                      <div class="swiper-comment-personal d-flex align-items-center justify-content-center ">
                        <img class="border-radius-20 me-16" src="${r.reviewedRestaurant[1].reviewerPhoto}"
                          alt="user-img">
                        <p class="fs-20 fs-md-16 fs-xxl-20 text-gray-02">${r.reviewedRestaurant[1].reviewer}</p>
                      </div>
                      <div class="swiper-comment-date">
                        <time datetime="2023-08-03" class="text-gray-02">${r.reviewedRestaurant[1].reviewDateTime}</time>
                      </div>
                    </div>
                    <div class="mb-12">${x(r.reviewedRestaurant[1].starRating)}</div>
                    <p class="swiper-comment-p fs-20">${r.reviewedRestaurant[1].feedbackText}</p>
                  </div>
                  <div class="swiper-comment bg-white p-24 border-radius-16164016">
                    <div class="mb-12 d-flex align-items-center justify-content-between ">
                      <div class="swiper-comment-personal d-flex align-items-center justify-content-center ">
                        <img class="border-radius-20 me-16" src="${r.reviewedRestaurant[2].reviewerPhoto}"
                          alt="user-img">
                        <p class="fs-20 fs-md-16 fs-xxl-20 text-gray-02">${r.reviewedRestaurant[1].reviewer}</p>
                      </div>
                      <div class="swiper-comment-date">
                      <time datetime="2023-08-03" class="text-gray-02">${r.reviewedRestaurant[2].reviewDateTime}</time>
                      </div>
                    </div>
                    <div class="mb-12">${x(r.reviewedRestaurant[2].starRating)}</div>
                    <p class="swiper-comment-p fs-20">${r.reviewedRestaurant[2].feedbackText}</p>
                  </div>
                </div>
              </div>
              `}),t+=`
            </div>
            </div>
            <div class="swiper-button-next pictures-replace-text d-none d-xl-block"></div>
            <div class="swiper-button-prev pictures-replace-text d-none d-xl-block"></div>
            <div class="swiper-pagination position-absolute top-100 start-50 translate-middle"></div>
            `,l.innerHTML=t,new Swiper(".mySwiper",{loop:!0,clickable:!0,pagination:{el:".swiper-pagination",clickable:!0,renderBullet:function(r,m){return'<span class="'+m+'"></span>'}},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),document.querySelectorAll(".order-btn").forEach(function(r){let m=r.dataset.uid;r.addEventListener("click",function(){window.location.href=`store-order.html?UID=${m}`})});const v=new Date("2023-12-31 23:59").getTime();function g(){const r=new Date().getTime(),m=v-r,b=Math.floor(m%(1e3*60*60*24)/(1e3*60*60)),h=Math.floor(m%(1e3*60*60)/(1e3*60)),w=Math.floor(m%(1e3*60)/1e3);b<10?document.getElementById("hour").innerHTML="0"+b:document.getElementById("hour").innerHTML=b,h<10?document.getElementById("min").innerHTML="0"+h:document.getElementById("min").innerHTML=h,w<10?document.getElementById("sec").innerHTML="0"+w:document.getElementById("sec").innerHTML=w}setInterval(g,1e3),g()})}else console.log("bannerData 為空值")}).catch(function(n){console.log(n)})}function j(e){return new Promise((s,n)=>{const a=e.map(t=>{let l=t.restaurantName,i=t;return I.get(`https://teatimeapi-test.onrender.com/restaurants?storeName=${l}`).then(o=>{const{summary:v,storeBannerPhoto:g,UID:r}=o.data[0];return i.summary=v,i.storeBannerPhoto=g,i.storeUID=r,I.get(`https://teatimeapi-test.onrender.com/ratings?_sort=reviewDateTime&_order=desc&reviewedRestaurant=${l}&_limit=3`)}).then(o=>(i.reviewedRestaurant=o.data,i)).catch(o=>{throw o})});Promise.all(a).then(t=>{s(t)}).catch(t=>{n(t)})})}const f="https://teatimeapi-test.onrender.com";let V=localStorage.getItem("token");const E="U004";let u=[];function _(){const e=moment().add(2,"month").format("YYYY/MM"),s=moment().subtract(1,"month").format("YYYY/MM"),n=axios.get(`${f}/groupings?_expand=restaurant&deadlineDateTime_gte=${s}&deadlineDateTime_lte=${e}`),a=axios.get(`${f}/votings?_expand=restaurant&deadlineDateTime_gte=${s}&deadlineDateTime_lte=${e}`);Promise.all([n,a]).then(function(t){u=u.concat(t[0].data),u=u.concat(t[1].data),C()}).catch(function(t){console.error(t.message)})}_();const d={};function C(){u.sort((e,s)=>{const n=new Date(e.deadlineDateTime),a=new Date(s.deadlineDateTime);return n-a}),u.forEach(e=>{d[e.UID]||(d[e.UID]={UID:e.UID,restaurantId:e.restaurantId,deadlineDateTime:e.deadlineDateTime,eventDateTime:e.eventDateTime,initiator:e.initiator,invitees:e.invitees,restaurantList:e.UID.startsWith("V")?[]:[e.restaurantName],restaurantPhoto:e.restaurant.storeCover,minGroupSize:e.restaurant.minGroupSize,currentGroupCondition:e.currentGroupCondition}),e.UID.startsWith("V")&&(d[e.UID].restaurantList.push(e.restaurantName),delete d[e.UID].currentGroupCondition,delete d[e.UID].minGroupSize)}),k()}const G=document.querySelectorAll(".btnfilterEvent"),q=document.querySelector(".calendarBlock");G.forEach(e=>{e.addEventListener("click",function(){const s=this.getAttribute("data-event");k(s)})});function k(e="groupings"){const s=Object.values(d).filter(t=>t.UID.startsWith(e[0].toUpperCase())),n=s.filter(t=>{const l=moment(t.deadlineDateTime,"YYYY/MM/DD HH:mm");return moment().isBefore(l)});let a;n.length>=4?a=n.slice(0,4):a=s.slice(s.length-4,s.length),H(a)}function H(e){let s="";e.forEach(n=>{s+=`<div class="col-md-6 col-xl-4 col-xxxl-3">
                <a ${N(n.UID)}
                    class="event-rounded h-100 w-100 d-flex flex-lg-column p-12 p-lg-16 align-items-center justify-content-center bg-white border-hover-line"
                    data-aos="flip-left" data-aos="flip-left" data-aos-delay="400">
                    <img class="event-pic me-12 me-lg-0 mb-lg-20"
                        src="${n.restaurantPhoto}"
                        alt="calendar-img">
                    <div class="d-flex flex-column justify-content-between w-60 w-lg-100 flex-grow-1">
                        <p class="mb-8 mb-lg-16 fs-20 fs-lg-24 fw-bold lh-sm text-brand-03 single-ellipsis">${n.restaurantList.join("、")}</p>
                        <div class="d-flex justify-content-between align-items-center mb-8 mb-lg-16">
                            <p class="fs-16 fs-lg-20 text-gray-05">${n.UID.startsWith("V")?"投票中":"開團中"}</p>
                            ${Y(n.deadlineDateTime)}
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="fs-16 fs-lg-20 text-gray-05">請客人</p>
                            <span class="fs-16 fs-lg-20 lh-sm fw-medium">${n.invitees?n.invitees:"無"}</span>
                        </div>
                    </div>
                </a>
            </div>`}),q.innerHTML=s}function Y(e){let s;return R(e)?s="<div class='fw-medium lh-sm fs-16 fs-lg-20'>已結束</div>":s=`<div class="d-flex align-items-center ms-8 gap-md-8 gap-4">
                                    <iconify-icon icon="solar:calendar-linear" style="color: #1e1e1e;" width="26"
                                        height="26"></iconify-icon>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${p(e)[0]}</time>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${p(e)[1]}</time>
                                </div>`,s}function N(e){return e.startsWith("V")?`href="#modal-VotingModal" data-bs-toggle="modal" data-bs-votingUID="${e}"`:`href="store-order.html?UID=${e}"`}const c=document.getElementById("modal-VotingModal");function B(e){let s=[];axios.get(`${f}/votings?UID=${e}&_expand=restaurant`).then(function(n){s=n.data,W(s)}).catch(function(n){console.error(n)})}c.addEventListener("show.bs.modal",function(e){const n=e.relatedTarget.getAttribute("data-bs-votingUID");A(n),B(n),M(V)});function A(e){const s=c.querySelector(".modal-title");s.textContent=d[e].restaurantList.join("、");const n=c.querySelector(".deadlineDateTime"),a=c.querySelector(".eventDateTime"),t=c.querySelector(".initiator"),l=c.querySelector(".invitees"),i=d[e];n.innerHTML=`<span class="me-16">截止日期</span>
    <span class="me-8 ">${p(i.deadlineDateTime)[0]}</span>
    <span>${p(i.deadlineDateTime)[1]}</span>`,a.innerHTML=`<span class="me-16">享用時間</span>
    <span class="me-8">${p(i.eventDateTime)[0]}</span>
    <span>${p(i.eventDateTime)[1]}</span>`,t.textContent=i.initiator,l.textContent=i.invitees===""?"無":i.invitees}function p(e){const s=e.substring(5,10),n=e.split(" ")[1];return[s,n]}function W(e){const s=c.querySelector(".votingCard"),n=R(e[0].deadlineDateTime);let a="";e.forEach(t=>{const l=t.currentVoters.includes(E),i=t.currentVoters.length,o=t.restaurant.minGroupSize;a+=`
    <li class="d-flex gap-12 p-12 mb-12 border border-brand-03 border-radius-40401616">
        <img class="border-radius-32321616 votingcard-photo" src="${t.restaurant.storeCover}">
            <div class="flex-grow-1 d-flex flex-column">
                <h4 class="mb-8 fs-16 fs-md-20 lh-sm text-brand-03">${t.restaurantName}</h4>
                <p class="flex-grow-1 mb-8 mb-md-16 text-gray-02 trippleline-ellipsis">${t.restaurant.summary}</p>
                <div class="d-flex justify-content-between flex-column flex-lg-row">
                    <div class="d-flex align-items-center mb-8 mb-lg-0 ">
                        <span class="me-4 me-lg-16 text-gray-02 text-nowrap">成團目標</span>
                        <div class="ts-progress is-tiny bg-gray-04 voting-progress" data-num="${t.id}">
                            <div class="bar bg-brand-02" style="--value: ${T(i,o)}">
                                <div class="text-white">${T(i,o)>100?100:T(i,o)}%</div>
                            </div>
                        </div>
                    </div>
                    ${z(t.id,n,l)}
                </div>
            </li>`}),s.innerHTML=a,O()}function T(e,s){return Math.floor(e/s*100)}function z(e,s,n){return s?'<button class="py-4 px-16 btn-disable border-0 rounded-pill btnVoteThis" disabled type="button">已結束</button>':M(V)?`<button
                class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis ${n?" btn-active-brand-02":""}"
            type="button" data-num=${e}>${n?"已投票":"投票"}</button>`:`<button
                      class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis"
                      type="button" data-num=${e} data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="請先登入帳號">投票</button>`}function O(){const e=c.querySelectorAll(".btnVoteThis"),s=document.querySelectorAll('[data-bs-toggle="popover"]');e.forEach(n=>{n.addEventListener("click",function(){if(!M(V)){[...s].map(t=>{new P.Popover(t)});return}n.classList.contains("btn-active-brand-02")?L(n.dataset.num,"deleteVote"):L(n.dataset.num,"addVote")})})}async function L(e,s){try{const n=document.querySelector(`.ts-progress[data-num="${e}"]`);n.classList.add("is-processing");const a=u.filter(t=>t.UID.startsWith("V")&&t.id==e)[0].currentVoters;if(s==="addVote")a.push(`${E}`);else{const t=a.indexOf(`${E}`);a.splice(t,1)}axios.patch(`${f}/votings/${e}`,{currentVoters:a}).then(function(t){B(t.data.UID),n.classList.remove("is-processing")}).catch(function(t){console.error(t.message)})}catch(n){throw console.log("錯誤:",n),n}}$(".btnfilterEvent").click(function(e){$(".btnfilterEvent").toggleClass("btn-active-brand-02")});
