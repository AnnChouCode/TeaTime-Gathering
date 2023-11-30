import{b as U}from"./main-652f9d08.js";import{a as E,i as L}from"./nav-87cf5d3e.js";import{s as x}from"./showStars-385adb56.js";import{i as S}from"./isPastEvent-33573b9d.js";console.clear();let y=[];const D=new Date;let M=`${D.getFullYear()}/${D.getMonth()+1}/${D.getDate()}`;R();function R(e){let n=`https://teatimeapi-test.onrender.com/groupings?deadlineDateTime_like=${M}&isGroup=true`;e==1&&(n="https://teatimeapi-test.onrender.com/groupings?&isGroup=true&_limit=4"),E.get(n).then(function(s){const a=s.data;if(a=="")R(1);else if(a.forEach((t,l)=>{const[i,o]=t.deadlineDateTime.split(" ");t.datePart=i,t.timePart=o,i==M?t.todayGroupings=!0:t.todayGroupings=!1,y.push(t)}),y!=""){let t="";const l=document.querySelector(".bannerName");j(y).then(i=>{t+=`
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
            `,l.innerHTML=t,new Swiper(".mySwiper",{loop:!0,clickable:!0,pagination:{el:".swiper-pagination",clickable:!0,renderBullet:function(r,c){return'<span class="'+c+'"></span>'}},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),document.querySelectorAll(".order-btn").forEach(function(r){let c=r.dataset.uid;r.addEventListener("click",function(){window.location.href=`store-order.html?UID=${c}`})});const v=new Date("2023-12-31 23:59").getTime();function g(){const r=new Date().getTime(),c=v-r,b=Math.floor(c%(1e3*60*60*24)/(1e3*60*60)),h=Math.floor(c%(1e3*60*60)/(1e3*60)),w=Math.floor(c%(1e3*60)/1e3);b<10?document.getElementById("hour").innerHTML="0"+b:document.getElementById("hour").innerHTML=b,h<10?document.getElementById("min").innerHTML="0"+h:document.getElementById("min").innerHTML=h,w<10?document.getElementById("sec").innerHTML="0"+w:document.getElementById("sec").innerHTML=w}setInterval(g,1e3),g()})}else console.log("bannerData 為空值")}).catch(function(s){console.log(s)})}function j(e){return new Promise((n,s)=>{const a=e.map(t=>{let l=t.restaurantName,i=t;return E.get(`https://teatimeapi-test.onrender.com/restaurants?storeName=${l}`).then(o=>{const{summary:v,storeBannerPhoto:g,UID:r}=o.data[0];return i.summary=v,i.storeBannerPhoto=g,i.storeUID=r,E.get(`https://teatimeapi-test.onrender.com/ratings?_sort=reviewDateTime&_order=desc&reviewedRestaurant=${l}&_limit=3`)}).then(o=>(i.reviewedRestaurant=o.data,i)).catch(o=>{throw o})});Promise.all(a).then(t=>{n(t)}).catch(t=>{s(t)})})}const f="https://teatimeapi-test.onrender.com",k=localStorage.getItem("token"),I="U004";let m=[];function _(){const e=moment().add(2,"month").format("YYYY/MM"),n=moment().subtract(1,"month").format("YYYY/MM"),s=axios.get(`${f}/groupings?_expand=restaurant&deadlineDateTime_gte=${n}&deadlineDateTime_lte=${e}`),a=axios.get(`${f}/votings?_expand=restaurant&deadlineDateTime_gte=${n}&deadlineDateTime_lte=${e}`);Promise.all([s,a]).then(function(t){m=m.concat(t[0].data),m=m.concat(t[1].data),q()}).catch(function(t){console.error(t.message)})}_();const p={};function q(){m.sort((e,n)=>{const s=new Date(e.deadlineDateTime),a=new Date(n.deadlineDateTime);return s-a}),m.forEach(e=>{p[e.UID]||(p[e.UID]={UID:e.UID,restaurantId:e.restaurantId,deadlineDateTime:e.deadlineDateTime,eventDateTime:e.eventDateTime,initiator:e.initiator,invitees:e.invitees,restaurantList:e.UID.startsWith("V")?[]:[e.restaurantName],restaurantPhoto:e.restaurant.storeCover}),e.UID.startsWith("V")&&p[e.UID].restaurantList.push(e.restaurantName)}),B()}const H=document.querySelectorAll(".btnfilterEvent"),Y=document.querySelector(".calendarBlock");H.forEach(e=>{e.addEventListener("click",function(){const n=this.getAttribute("data-event");B(n)})});function B(e="groupings"){const n=Object.values(p).filter(t=>t.UID.startsWith(e[0].toUpperCase())),s=n.filter(t=>{const l=moment(t.deadlineDateTime,"YYYY/MM/DD HH:mm");return moment().isBefore(l)});let a;s.length>=4?a=s.slice(0,4):a=n.slice(n.length-4,n.length),C(a)}function C(e){let n="";e.forEach(s=>{n+=`<div class="col-md-6 col-xl-4 col-xxxl-3">
                <a ${A(s.UID)}
                    class="event-rounded h-100 w-100 d-flex flex-lg-column p-12 p-lg-16 align-items-center justify-content-center bg-white border-hover-line"
                    data-aos="flip-left" data-aos="flip-left" data-aos-delay="400">
                    <img class="event-pic me-12 me-lg-0 mb-lg-20"
                        src="${s.restaurantPhoto}"
                        alt="calendar-img">
                    <div class="d-flex flex-column justify-content-between w-60 w-lg-100 flex-grow-1">
                        <p class="mb-8 mb-lg-16 fs-20 fs-lg-24 fw-bold lh-sm text-brand-03 single-ellipsis">${s.restaurantList.join("、")}</p>
                        <div class="d-flex justify-content-between align-items-center mb-8 mb-lg-16">
                            <p class="fs-16 fs-lg-20 text-gray-05">${s.UID.startsWith("V")?"投票中":"開團中"}</p>
                            ${N(s.deadlineDateTime)}
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="fs-16 fs-lg-20 text-gray-05">請客人</p>
                            <span class="fs-16 fs-lg-20 lh-sm fw-medium">${s.invitees?s.invitees:"無"}</span>
                        </div>
                    </div>
                </a>
            </div>`}),Y.innerHTML=n}function N(e){let n;return S(e)?n="<div class='fw-medium lh-sm fs-16 fs-lg-20'>已結束</div>":n=`<div class="d-flex align-items-center ms-8 gap-md-8 gap-4">
                                    <iconify-icon icon="solar:calendar-linear" style="color: #1e1e1e;" width="26"
                                        height="26"></iconify-icon>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${u(e)[0]}</time>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${u(e)[1]}</time>
                                </div>`,n}function A(e){return e.startsWith("V")?`href="#modal-VotingModal" data-bs-toggle="modal" data-bs-votingUID="${e}"`:`href="store-order.html?UID=${e}"`}const d=document.getElementById("modal-VotingModal");function P(e){let n=[];axios.get(`${f}/votings?UID=${e}&_expand=restaurant`).then(function(s){n=s.data,W(n)}).catch(function(s){console.error(s)})}d.addEventListener("show.bs.modal",function(e){const s=e.relatedTarget.getAttribute("data-bs-votingUID");G(s),P(s)});function G(e){const n=d.querySelector(".modal-title");n.textContent=p[e].restaurantList.join("、");const s=d.querySelector(".deadlineDateTime"),a=d.querySelector(".eventDateTime"),t=d.querySelector(".initiator"),l=d.querySelector(".invitees"),i=p[e];s.innerHTML=`<span class="me-16">截止日期</span>
    <span class="me-8 ">${u(i.deadlineDateTime)[0]}</span>
    <span>${u(i.deadlineDateTime)[1]}</span>`,a.innerHTML=`<span class="me-16">享用時間</span>
    <span class="me-8">${u(i.eventDateTime)[0]}</span>
    <span>${u(i.eventDateTime)[1]}</span>`,t.textContent=i.initiator,l.textContent=i.invitees===""?"無":i.invitees}function u(e){const n=e.substring(5,10),s=e.split(" ")[1];return[n,s]}function W(e){const n=d.querySelector(".votingCard"),s=S(e[0].deadlineDateTime);let a="";e.forEach(t=>{const l=t.currentVoters.includes(I),i=t.currentVoters.length,o=t.restaurant.minGroupSize;a+=`
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
                    ${z(t.id,s,l)}
                </div>
            </li>`}),n.innerHTML=a,O()}function T(e,n){return Math.floor(e/n*100)}function z(e,n,s){return n?'<button class="py-4 px-16 btn-disable border-0 rounded-pill btnVoteThis" disabled type="button">已結束</button>':L(k)?`<button
                class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis ${s?" btn-active-brand-02":""}"
            type="button" data-num=${e}>${s?"已投票":"投票"}</button>`:`<button
                      class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02"
                      type="button" data-num=${e} data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="請先登入帳號">投票</button>`}function O(){L(k)||[...document.querySelectorAll('[data-bs-toggle="popover"]')].map(s=>{new U.Popover(s)}),d.querySelectorAll(".btnVoteThis").forEach(n=>{n.addEventListener("click",function(){n.classList.contains("btn-active-brand-02")?V(n.dataset.num,"deleteVote"):V(n.dataset.num,"addVote")})})}async function V(e,n){try{const s=document.querySelector(`.ts-progress[data-num="${e}"]`);s.classList.add("is-processing");const a=m.filter(t=>t.UID.startsWith("V")&&t.id==e)[0].currentVoters;if(n==="addVote")a.push(`${I}`);else{const t=a.indexOf(`${I}`);a.splice(t,1)}axios.patch(`${f}/votings/${e}`,{currentVoters:a}).then(function(t){P(t.data.UID),s.classList.remove("is-processing")}).catch(function(t){console.error(t.message)})}catch(s){throw console.log("錯誤:",s),s}}$(".btnfilterEvent").click(function(e){$(".btnfilterEvent").toggleClass("btn-active-brand-02")});
