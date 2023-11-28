import{b as y}from"./main-a84cd557.js";import{i as p}from"./nav-7ac77614.js";import{i as h}from"./isPastEvent-33573b9d.js";const u="https://teatimeapi-test.onrender.com";let b=localStorage.getItem("token");const g="U004";let l=[];function T(){const e=moment().add(2,"month").format("YYYY/MM"),n=moment().subtract(1,"month").format("YYYY/MM"),t=axios.get(`${u}/groupings?_expand=restaurant&deadlineDateTime_gte=${n}&deadlineDateTime_lte=${e}`),o=axios.get(`${u}/votings?_expand=restaurant&deadlineDateTime_gte=${n}&deadlineDateTime_lte=${e}`);Promise.all([t,o]).then(function(s){l=l.concat(s[0].data),l=l.concat(s[1].data),V()}).catch(function(s){console.error(s.message)})}T();const r={};function V(){l.sort((e,n)=>{const t=new Date(e.deadlineDateTime),o=new Date(n.deadlineDateTime);return t-o}),l.forEach(e=>{r[e.UID]||(r[e.UID]={UID:e.UID,restaurantId:e.restaurantId,deadlineDateTime:e.deadlineDateTime,eventDateTime:e.eventDateTime,initiator:e.initiator,invitees:e.invitees,restaurantList:e.UID.startsWith("V")?[]:[e.restaurantName],restaurantPhoto:e.restaurant.storeCover,minGroupSize:e.restaurant.minGroupSize,currentGroupCondition:e.currentGroupCondition}),e.UID.startsWith("V")&&(r[e.UID].restaurantList.push(e.restaurantName),delete r[e.UID].currentGroupCondition,delete r[e.UID].minGroupSize)}),D()}const w=document.querySelectorAll(".btnfilterEvent"),I=document.querySelector(".calendarBlock");w.forEach(e=>{e.addEventListener("click",function(){const n=this.getAttribute("data-event");D(n)})});function D(e="groupings"){const n=Object.values(r).filter(s=>s.UID.startsWith(e[0].toUpperCase())),t=n.filter(s=>{const d=moment(s.deadlineDateTime,"YYYY/MM/DD HH:mm");return moment().isBefore(d)});let o;t.length>=4?o=t.slice(0,4):o=n.slice(n.length-4,n.length),E(o)}function E(e){let n="";e.forEach(t=>{n+=`<div class="col-md-6 col-xl-4 col-xxxl-3">
                <a ${S(t.UID)}
                    class="event-rounded h-100 w-100 d-flex flex-lg-column p-12 p-lg-16 align-items-center justify-content-center bg-white border-hover-line"
                    data-aos="flip-left" data-aos="flip-left" data-aos-delay="400">
                    <img class="event-pic me-12 me-lg-0 mb-lg-20"
                        src="${t.restaurantPhoto}"
                        alt="calendar-img">
                    <div class="d-flex flex-column justify-content-between w-60 w-lg-100 flex-grow-1">
                        <p class="mb-8 mb-lg-16 fs-20 fs-lg-24 fw-bold lh-sm text-brand-03 single-ellipsis">${t.restaurantList.join("、")}</p>
                        <div class="d-flex justify-content-between align-items-center mb-8 mb-lg-16">
                            <p class="fs-16 fs-lg-20 text-gray-05">${t.UID.startsWith("V")?"投票中":"開團中"}</p>
                            ${M(t.deadlineDateTime)}
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="fs-16 fs-lg-20 text-gray-05">請客人</p>
                            <span class="fs-16 fs-lg-20 lh-sm fw-medium">${t.invitees?t.invitees:"無"}</span>
                        </div>
                    </div>
                </a>
            </div>`}),I.innerHTML=n}function M(e){let n;return h(e)?n="<div class='fw-medium lh-sm fs-16 fs-lg-20'>已結束</div>":n=`<div class="d-flex align-items-center ms-8 gap-md-8 gap-4">
                                    <iconify-icon icon="solar:calendar-linear" style="color: #1e1e1e;" width="26"
                                        height="26"></iconify-icon>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${c(e)[0]}</time>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${c(e)[1]}</time>
                                </div>`,n}function S(e){return e.startsWith("V")?`href="#modal-VotingModal" data-bs-toggle="modal" data-bs-votingUID="${e}"`:`href="store-order.html?UID=${e}"`}const a=document.getElementById("modal-VotingModal");function x(e){let n=[];axios.get(`${u}/votings?UID=${e}&_expand=restaurant`).then(function(t){n=t.data,L(n)}).catch(function(t){console.error(t)})}a.addEventListener("show.bs.modal",function(e){const t=e.relatedTarget.getAttribute("data-bs-votingUID");U(t),x(t),p(b)});function U(e){const n=a.querySelector(".modal-title");n.textContent=r[e].restaurantList.join("、");const t=a.querySelector(".deadlineDateTime"),o=a.querySelector(".eventDateTime"),s=a.querySelector(".initiator"),d=a.querySelector(".invitees"),i=r[e];t.innerHTML=`<span class="me-16">截止日期</span>
    <span class="me-8 ">${c(i.deadlineDateTime)[0]}</span>
    <span>${c(i.deadlineDateTime)[1]}</span>`,o.innerHTML=`<span class="me-16">享用時間</span>
    <span class="me-8">${c(i.eventDateTime)[0]}</span>
    <span>${c(i.eventDateTime)[1]}</span>`,s.textContent=i.initiator,d.textContent=i.invitees===""?"無":i.invitees}function c(e){const n=e.substring(5,10),t=e.split(" ")[1];return[n,t]}function L(e){const n=a.querySelector(".votingCard"),t=h(e[0].deadlineDateTime);let o="";e.forEach(s=>{const d=s.currentVoters.includes(g),i=s.currentVoters.length,m=s.restaurant.minGroupSize;o+=`
    <li class="d-flex gap-12 p-12 mb-12 border border-brand-03 border-radius-40401616">
        <img class="border-radius-32321616 votingcard-photo" src="${s.restaurant.storeCover}">
            <div class="flex-grow-1 d-flex flex-column">
                <h4 class="mb-8 fs-16 fs-md-20 lh-sm text-brand-03">${s.restaurantName}</h4>
                <p class="flex-grow-1 mb-8 mb-md-16 text-gray-02 trippleline-ellipsis">${s.restaurant.summary}</p>
                <div class="d-flex justify-content-between flex-column flex-lg-row">
                    <div class="d-flex align-items-center mb-8 mb-lg-0 ">
                        <span class="me-4 me-lg-16 text-gray-02 text-nowrap">成團目標</span>
                        <div class="ts-progress is-tiny bg-gray-04 voting-progress" data-num="${s.id}">
                            <div class="bar bg-brand-02" style="--value: ${f(i,m)}">
                                <div class="text-white">${f(i,m)>100?100:f(i,m)}%</div>
                            </div>
                        </div>
                    </div>
                    ${C(s.id,t,d)}
                </div>
            </li>`}),n.innerHTML=o,Y()}function f(e,n){return Math.floor(e/n*100)}function C(e,n,t){return n?'<button class="py-4 px-16 btn-disable border-0 rounded-pill btnVoteThis" disabled type="button">已結束</button>':p(b)?`<button
                class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis ${t?" btn-active-brand-02":""}"
            type="button" data-num=${e}>${t?"已投票":"投票"}</button>`:`<button
                      class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis"
                      type="button" data-num=${e} data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="請先登入帳號">投票</button>`}function Y(){const e=a.querySelectorAll(".btnVoteThis"),n=document.querySelectorAll('[data-bs-toggle="popover"]');e.forEach(t=>{t.addEventListener("click",function(){if(!p(b)){[...n].map(s=>{new y.Popover(s)});return}t.classList.contains("btn-active-brand-02")?v(t.dataset.num,"deleteVote"):v(t.dataset.num,"addVote")})})}async function v(e,n){try{const t=document.querySelector(`.ts-progress[data-num="${e}"]`);t.classList.add("is-processing");const o=l.filter(s=>s.UID.startsWith("V")&&s.id==e)[0].currentVoters;if(n==="addVote")o.push(`${g}`);else{const s=o.indexOf(`${g}`);o.splice(s,1)}axios.patch(`${u}/votings/${e}`,{currentVoters:o}).then(function(s){x(s.data.UID),t.classList.remove("is-processing")}).catch(function(s){console.error(s.message)})}catch(t){throw console.log("錯誤:",t),t}}$(".btnfilterEvent").click(function(e){$(".btnfilterEvent").toggleClass("btn-active-brand-02")});
